from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        print('This is create_user protocol')
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.is_active = 1
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class UserPersonalDetails(models.Model):
    name = models.CharField(max_length=255)
    father_name = models.CharField(max_length=255)
    mother_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)
    birthday = models.DateField(max_length=255)
    phonenumber = models.CharField(max_length=255)
    alterphone = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    avatar = models.CharField(max_length=255)

class Address(models.Model):
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)

class UserAddress(models.Model):
    permanent_address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='permanent_address')
    current_address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='current_address')
    same_address = models.BooleanField()

class Qualification(models.Model):
    board_name = models.CharField(max_length=255)
    year = models.IntegerField()
    percentage = models.IntegerField()

class UserQualification(models.Model):
    tenth_qualification = models.ForeignKey(Qualification, on_delete=models.CASCADE, related_name='user_tenth_qualification')
    twelfth_qualification = models.ForeignKey(Qualification, on_delete=models.CASCADE, related_name='user_twelfth_qualification')
    university_qualification = models.ForeignKey(Qualification, on_delete=models.CASCADE, related_name='user_university_qualification')
    other_qualification = models.ForeignKey(Qualification, on_delete=models.CASCADE, related_name='user_other_qualification')

class IndustryExperience(models.Model):
    industry_name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    salary = models.CharField(max_length=255)
    total_year = models.CharField(max_length=255)
    user_experiences = models.ForeignKey('UserAccount', on_delete=models.CASCADE, related_name='user_experiences')

class UserDocuments(models.Model):
    tenth_marksheet = models.CharField(max_length=255)
    tweltf_marksheet = models.CharField(max_length=255)
    adahar_card = models.CharField(max_length=255)
    alter_government_id = models.CharField(max_length=255)
    bank_passbook = models.CharField(max_length=255)
    graduation = models.CharField(max_length=255)
    post_graduation = models.CharField(max_length=255)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(max_length=255)
    status = models.CharField(max_length=255)

    personal_details = models.OneToOneField(UserPersonalDetails, on_delete=models.CASCADE)
    qualification_details = models.OneToOneField(UserQualification, on_delete=models.CASCADE)
    address = models.OneToOneField(UserAddress, on_delete=models.CASCADE)
    # Here is the user experience fields
    document_upload = models.OneToOneField(UserDocuments, on_delete=models.CASCADE)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def to_dict(self):
        return {
            role: self.role
        }

    def get_full_name(self):
        return self.first_name + self.last_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email
