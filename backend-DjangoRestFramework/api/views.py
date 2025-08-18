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

# to save file
import os
from django.conf import settings


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

            if df.empty:
                return Response({'error': "No data found for the given ticker.",
                                 'status': status.HTTP_404_NOT_FOUND})
            
            df = df.reset_index() 
            print(df)

            # Style Charts
            plt.style.use('../Resources/custom_darkmode.mplstyle') #style file in resources folder for matplotlib

            # Basic Ticker Close Price Chart
            plt.switch_backend('AGG')
            plt.figure(figsize = (15,5 ))
            plt.plot(df.Close, color='grey', linewidth=1, label='Closing Price')
            plt.title(f'Closing Price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()

            #save basic plot to a file
            plot_img_path = f'{ticker}_plot.png'
            image_path = os.path.join(settings.MEDIA_ROOT, plot_img_path)
            plt.savefig(image_path, bbox_inches='tight')
            plt.close()
            plot_img = settings.MEDIA_URL + plot_img_path
            print(plot_img)

            #send responponse to the frontend
            return Response({
                'status': 'success',
                'plot_img': plot_img,
                })