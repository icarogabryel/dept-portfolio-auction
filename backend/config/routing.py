from django.urls import path
from apps.portfolios.consumers import PortfolioConsumer
from apps.bids.consumers import BidConsumer

websocket_urlpatterns = [
    path('ws/portfolios/', PortfolioConsumer.as_asgi()),
    path('ws/bids/', BidConsumer.as_asgi()),
]
