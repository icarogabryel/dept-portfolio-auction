from django.db import models
from django.db.models import QuerySet
from django.utils import timezone


class Portfolio(models.Model):
    id: models.AutoField  # For type hinting purposes
    name = models.CharField(max_length=100)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    minimum_bid = models.DecimalField(max_digits=10, decimal_places=2)
    auction_end = models.DateTimeField()
    bids: QuerySet  # For type hinting purposes

    class Meta:
        ordering = ['-auction_end']  # Most recent auctions first
        verbose_name = 'Portfolio'
        verbose_name_plural = 'Portfolios'

    def __str__(self):
        return f'Portfolio: {self.name} (Ends: {self.auction_end})'

    @property
    def is_active(self):
        return self.auction_end > timezone.now()

    def get_winning_bid(self):
        return self.bids.order_by('-amount').first()  # Highest bid wins
