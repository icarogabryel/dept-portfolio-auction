from django.urls import path

from .views import BidOfActivesListView, BidUpdateView


app_name = 'bids'

urlpatterns = [
    path('actives/', BidOfActivesListView.as_view(), name='active-portfolio-bids-list-create'),
    path('actives/<int:pk>/', BidUpdateView.as_view(), name='active-portfolio-bid-update'),
]
