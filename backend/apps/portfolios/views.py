from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Portfolio
from .serializers import PortfolioSerializer


class PortfolioCollectionView(ListCreateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer


class PortfolioResourceView(RetrieveUpdateDestroyAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
