from typing import Any

from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions

from .models import Portfolio
from .serializers import PortfolioSerializer


class PortfolioCollectionView(ListCreateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAdminUser]


class PortfolioResourceView(RetrieveUpdateDestroyAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAdminUser]


class ActivePortfolioListView(ListAPIView):
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> Any:
        return [p for p in Portfolio.objects.all() if p.is_active]
