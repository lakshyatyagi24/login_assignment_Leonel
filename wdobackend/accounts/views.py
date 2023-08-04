from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import (
    UserPersonalDetails,
    UserQualification,
    UserAddress,
    IndustryExperience,
    UserDocuments,
    UserAccount
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    user = request.user

    return JsonResponse({
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'role': user.role
    })

@api_view(['POST'])
@permission_classes([])
def create_custom_user(request):
    data = request.data
    personal_details = data.get('personal_details')
    qualification_details = data.get('qualification_details')
    address = data.get('address')
    industry_experience = data.get('industry_experience')
    document_upload = data.get('document_upload')

    personal_details = UserPersonalDetails.from_dict(data['personal_details'])
    qualification_details = UserQualification.from_dict(data['qualification_details'])
    address = UserAddress.from_dict(data['address'])
    document_upload = UserDocuments.from_dict(data['document_upload'])

    user_account = UserAccount(
        personal_details=personal_details,
        qualification_details=qualification_details,
        address=address,
        document_upload=document_upload)

    user_account.save()

    return JsonResponse({"data": "Successfully extracted"})

