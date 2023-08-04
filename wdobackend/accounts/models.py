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
    father_name = models.CharField(max_length=255, null=True)
    mother_name = models.CharField(max_length=255, null=True)
    email_address = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)
    birthday = models.DateField(max_length=255)
    phonenumber = models.CharField(max_length=255, null=True)
    alter_phone = models.CharField(max_length=255, null=True)
    role = models.CharField(max_length=255)
    avatar = models.CharField(max_length=255, null=True)

    def to_dict(self):
        return {
            "name": self.name,
            "father_name": self.father_name,
            "mother_name": self.mother_name,
            "email_address": self.email_address,
            "password": self.password,
            "birthday": self.birthday,
            "phonenumber": self.phonenumber,
            "alter_phone": self.alter_phone,
            "role": self.role,
            "avatar": self.avatar
        }

    @classmethod
    def from_dict(cls, data):
        return cls(
            name=data.get("name"),
            father_name=data.get("father_name"),
            mother_name=data.get("mother_name"),
            email_address=data.get("email_address"),
            password=data.get("password"),
            birthday=data.get("birthday"),
            phonenumber=data.get("phonenumber"),
            alter_phone=data.get("alter_phone"),
            role=data.get("role"),
            avatar=data.get("avatar")
        )

class Address(models.Model):
    street = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    state = models.CharField(max_length=255, null=True)

    def to_dict(self):
        return {
            'street': self.street,
            'city': self.city,
            'state': self.state,
        }
    
    @classmethod
    def from_dict(cls, ad_dict):
        return cls(
            street=ad_dict['street'],
            city=ad_dict['city'],
            state=ad_dict['state'],
        )

class UserAddress(models.Model):
    permanent_address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='permanent_address', null=True)
    current_address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='current_address', null=True)
    same_address = models.BooleanField(null=True)

    def to_dict(self):
        return {
            'permanent_address': self.permanent_address.to_dict(),
            'current_address': self.current_address.to_dict(),
            'same_address': self.same_address,
        }
    @classmethod
    def from_dict(cls, ua_dict):
        return cls(
            permanent_address=Address.from_dict(ua_dict['permanent_address']),
            current_address=Address.from_dict(ua_dict['current_address']),
            same_address=ua_dict['same_address'],
        )

    def save(self, *args, **kwargs):
        if self.permanent_address:
            self.permanent_address.save()
        if self.current_address:
            self.current_address.save()
        super(UserAddress, self).save(*args, **kwargs)

class Qualification(models.Model):
    board_name = models.CharField(max_length=255, null=True)
    year = models.IntegerField()
    percentage = models.IntegerField()
    roll_no = models.IntegerField()

    @classmethod
    def from_dict(cls, qualification_dict):
        return cls(
            board_name=qualification_dict.get('board_name'),
            year=qualification_dict.get('year'),
            percentage=qualification_dict.get('percentage'),
            roll_no=qualification_dict.get('roll_no')
        )

    def to_dict(self):
        return {
            'board_name': self.board_name,
            'year': self.year,
            'percentage': self.percentage,
            'roll_no': self.roll_no
        }

class UserQualification(models.Model):
    tenth_qualification = models.OneToOneField(
        Qualification,
        on_delete=models.CASCADE,
        null=True,
        related_name='tenth_qualification_reverse'
    )
    twelfth_qualification = models.OneToOneField(
        Qualification,
        on_delete=models.CASCADE,
        null=True,
        related_name='twelfth_qualification_reverse'
    )
    university_qualification = models.OneToOneField(
        Qualification,
        on_delete=models.CASCADE,
        null=True,
        related_name='university_qualification_reverse'
    )
    other_qualification = models.OneToOneField(
        Qualification,
        on_delete=models.CASCADE,
        null=True,
        related_name='other_qualification_reverse'
    )

    @classmethod
    def from_dict(cls, user_qualification_dict):
        return cls(
            tenth_qualification=Qualification.from_dict(user_qualification_dict.get('tenth_qualification')),
            twelfth_qualification=Qualification.from_dict(user_qualification_dict.get('twelfth_qualification')),
            university_qualification=Qualification.from_dict(user_qualification_dict.get('university_qualification')),
            other_qualification=Qualification.from_dict(user_qualification_dict.get('other_qualification'))
        )

    def to_dict(self):
        return {
            'tenth_qualification': self.tenth_qualification.to_dict(),
            'twelfth_qualification': self.twelfth_qualification.to_dict(),
            'university_qualification': self.university_qualification.to_dict(),
            'other_qualification': self.other_qualification.to_dict()
        }
        
    def save(self, *args, **kwargs):
        if self.tenth_qualification:
            self.tenth_qualification.save()
        if self.twelfth_qualification:
            self.twelfth_qualification.save()
        if self.university_qualification:
            self.university_qualification.save()
        if self.other_qualification:
            self.other_qualification.save()

        # call the parent class's save method
        super(UserQualification, self).save(*args, **kwargs)

class IndustryExperience(models.Model):
    industry_name = models.CharField(max_length=255, null=True)
    designation = models.CharField(max_length=255, null=True)
    salary = models.CharField(max_length=255, null=True)
    total_year = models.CharField(max_length=255, null=True)
    user_experiences = models.ForeignKey('UserAccount', on_delete=models.CASCADE, related_name='user_experiences')
    
    def to_dict(self):
        return {
            'industry_name': self.industry_name,
            'designation': self.designation,
            'salary': self.salary,
            'total_year': self.total_year,
            'user_experiences': self.user_experiences.to_dict()  # Assuming UserAccount has a to_dict() method as well
        }
    
    @classmethod
    def from_dict(cls, data):
        industry_name = data.get('industry_name')
        designation = data.get('designation')
        salary = data.get('salary')
        total_year = data.get('total_year')
        user_experiences_data = data.get('user_experiences')
        user_experiences = UserAccount.from_dict(user_experiences_data)  # Assuming UserAccount has a from_dict() method
        
        return cls(
            industry_name=industry_name,
            designation=designation,
            salary=salary,
            total_year=total_year,
            user_experiences=user_experiences
        )

class UserDocuments(models.Model):
    tenth_marksheet = models.CharField(max_length=255, null=True)
    twelfth_marksheet = models.CharField(max_length=255, null=True)
    aadhar_card = models.CharField(max_length=255, null=True)
    alternative_card = models.CharField(max_length=255, null=True)
    bank_passbook = models.CharField(max_length=255, null=True)
    graduation = models.CharField(max_length=255, null=True)
    post_graduation = models.CharField(max_length=255, null=True)
    experience_certificate = models.CharField(max_length=255, null=True)
    
    def to_dict(self):
        return {
            'tenth_marksheet': self.tenth_marksheet,
            'twelfth_marksheet': self.twelfth_marksheet,
            'aadhar_card': self.aadhar_card,
            'alternative_card': self.alternative_card,
            'bank_passbook': self.bank_passbook,
            'graduation': self.graduation,
            'post_graduation': self.post_graduation,
            'experience_certificate': self.experience_certificate
        }
    @classmethod
    def from_dict(cls, data):
        return cls(
            tenth_marksheet=data['tenth_marksheet'],
            twelfth_marksheet=data['twelfth_marksheet'],
            aadhar_card=data['aadhar_card'],
            alternative_card=data['alternative_card'],
            bank_passbook=data['bank_passbook'],
            graduation=data['graduation'],
            post_graduation=data['post_graduation'],
            experience_certificate=data['experience_certificate']
        )

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(max_length=255)
    status = models.CharField(max_length=255, null=True)

    personal_details = models.OneToOneField(UserPersonalDetails, on_delete=models.CASCADE, null=True)
    qualification_details = models.OneToOneField(UserQualification, on_delete=models.CASCADE, null=True)
    address = models.OneToOneField(UserAddress, on_delete=models.CASCADE, null=True)
    # Here is the user experience fields
    document_upload = models.OneToOneField(UserDocuments, on_delete=models.CASCADE, null=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def save(self, *args, **kwargs):
        # perform any additional logic or validations here, if needed

        # save the related fields
        if self.personal_details is not None:
            self.personal_details.save()
            self.set_password(self.personal_details.password)
            self.email = self.personal_details.email_address
            self.role = self.personal_details.role

            full_name = self.personal_details.name  # Replace 'name' with the actual field name in your model

            if full_name:
                split_name = full_name.split()
                
                self.first_name = split_name[0]
                self.last_name = ' '.join(split_name[1:]) if len(split_name) > 1 else ''
            else:
                self.first_name = ''
                self.last_name = ''

        if self.qualification_details is not None:
            self.qualification_details.save()
        if self.address is not None:
            self.address.save()
        if self.document_upload is not None:
            self.document_upload.save()
        if self.role is None:
            self.role = 'admin'
        if self.is_active == 0:
            self.is_active = 1

        # call the parent class's save method
        super().save(*args, **kwargs)

    def to_dict(self):
        user_dict = {
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'is_active': self.is_active,
            'is_staff': self.is_staff,
            'role': self.role,
            'status': self.status,
            'personal_details': self.personal_details.to_dict() if self.personal_details else None,
            'qualification_details': self.qualification_details.to_dict() if self.qualification_details else None,
            'address': self.address.to_dict() if self.address else None,
            'document_upload': self.document_upload.to_dict() if self.document_upload else None
        }
        return user_dict

    def get_full_name(self):
        return self.first_name + self.last_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email
