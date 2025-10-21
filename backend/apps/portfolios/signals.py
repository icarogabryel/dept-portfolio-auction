from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Portfolio
from .tasks import schedule_portfolio_notifications


@receiver(post_save, sender=Portfolio)
def portfolio_created(sender, instance, created, **kwargs):
    """
    When a portfolio is created, schedule notification tasks.
    """
    if created:
        schedule_portfolio_notifications(instance)
