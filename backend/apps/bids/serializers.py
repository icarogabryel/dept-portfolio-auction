from rest_framework import serializers

from .models import Bid


class BidListSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Bid
        fields = ['id', 'user', 'amount']
        read_only_fields = ['id', 'user', 'amount']


class BidCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = ['portfolio', 'amount']
