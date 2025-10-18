from rest_framework import serializers

from .models import Portfolio


class PortfolioSerializer(serializers.ModelSerializer):
    is_active = serializers.SerializerMethodField()

    class Meta:
        model = Portfolio
        fields = '__all__'
        read_only_fields = ['id']

    def get_is_active(self, obj: Portfolio):
        return obj.is_active
