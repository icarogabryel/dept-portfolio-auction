from django.contrib.auth.models import User
from django.db import models

from ..portfolios.models import Portfolio


class NotificationType(models.TextChoices):
    OUTBID = 'outbid', 'You have been outbid'
    CLOSING_SOON = 'close', '30 minutes remaining in auction'
    WIN = 'win', 'You have won the auction!'
    LOSS = 'loss', 'You have lost the auction'


class Notification(models.Model):
    id: models.AutoField
    type = models.CharField(
        max_length=20,
        choices=NotificationType.choices
    )
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
