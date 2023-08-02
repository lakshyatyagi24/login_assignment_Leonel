from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

# Create your views here
def get_current_user(request):
    user = request.user
    print(user)
    data = {
    }
    return JsonResponse(data)