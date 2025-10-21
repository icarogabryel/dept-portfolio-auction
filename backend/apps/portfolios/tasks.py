import csv
from datetime import timedelta

from asgiref.sync import async_to_sync
from celery import shared_task
from channels.layers import get_channel_layer
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_aware

from ..notifications.models import Notification, NotificationType
from .models import Portfolio
from .serializers import PortfolioSerializer


@shared_task
def send_closing_soon_notification(portfolio_id):
    """
    Send notification to all users who have bids on the portfolio warning that auction closes in 30
    minutes.
    """
    try:
        portfolio = Portfolio.objects.get(id=portfolio_id)

        # Get all users who have bids on this portfolio
        users_with_bids = portfolio.bids.values_list('user', flat=True).distinct()

        # Create notifications for each user
        notifications = [
            Notification(
                type=NotificationType.CLOSING_SOON,
                user_id=user_id,
                portfolio=portfolio
            )
            for user_id in users_with_bids
        ]

        Notification.objects.bulk_create(notifications)

        return (
            f"Sent closing soon notifications for portfolio {portfolio_id} to {len(notifications)} "
            f"users"
        )
    except Portfolio.DoesNotExist:
        return f"Portfolio {portfolio_id} not found"


@shared_task
def send_auction_ended_notifications(portfolio_id):
    """
    Send notifications when auction ends:
    - Winner notification to the user with highest bid
    - Loss notification to all other users who bid
    """
    try:
        portfolio = Portfolio.objects.get(id=portfolio_id)

        # Get winning bid
        winning_bid = portfolio.get_winning_bid()

        if not winning_bid:
            return f"No bids found for portfolio {portfolio_id}"

        # Get all users who bid
        users_with_bids = portfolio.bids.values_list('user', flat=True).distinct()

        notifications = []

        for user_id in users_with_bids:
            if user_id == winning_bid.user_id:
                # Winner notification
                notifications.append(
                    Notification(
                        type=NotificationType.WIN,
                        user_id=user_id,
                        portfolio=portfolio
                    )
                )
            else:
                # Loss notification
                notifications.append(
                    Notification(
                        type=NotificationType.LOSS,
                        user_id=user_id,
                        portfolio=portfolio
                    )
                )

        Notification.objects.bulk_create(notifications)

        return (
            f"Sent auction ended notifications for portfolio {portfolio_id} to {len(notifications)}"
            " users"
        )
    except Portfolio.DoesNotExist:
        return f"Portfolio {portfolio_id} not found"


def schedule_portfolio_notifications(portfolio):
    """
    Schedule both notification tasks when a portfolio is created:
    1. Closing soon notification (30 minutes before auction_end)
    2. Auction ended notification (at auction_end time)
    """
    closing_soon_time = portfolio.auction_end - timedelta(minutes=30)
    auction_end_time = portfolio.auction_end

    send_closing_soon_notification.apply_async(args=[portfolio.id], eta=closing_soon_time)
    send_auction_ended_notifications.apply_async(args=[portfolio.id], eta=auction_end_time)


@shared_task
def import_csv_task(file_path):
    batch = []
    created_portfolios = []

    with open(file_path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            # Convert string dates to datetime objects with timezone
            if 'auction_end' in row and isinstance(row['auction_end'], str):
                dt = parse_datetime(row['auction_end'])
                if dt and dt.tzinfo is None:  # If datetime is naive, make it aware
                    row['auction_end'] = make_aware(dt)
                else:
                    row['auction_end'] = dt

            batch.append(Portfolio(**row))
            if len(batch) >= 10_000:
                portfolios = Portfolio.objects.bulk_create(batch)
                created_portfolios.extend(portfolios)
                batch.clear()

        if batch:
            portfolios = Portfolio.objects.bulk_create(batch)
            created_portfolios.extend(portfolios)

    # Send WebSocket notifications for created portfolios
    channel_layer = get_channel_layer()
    for portfolio in created_portfolios:
        # Schedule notifications
        schedule_portfolio_notifications(portfolio)

        # Send via WebSocket
        portfolio_data = PortfolioSerializer(portfolio).data
        async_to_sync(channel_layer.group_send)(
            'portfolios',
            {
                'type': 'portfolio_created',
                'portfolio': portfolio_data
            }
        )
