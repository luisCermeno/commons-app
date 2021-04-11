from commons.serializers import UserSerializer

# modify the default response  of DRF JWT to token-auth/ so that it also 
# returns the user data
def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }