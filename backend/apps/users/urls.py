from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views


app_name = 'users'

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('register/', views.UserRegisterView.as_view(), name='user-register'),
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('', views.UserListView.as_view(), name='user-list'),
    path('<int:pk>/', views.UserRetrieveView.as_view(), name='user-detail'),
]
