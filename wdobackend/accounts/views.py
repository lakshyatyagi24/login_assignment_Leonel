from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate

from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
import json

from .models import (
    UserPersonalDetails,
    UserQualification,
    UserAddress,
    IndustryExperience,
    UserDocuments,
    UserAccount
)

roles = ['boss', 'ceo', 'superadmin', 'admin', 'manager', 'team_leader', 'employee', 'teacher', 'others']

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    user = request.user

    return JsonResponse({
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'role': user.role,
        'status': user.status
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_custom_user(request):
    data = request.data
    personal_details = data.get('personal_details')
    qualification_details = data.get('qualification_details')
    address = data.get('address')
    industry_experience = data.get('industry_experience')
    document_upload = data.get('document_upload')
    print(document_upload)
    print(data)

    personal_details = UserPersonalDetails.from_dict(data['personal_details'])
    qualification_details = UserQualification.from_dict(data['qualification_details'])
    address = UserAddress.from_dict(data['address'])
    document_upload = UserDocuments.from_dict(data['document_upload'])
    print(personal_details)
    print(qualification_details)
    print(address)

    print(document_upload)

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
            "id": user.id,
            "email": user.email, 
            "first_name": user.first_name, 
            "last_name": user.last_name, 
            "role": user.role, 
            "status": user.status
        }
        print(json_data)
        user_persons.append(json_data)

    return JsonResponse({"users": user_persons}, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_user_information(request):
    if request.data.get('id') is None:
        return JsonResponse({'msg': 'Please provide id'})
    
    try:
        user = UserAccount.objects.get(id=request.data.get('id'))
        print(roles.index(request.user.role), roles.index(user.role))
        if roles.index(request.user.role) >= roles.index(user.role):
            return JsonResponse({'msg': 'You are not allowed to read that user'})

    except UserAccount.DoesNotExist:
        return JsonResponse({'msg': 'That user does not exist'})

    json_data = user.to_dict()

    return JsonResponse( json_data, status=200 )

@api_view(['POST'])
@permission_classes([])
def signin(request):
    data = request.data
    email = data.get('email', None)
    password = data.get('password', None)

    user = authenticate(email=email, password=password)

    if user is None:
        return JsonResponse( { 'msg': 'A user with this email and password is not found.' }, status=500 )

    try:
        jwt_token = RefreshToken.for_user(user)
        update_last_login(None, user)
    except UserAccount.DoesNotExist:
        return JsonResponse( { 'msg': 'User with given email and password does not exists' } )

    ret = {
        'msg': 'Uesr logged in successfully',
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'role': user.role,
        'status': user.status,
        'access': str(jwt_token.access_token)
    }

    return Response( ret, status=200 )

@api_view(['POST'])
@permission_classes([])
def signup(request):
    data = request.data
    user_account = UserAccount(
        email=data.get('email'),
        first_name=data.get('first_name'),
        last_name=data.get('last_name'))

    user_account.set_password(data.get('password'))
    user_account.save()
    return Response( user_account.to_dict(), status=200 )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_status(request):
    if request.data.get('id') is None:
        return JsonResponse({'msg': 'Please provide id'})
    
    try:
        user = UserAccount.objects.get(id=request.data.get('id'))
        if roles.index(request.user.role) >= roles.index(user.role):
            return JsonResponse({'msg': 'You are not allowed to change user state'})

    except UserAccount.DoesNotExist:
        return JsonResponse({'msg': 'That user does not exist'})

    user.status = request.data.get('status')

    return Response( { 'msg': 'Changing status successfully changed' }, status=200 )
