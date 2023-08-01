from django.contrib.auth.models import BaseUserManager

class WDOUserManager(BaseUserManager):
    def create_user(self, email, password=None, role=None, **extra_fields):
        # Validate email and role
        print('create_user has been called')
        if not email:
            raise ValueError("The Email field must be set")
        if not role:
            raise ValueError("The Role field must be set")

        # Normalize email address
        email = self.normalize_email(email)

        print('This is role', role)
        if role == 'superuser' :
            print('This is for super user')
            extra_fields.setdefault('is_staff', True)
            extra_fields.setdefault('is_superuser', True)

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
