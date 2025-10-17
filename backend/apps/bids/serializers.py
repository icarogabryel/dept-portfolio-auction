from rest_framework import serializers

from .models import Bid


class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = ['id', 'user', 'portfolio', 'amount', 'status']
        read_only_fields = ['id', 'status']
        extra_kwargs = {
            'user': {'required': True},
            'portfolio': {'required': True},
            'amount': {'required': True},
        }
