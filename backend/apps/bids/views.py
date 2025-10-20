from typing import Any

from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import ListAPIView, ListCreateAPIView, UpdateAPIView

from ..portfolios.models import Portfolio
from .models import Bid
from .permissions import IsOwner
from .serializers import BidCreateUpdateSerializer, BidListSerializer


class BidOfActivesListView(ListCreateAPIView):
    """View to list and create bids for active portfolios."""
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self) -> Any:
        if self.request.method == 'POST':
            return BidCreateUpdateSerializer
        return BidListSerializer

    def get_queryset(self) -> Any:
        queryset = Bid.objects.all()
        portfolio_id = self.request.GET.get('portfolio')

        if portfolio_id:
            try:
                portfolio_obj = Portfolio.objects.get(pk=portfolio_id)
                if not portfolio_obj.is_active:
                    raise PermissionDenied("Portfolio is not active")
            except Portfolio.DoesNotExist:
                return queryset.none()
            queryset = queryset.filter(portfolio_id=portfolio_id)
        return queryset

    def perform_create(self, serializer: BidCreateUpdateSerializer):
        serializer.save(user=self.request.user)


class BidUpdateView(UpdateAPIView):
    queryset = Bid.objects.all()
    serializer_class = BidCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def perform_update(self, serializer):
        bid = self.get_object()
        if not bid.portfolio.is_active:
            raise PermissionDenied("Cannot update bid for an inactive portfolio")
        serializer.save()


class BidListView(ListAPIView):
    """View to list and create bids for any portfolios."""
    permission_classes = [permissions.IsAdminUser]
    serializer_class = BidListSerializer

    def get_queryset(self) -> Any:
        queryset = Bid.objects.all()
        portfolio_id = self.request.GET.get('portfolio')

        if portfolio_id:
            queryset = queryset.filter(portfolio_id=portfolio_id)
        return queryset
