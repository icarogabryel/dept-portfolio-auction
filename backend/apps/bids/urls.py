from django.urls import path

from .views import BidCollectionView, BidResourceView


app_name = 'bids'

urlpatterns = [
    path('', BidCollectionView.as_view(), name='collection'),
    path('<int:pk>/', BidResourceView.as_view(), name='resource'),
]
