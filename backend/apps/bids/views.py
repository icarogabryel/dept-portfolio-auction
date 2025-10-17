from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Bid
from .serializers import BidSerializer


class BidCollectionView(ListCreateAPIView):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer


class BidResourceView(RetrieveUpdateDestroyAPIView):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
