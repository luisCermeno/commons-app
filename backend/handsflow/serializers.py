# models
from django.contrib.auth.models import User
from .models import Peer

# frameworks
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)