from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django import forms

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    role = forms.CharField(max_length=50)

    class Meta:
        model = get_user_model()
        fields = ('email', 'role', 'password')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.role = self.cleaned_data['role']
        password = self.cleaned_data["password"]
        user.set_password(password)

        if commit:
            user.save()
        return user