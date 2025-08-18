from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response

import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime


# Create your views here.
# APIView over generics because we want more control over the custom calculations
class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data = request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            #fetch the data from yfinance (same code as in jupyter notebook)
            now = datetime.now()
            start = datetime(now.year-10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            print(df)

            if df.empty:
                return Response({'error': "No data found for the given ticker.",
                                 'status': status.HTTP_404_NOT_FOUND})

            return Response({'status': 'success', 'ticker': ticker})