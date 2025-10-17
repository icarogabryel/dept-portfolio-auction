from django.db import models


class Portfolio(models.Model):
    id: models.AutoField
    name = models.CharField(max_length=100)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    minimum_bid = models.DecimalField(max_digits=10, decimal_places=2)
    auction_end = models.DateTimeField()
