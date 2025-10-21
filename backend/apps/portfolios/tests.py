from datetime import timedelta

from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from .models import Portfolio


class PortfolioModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.portfolio = Portfolio.objects.create(
            name='Test Portfolio',
            description='Test Description',
            total_amount=5000.00,
            minimum_bid=1000.00,
            auction_end=timezone.now() + timedelta(days=1)
        )

    def test_portfolio_creation(self):
        """Test that a portfolio can be created"""
        self.assertEqual(self.portfolio.name, 'Test Portfolio')
        self.assertEqual(self.portfolio.minimum_bid, 1000.00)
        self.assertIsNotNone(self.portfolio.id)

    def test_portfolio_str(self):
        """Test the string representation of portfolio"""
        expected = f'Portfolio: {self.portfolio.name} (Ends: {self.portfolio.auction_end})'
        self.assertEqual(str(self.portfolio), expected)

    def test_is_active(self):
        """Test that portfolio is active when auction hasn't ended"""
        self.assertTrue(self.portfolio.is_active)

    def test_is_not_active(self):
        """Test that portfolio is not active when auction has ended"""
        self.portfolio.auction_end = timezone.now() - timedelta(days=1)
        self.portfolio.save()
        self.assertFalse(self.portfolio.is_active)
