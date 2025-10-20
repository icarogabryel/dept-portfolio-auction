from django.urls import path

from .views import BidOfActivesCollectionView


app_name = 'bids'

urlpatterns = [
    path('actives/', BidOfActivesCollectionView.as_view(), name='active-portfolio-bids'),
]
