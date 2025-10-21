from django.db.models.signals import pre_save
from django.dispatch import receiver

from ..notifications.models import Notification, NotificationType
from .models import Bid


@receiver(pre_save, sender=Bid)
def notify_outbid_user(sender, instance, **kwargs):
    """Signal to notify the previous winning bidder when they are outbid."""
    # Only process if this is a new bid being created (not an update)

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
