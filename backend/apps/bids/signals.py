from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from ..notifications.models import Notification, NotificationType
from .models import Bid
from .serializers import BidListSerializer


@receiver(pre_save, sender=Bid)
def notify_outbid_user(sender, instance, **kwargs):
    """Signal to notify the previous winning bidder when they are outbid."""
    portfolio = instance.portfolio

    # Get the current winning bid before this new bid is saved
    current_winning_bid = portfolio.get_winning_bid()

    # If there's a previous winning bid, notify that user
    if current_winning_bid is not None:
        previous_winner = current_winning_bid.user

        # Create notification for the outbid user
        Notification.objects.create(
            user=previous_winner,
            portfolio=portfolio,
            type=NotificationType.OUTBID
        )

@receiver(post_save, sender=Bid)
def bid_created_websocket(sender, instance, created, **kwargs):
    """Send WebSocket message when a bid is created or updated."""
    channel_layer = get_channel_layer()
    bid_data = BidListSerializer(instance).data

    bid_data['portfolio_id'] = instance.portfolio.id
    bid_data['portfolio_name'] = instance.portfolio.name

    if created:
        # Novo bid criado
        async_to_sync(channel_layer.group_send)(
            'bids',
            {
                'type': 'bid_created',
                'bid': dict(bid_data)
            }
        )
    else:
        # Bid atualizado
        async_to_sync(channel_layer.group_send)(
            'bids',
            {
                'type': 'bid_updated',
                'bid': dict(bid_data)
            }
        )
