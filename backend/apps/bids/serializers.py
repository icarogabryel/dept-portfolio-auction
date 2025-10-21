from rest_framework import serializers

from .models import Bid


class BidListSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Bid
        fields = ['id', 'user', 'amount']
        read_only_fields = ['id', 'user', 'amount']


class UserBidListSerializer(serializers.ModelSerializer):
    portfolio_name = serializers.CharField(source='portfolio.name', read_only=True)

    class Meta:
        model = Bid
        fields = ['id', 'portfolio', 'portfolio_name', 'amount']
        read_only_fields = ['id', 'portfolio', 'portfolio_name', 'amount']


class BidCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = ['portfolio', 'amount']
