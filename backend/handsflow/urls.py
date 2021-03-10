from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from . import views

urlpatterns = [
    # Authentication APIs
    path('login/', obtain_jwt_token), # REST built-in
    path('getuser/', views.getuser.as_view()), 
    path('signup/', views.signup.as_view()),
    # APIs
    path('logpeer/', views.logpeer.as_view()),
    path('room/', views.room.as_view()),

]