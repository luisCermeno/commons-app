from django.shortcuts import render
from django.db import IntegrityError

# Create your views here.

from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework_jwt.settings import api_settings
import json

class getuser(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    # get function from rest framework automatically decodes 
    # token and turns request into a rest get request instance
    # which includes the user
    def get(self, request, format=None):
        print('---------------------------------')
        print('Running getuser(APIView):')
        print(f'->request user: {request.user}')
        serializer = UserSerializer(request.user)
        response = serializer.data
        print (f'->response: {response}')
        return Response(response, status=status.HTTP_202_ACCEPTED)

class signup(APIView):
    permission_classes = (permissions.AllowAny,)
    def post (self, request, format=None):
        # Log incoming data to console
        print('---------------------------------')
        print('running signup(APIView):')
        print(f'->request body: {request.data}')
        # Destructure the user data from the request
        username = request.data.get("username")
        password = request.data.get("password")
        try: 
            # Try to create new user with the data
            newuser = User.objects.create_user(username = username, password = password)
            newuser.save()
            # Get payload handler and encoder methods from DRF JWT package
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
            # Handle payload (the new user model)
            payload = jwt_payload_handler(newuser)
            # Encode Payload and generate token 
            token = jwt_encode_handler(payload)
            # Create response
            response = {
                'token' : token, 
                "username" : newuser.username
            }
            print (f'->response: {response}')
            return Response(response, status=status.HTTP_201_CREATED)
            # In case username is already taken
        except IntegrityError:
            return Response({'error': 'Username already taken'},status=status.HTTP_200_OK)
