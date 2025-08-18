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
from .utils import save_plot

#create scaler object
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model


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
            plot_img = save_plot(plot_img_path)

            # 100 day moving average plot
            ma100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize = (15,5 ))
            plt.plot(df.Close, color='grey', linewidth=1, label='Closing Price')
            plt.plot(ma100, color='cyan', linewidth=1, label='100 DMA')
            plt.title(f'Closing Price of {ticker} With 100 Day Moving Average')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()

            plot_img_path = f'{ticker}_100_dma.png'
            plot_100_dma = save_plot(plot_img_path)

            # 200 day moving average plot
            ma200 = df.Close.rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize = (15,5 ))
            plt.plot(df.Close, color='grey', linewidth=1, label='Closing Price')
            plt.plot(ma200, color='yellow', linewidth=1, label='200 DMA')
            plt.title(f'Closing Price of {ticker} With 200 Day Moving Average')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()

            plot_img_path = f'{ticker}_200_dma.png'
            plot_200_dma = save_plot(plot_img_path)

            # 100 and 200 day moving average plot with close price
            plt.switch_backend('AGG')
            plt.figure(figsize = (15,5 ))
            plt.plot(df.Close, color='grey', linewidth=1, label='Closing Price')
            plt.plot(ma100, color='cyan', linewidth=1, label='100 DMA')
            plt.plot(ma200, color='yellow', linewidth=1, label='200 DMA')
            plt.title(f'{ticker} 100 & 200 Day Moving Average')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()

            plot_img_path = f'{ticker}_100_200_dma.png'
            plot_100_200_dma = save_plot(plot_img_path)

            #splitting data into training and testing datasets
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])    #take the first 70% of data to train with
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7): int(len(df))])  #compare prediction to last 30%

            #Scaling down the data between 0 and 1
            scaler = MinMaxScaler(feature_range=(0,1))

            #do not need to train will use the already trained model in resources
            model = load_model('../backend-DjangoRestFramework/stock_prediction_model.keras')

            #preparing test data
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)

            x_test=[]
            y_test=[]

            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i, 0])

            x_test,y_test = np.array(x_test), np.array(y_test)

            #making predictions
            y_predicted = model.predict(x_test)

            #revert the scaled prices to original price
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()

            #plot the final prediction
            plt.switch_backend('AGG')
            plt.figure(figsize = (15,5 ))
            plt.plot(y_test, color='grey', linewidth=1, label='Original Price')
            plt.plot(y_predicted, color='cyan', linewidth=1, label='Predicted Price')
            plt.title(f'{ticker} Future Prediction')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()

            plot_img_path = f'{ticker}_prediction.png'
            plot_prediction = save_plot(plot_img_path)


            #send responponse to the frontend
            return Response({
                'status': 'success',
                'plot_img': plot_img,
                'plot_100_dma': plot_100_dma,
                'plot_200_dma': plot_200_dma,
                'plot_100_200_dma': plot_100_200_dma,
                'plot_prediction': plot_prediction
                })