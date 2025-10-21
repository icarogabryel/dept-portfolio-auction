from datetime import timedelta

from apps.portfolios.models import Portfolio
from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from .models import Bid


class BidModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.portfolio = Portfolio.objects.create(
            name='Test Portfolio',
            description='Test Description',
            total_amount=5000.00,
            minimum_bid=1000.00,
            auction_end=timezone.now() + timedelta(days=1)
        )
        self.bid = Bid.objects.create(
            user=self.user,
            portfolio=self.portfolio,
            amount=1500.00
        )

    def test_bid_creation(self):
        """Test that a bid can be created"""
        self.assertEqual(self.bid.amount, 1500.00)
        self.assertEqual(self.bid.user, self.user)
        self.assertEqual(self.bid.portfolio, self.portfolio)
        self.assertIsNotNone(self.bid.id)

    def test_bid_str(self):
        """Test the string representation of bid"""
        expected = f'Bid of {self.bid.amount} by {self.user.username} on {self.portfolio.name})'
        self.assertEqual(str(self.bid), expected)

    def test_bid_amount_greater_than_minimum(self):
        """Test that bid amount is greater than minimum bid"""
        self.assertGreaterEqual(self.bid.amount, self.portfolio.minimum_bid)
