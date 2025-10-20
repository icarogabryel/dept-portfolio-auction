from decimal import Decimal
from typing import Optional

from rest_framework import serializers

from ..portfolios.models import Portfolio
from .models import Bid


# class BidSerializer(serializers.ModelSerializer):
#     user = serializers.CharField(source='user.username', read_only=True)

#     class Meta:
#         model = Bid
#         fields = ['id', 'user', 'portfolio', 'amount', 'status']
#         read_only_fields = ['id', 'status', 'user']
#         extra_kwargs = {
#             'portfolio': {'required': True},
#             'amount': {'required': True},
#         }

#     def validate(self, attrs):
#         portfolio: Optional[Portfolio] = getattr(self.instance, 'portfolio', None)

#         if portfolio is None:
#             raise serializers.ValidationError('A portfolio must be supplied for the bid.')

#         if 'amount' not in attrs:
#             raise serializers.ValidationError('A bid amount is required.')

#         try:
#             amount = Decimal(str(attrs['amount']))
#         except (TypeError, ValueError, ArithmeticError):
#             raise serializers.ValidationError('Bid amount must be a valid number.')

#         other_bids = Bid.objects.filter(portfolio=portfolio)
#         if self.instance is not None:
#             other_bids = other_bids.exclude(pk=self.instance.pk)

#         if other_bids.exists():
#             max_other_bid = max(Decimal(str(b.amount)) for b in other_bids)
#             if amount <= max_other_bid:
#                 raise serializers.ValidationError(
#                     f"Bid must be greater than the current highest bid of ${max_other_bid}"
#                 )
#         else:
#             minimum_bid = Decimal(str(portfolio.minimum_bid))
#             if amount < minimum_bid:
#                 raise serializers.ValidationError(
#                     f"Bid must be at least the minimum bid of ${portfolio.minimum_bid}"
#                 )

#         return attrs


class BidListSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Bid
        fields = ['id', 'user', 'amount']
        read_only_fields = ['id', 'user']


class BidCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = ['portfolio', 'amount']
