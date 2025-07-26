from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import StudentProfile, TeacherProfile

CustomUser = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(read_only=True)
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']
        read_only_fields = ['id']

class StudentProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = StudentProfile
        fields = ['user', 'matricule', 'promotion']
        read_only_fields = ['user']

class TeacherProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = TeacherProfile
        fields = ['user', 'specialite']
        read_only_fields = ['user']

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=CustomUser.Role.choices)
    
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'role']
    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data['role']
        )
        return user