from django.urls import path
from .views import get_current_user

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # Other URL patterns
    path('current_user/', get_current_user, name='current_user'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)