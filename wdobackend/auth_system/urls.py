from django.urls import path, include, re_path
from django.views.generic import TemplateView

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/auth/', include('djoser.social.urls')),
    path('api/account/', include('accounts.urls'))
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name="index.html"))]