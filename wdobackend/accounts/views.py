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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_controllable_users(request):
    roles = ['boss', 'ceo', 'superadmin', 'admin', 'manager', 'team_leader', 'employee', 'teacher', 'others']
    role = request.user.role

    if role not in roles:
        return JsonResponse({'msg': 'This role does not exist in role controlls'}, status=500)

    index = roles.index(role) + 1
    control_roles = roles[index:]

    users = UserAccount.objects.all()
    users_with_role = users.filter(role__in=control_roles)

    user_persons = []

    for user in users_with_role:
        json_data = { 
            "email": user.email, 
            "first_name": user.first_name, 
            "last_name": user.last_name, 
            "role": user.role, 
            "status": user.status
        }
        print(json_data)
        user_persons.append(json_data)

    return JsonResponse({"users": user_persons}, status=200)