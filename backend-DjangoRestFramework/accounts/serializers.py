from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    # so that the password can be read
    password = serializers.CharField(write_only=True, min_length=4, style={'input_type': 'password'})
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

        # default user models will not validate emails for uniqueness 
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email address already exists.")
        return value

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