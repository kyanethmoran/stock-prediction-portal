from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # anyone should be able to create a user
    permission_class = [AllowAny]

# protected view
class DashboardView(APIView):
    #only authorized users with valid access token can access this 
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = {
            'status': "Request was allowed"
        }
        return Response(response)