from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

# # to handle sign ups
# class UserSerializerWithToken(serializers.ModelSerializer):
#     # manually define some fields to include them in the
#     # serialized response
#     token = serializers.SerializerMethodField()
#     password = serializers.CharField(write_only=True)

#     # manually create a token and return it
#     def get_token(self, obj):
#         # get payload handler and encoder methods from DRF JWT package
#         jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#         jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
#         # get payload (the user data)
#         payload = jwt_payload_handler(obj)
#         # encode payload and generate token
#         token = jwt_encode_handler(payload)
#         return token

#     # create an user instance, save it to database and return it
#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         newuser = self.Meta.model(**validated_data)
#         if password is not None:
#             newuser.set_password(password)
#         newuser.save()
#         return newuser

#     class Meta:
#         model = User
#         fields = ('token', 'username', 'password')