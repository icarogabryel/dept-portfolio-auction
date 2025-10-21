from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('apps.users.urls')),
    path('api/portfolios/', include('apps.portfolios.urls')),
    path('api/bids/', include('apps.bids.urls')),
    path('api/notifications/', include('apps.notifications.urls')),
]
