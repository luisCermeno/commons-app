# models
from django.contrib.auth.models import User

# frameworks
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)