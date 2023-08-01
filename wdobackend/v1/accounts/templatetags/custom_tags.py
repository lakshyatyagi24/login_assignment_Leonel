from django import template
from django.urls import reverse

register = template.Library()

@register.simple_tag
def provider_login_url(provider):
    # Logic to generate the login URL for the given provider
    return reverse('login')  # Replace 'login' with your actual login URL name