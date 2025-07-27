from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    # so that the password can be read
    password = serializers.CharField(write_only=True, min_length=4, style={'input_type': 'password'})
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):

        # this can be replaced with **validated_data since we have only required fields
        # user = User.objects.create_user(
        #     validated_data['username'],
        #     validated_data['email'],
        #     validated_data['password'],
        # )

        # .create will save the password in a plain text
        # .create_user will auto hash the password
        user = User.objects.create_user(**validated_data)

        return user