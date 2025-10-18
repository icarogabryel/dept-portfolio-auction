from typing import Any

from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Portfolio
from .serializers import PortfolioSerializer


class PortfolioCollectionView(ListCreateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer


class PortfolioResourceView(RetrieveUpdateDestroyAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer


class ActivePortfolioListView(ListAPIView):
    serializer_class = PortfolioSerializer

    def get_queryset(self) -> Any:
        return [p for p in Portfolio.objects.all() if p.is_active]
