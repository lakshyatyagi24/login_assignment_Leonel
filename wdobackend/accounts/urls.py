from django.urls import path
from .views import (
    get_current_user,
    create_custom_user,
    get_controllable_users,
)

urlpatterns = [
    # Other URL patterns
    path('current_user/', get_current_user, name='current_user'),
    path('create_custom_user/', create_custom_user, name='create_custom_user'),
    path('get_controllable_users/', get_controllable_users, name='get_controllable_users'),
]
