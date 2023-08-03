from django import forms
from .models import UserPersonalDetails, UserQualification

class UserPersonalDetailsForm(forms.ModelForm):
    class Meta:
        model = UserPersonalDetails
        fields = '__all__'

class UserQualificationForm(forms.ModelForm):
    class Meta:
        model = UserQualification
        fields = '__all__'
