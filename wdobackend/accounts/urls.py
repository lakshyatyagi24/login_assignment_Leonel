from django.urls import path
from .views import get_current_user

urlpatterns = [
    # Other URL patterns
    path('current_user/', get_current_user, name='current_user'),
]
