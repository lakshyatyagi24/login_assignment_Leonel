from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser

from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from .managers import WDOUserManager

class WDOUserModel(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50)
    username = models.CharField(max_length=500)
    # Add more fields as per your requirements

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role']

    objects = WDOUserManager()

    def __str__(self):
        return self.email

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
