from django.urls import path
from .views import signup, getuser
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    # Authentication APIs
    path('token-auth/', obtain_jwt_token), # login
    path('getuser/', getuser.as_view()), # get user
    path('signup/', signup.as_view()) # signup
    # ... APIs
]