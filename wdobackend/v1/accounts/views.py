from rest_auth.registration.views import SocialLoginView
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_framework.permissions import (
	AllowAny
)
from v1.accounts.serializers import (
	UserCreateSerializer,
	UserSerializer,
)
from django.http import HttpResponse
from django.http import HttpResponseBadRequest
import json
from django.http import JsonResponse

User=get_user_model()

class UserCreateView(CreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserCreateSerializer
	permission_classes = (AllowAny, )

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

def custom_register(request):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			email = data['email']
			role = data['role']
			password = data['password']
			username = data['username']
			user = User.objects.create_user(email=email, role=role, password=password, username=username)
			user.save()
			return HttpResponse('Registration has been failed!')
		except Exception as e:
			return JsonResponse({ 'error': str(e), 'status': 'error' }, status=500)

	return HttpResponse('Registration has been failed!')
