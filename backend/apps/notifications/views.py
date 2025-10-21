from rest_framework import permissions
from rest_framework.generics import ListAPIView

from .models import Notification
from .permissions import IsOwner
from .serializers import NotificationSerializer


class UserNotificationsView(ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        # Return only notifications for the authenticated user
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')
