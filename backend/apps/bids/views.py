from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions

from .models import Bid
from .serializers import BidSerializer


class BidCollectionView(ListCreateAPIView):
    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Bid.objects.all()
        portfolio = self.request.GET.get('portfolio')
        if portfolio:
            queryset = queryset.filter(portfolio_id=portfolio)
        return queryset

    def perform_create(self, serializer: BidSerializer):
        serializer.save(user=self.request.user)


class BidResourceView(RetrieveUpdateDestroyAPIView):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated]
