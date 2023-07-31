from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password

class WDOUserManager(BaseUserManager):
    def create_user(self, email, password=None, role=None, **extra_fields):
        # Validate email and role
        if not email:
            raise ValueError("The Email field must be set")
        if not role:
            raise ValueError("The Role field must be set")

        # Normalize email address
        email = self.normalize_email(email)

        # Create and save the user
        user = self.model(email=email, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, role=None, **extra_fields):
        # Create a superuser with the given email, password, and role
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, role, **extra_fields)

class WDOUserModel(AbstractBaseUser, PermissionsMixin):
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
