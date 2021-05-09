from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

class AdminUserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style = {'input_type':'password'}, write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['UserId','Email', 'FirstName','LastName','PhoneNumber','password','password2']
        extra_kwargs = {
            'password': {
                'write_only':True,
                'style':{'input_type':'password'}
            }
        }

    def create(self, validated_data):
            password1 = self.validated_data['password']
            password2 = self.validated_data['password2']
            if password1 != password2:
                raise serializers.ValidationError({'password':'Password must match'})
            user = get_user_model().objects.create(Email = validated_data['Email'],FirstName = validated_data['FirstName'],LastName = validated_data['LastName'], PhoneNumber = validated_data['PhoneNumber'])
            user.is_admin = True
            user.set_password(validated_data['password'])
            user.save()
            return user

class CustomerUserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style = {'input_type':'password'}, write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['UserId','Email', 'FirstName','LastName','PhoneNumber','password','password2']
        extra_kwargs = {
            'password': {
                'write_only':True,
                'style':{'input_type':'password'}
            }
        }

    def create(self, validated_data):
            password1 = self.validated_data['password']
            password2 = self.validated_data['password2']
            if password1 != password2:
                raise serializers.ValidationError({'password':'Password must match'})
            user = get_user_model().objects.create(Email = validated_data['Email'],FirstName = validated_data['FirstName'],LastName = validated_data['LastName'], PhoneNumber = validated_data['PhoneNumber'])
            user.set_password(validated_data['password'])
            user.save()
            return user

class UserAuthTokenSerializer(serializers.Serializer):

    Email = serializers.EmailField(max_length =30)
    Password = serializers.CharField(max_length=100, style={'input_type':'password'})
    
    def validate(self, validated_data):
        email = validated_data['Email']
        password = validated_data['Password']
        user = authenticate(request = self.context['request'],Email = email, password = password)
        if not user:
            raise serializers.ValidationError('Email or Password not correct')
        validated_data['user']= user
        return validated_data
    
    def to_representation(self,value):
        print(value['user'])
        return {"id":value['user'].UserId,"username":value['user'].FirstName+" "+value['user'].LastName, "email":value['user'].Email}
