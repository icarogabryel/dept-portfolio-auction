from typing import Any

from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView

from .models import Bid
from .serializers import BidListSerializer
from ..portfolios.models import Portfolio
from rest_framework.exceptions import PermissionDenied


class BidOfActivesCollectionView(ListCreateAPIView):
    """View to list and create bids for active portfolios."""
    serializer_class = BidListSerializer
    permission_classes = [permissions.IsAuthenticated]

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

    # def perform_create(self, serializer: BidListSerializer):
    #     serializer.save(user=self.request.user)


# class BidResourceView(RetrieveUpdateDestroyAPIView):
#     queryset = Bid.objects.all()
#     serializer_class = BidSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_update(self, serializer):
#         serializer.save()

#     def perform_destroy(self, instance):
#         instance.delete()
