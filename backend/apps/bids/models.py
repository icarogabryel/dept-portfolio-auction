from django.contrib.auth.models import User
from django.db import models

from ..portfolios.models import Portfolio


# Relational entity between User and Portfolio
class Bid(models.Model):
    id: models.BigAutoField  # For type hinting purposes
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name='bids')
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='bids')
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        ordering = ['-amount']  # Higher bids first
        unique_together = ('user', 'portfolio')
        verbose_name = 'Bid'
        verbose_name_plural = 'Bids'

    def __str__(self):
        return (
            f'Bid of {self.amount} by {self.user.username} on {self.portfolio.name})'
        )
