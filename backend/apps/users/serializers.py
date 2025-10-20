from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'password']
        read_only_fields = ['id']
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    """Serializer to list users for admin purposes"""
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'is_staff']
        read_only_fields = ['id']


class UserIsAdminSerializer(serializers.ModelSerializer):
    """Serializer to check admin status"""
    class Meta:
        model = User
        fields = ['is_staff']
        read_only_fields = ['is_staff']
