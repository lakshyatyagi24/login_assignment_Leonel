from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/auth/', include('djoser.social.urls')),
    path('api/account/', include('accounts.urls'))
]
