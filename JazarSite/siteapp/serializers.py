from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Job, JobApplication, Blog, ContactUs

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        # Check if user exists
        user = User.objects.filter(email=email).first()
        if user is None:
            raise serializers.ValidationError("Invalid email or password")

        # Authenticate user
        user = authenticate(username=user.username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password")

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        # Determine if user is admin
        is_admin = user.is_superuser

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'is_admin': is_admin,
            'message': "Admin login successful" if is_admin else "Login successful"
        }



class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'  # Includes all fields from Job model



class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'




class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'



class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = ['first_name', 'last_name', 'contact_number', 'email', 'message']

    def create(self, validated_data):
        # Create a new ContactUs instance and save it to the database
        contact = ContactUs.objects.create(**validated_data)
        return contact

