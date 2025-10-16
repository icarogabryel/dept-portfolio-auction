from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/portfolios/', include('apps.portfolio.urls')),
]
