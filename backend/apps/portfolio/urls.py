from django.urls import path

from .views import PortfolioCollectionView, PortfolioResourceView


app_name = 'portfolio'

urlpatterns = [
    path('', PortfolioCollectionView.as_view(), name='collection'),
    path('<int:pk>/', PortfolioResourceView.as_view(), name='resource'),
]
