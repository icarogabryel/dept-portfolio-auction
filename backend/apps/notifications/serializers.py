from rest_framework import serializers

from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    portfolio_name = serializers.CharField(source='portfolio.name', read_only=True)
    message = serializers.CharField(source='get_type_display', read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'type', 'message', 'created_at', 'portfolio', 'portfolio_name']
        read_only_fields = ['id', 'type', 'created_at', 'portfolio']
