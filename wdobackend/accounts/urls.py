from django.urls import path
from .views import (
    get_current_user,
    create_custom_user,
    get_controllable_users,
    get_user_information
)

urlpatterns = [
    # Other URL patterns
    path('current_user/', get_current_user, name='current_user'),
    path('create_custom_user/', create_custom_user, name='create_custom_user'),
    path('get_controllable_users/', get_controllable_users, name='get_controllable_users'),
    path('get_user_information/', get_user_information, name='get_user_information'),
]
