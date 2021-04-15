from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from . import views

urlpatterns = [
    # Authentication APIs
    path('login/', obtain_jwt_token), # REST JWT built-in
    path('getuser/', views.getuser.as_view()), 
    path('signup/', views.signup.as_view()),
    # APIs
    path('logpeer/', views.logpeer.as_view()),
    path('room/', views.room.as_view()),
    path('getroom/', views.getroom.as_view()),
    path('message/', views.message.as_view()),
    path('getprofile/', views.getprofile.as_view()),
    path('editprofile/', views.editprofile.as_view()),
]