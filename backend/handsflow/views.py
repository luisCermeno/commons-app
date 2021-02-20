from django.shortcuts import render

# Create your views here.

from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken


class getuser(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    # get function from rest framework automatically decodes 
    # token and turns request into a rest get request instance
    def get(self, request, format=None):
        print('********************************************')
        print('New Get User Request:')
        print(f'->User:{request.user}')
        serializer = UserSerializer(request.user)
        print('->Outcoming JSON:')
        print(serializer.data)
        print('********************************************')
        return Response(serializer.data)

class signup(APIView):
    # Create a new user. It's called 'UserList' because normally we'd have a get
    # method here too, for retrieving a list of all User objects.
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        print('********************************************')
        print('New Sign Up:')
        print(f'->Username: {request.data.get("username")}')
        print(f'->Password: {request.data.get("password")}')
        print(f'->Incoming JSON: {request.data}')
        
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print('->Outcoming JSON:')
            print(serializer.data)
            print('********************************************')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)