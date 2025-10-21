from django.urls import path

from .views import (ActivePortfolioListView, PortfolioCollectionView, PortfolioResourceView,
                    UploadCsvView)

app_name = 'portfolios'

urlpatterns = [
    path('', PortfolioCollectionView.as_view(), name='collection'),
    path('<int:pk>/', PortfolioResourceView.as_view(), name='resource'),
    path('active/', ActivePortfolioListView.as_view(), name='active-list'),
    path('upload-csv/', UploadCsvView.as_view(), name='upload-csv'),
]
