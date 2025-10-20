from django.urls import path

from .views import BidListView, BidOfActivesListView, BidUpdateView

app_name = 'bids'

urlpatterns = [
    path('', BidListView.as_view(), name='bids-list'),
    path('actives/', BidOfActivesListView.as_view(), name='active-portfolio-bids-list-create'),
    path('actives/<int:pk>/', BidUpdateView.as_view(), name='active-portfolio-bid-update'),
]
