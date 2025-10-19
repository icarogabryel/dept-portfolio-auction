from rest_framework import serializers

from .models import Bid


class BidSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Bid
        fields = ['id', 'user', 'portfolio', 'amount', 'status']
        read_only_fields = ['id', 'status', 'user']
        extra_kwargs = {
            'portfolio': {'required': True},
            'amount': {'required': True},
        }
