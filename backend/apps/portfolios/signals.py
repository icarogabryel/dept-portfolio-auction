from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Portfolio
from .serializers import PortfolioSerializer
from .tasks import schedule_portfolio_notifications


@receiver(post_save, sender=Portfolio)
def portfolio_created(sender, instance, created, **kwargs):
    """
    When a portfolio is created, schedule notification tasks.
    """
    if created:
        schedule_portfolio_notifications(instance)

        # For channels
        channel_layer = get_channel_layer()
        portfolio_data = PortfolioSerializer(instance).data

        async_to_sync(channel_layer.group_send)(
            'portfolios',
            {
                'type': 'portfolio_created',
                'portfolio': portfolio_data
            }
        )
