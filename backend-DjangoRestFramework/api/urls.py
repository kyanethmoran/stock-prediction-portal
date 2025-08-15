from django.urls import path
from accounts import views as UserViews
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import StockPredictionAPIView

urlpatterns = [
    path('register/',UserViews.RegisterView.as_view()),


    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # protected view path
    path('dashboard/', UserViews.DashboardView.as_view()),

    #url pattern for the prediction api
    path('predict/', StockPredictionAPIView.as_view(), name='stock_prediction')
]
