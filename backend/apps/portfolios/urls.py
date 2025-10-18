from django.urls import path

from .views import ActivePortfolioListView, PortfolioCollectionView, PortfolioResourceView

app_name = 'portfolios'

urlpatterns = [
    path('', PortfolioCollectionView.as_view(), name='collection'),
    path('active/', ActivePortfolioListView.as_view(), name='active-list'),
    path('<int:pk>/', PortfolioResourceView.as_view(), name='resource'),
]
