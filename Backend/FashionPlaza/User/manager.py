from django.contrib.auth.models import BaseUserManager

class CustomerUserManager(BaseUserManager):

    def create_user(self, Email, FirstName, PhoneNumber, password=None, **extra_fields):

        if not Email:
            raise ValueError('user must have email address')
        if not FirstName:
            raise ValueError('user must have firstname')
        if not PhoneNumber:
            raise ValueError('user must have phone number')
        user = self.model(Email=self.normalize_email(Email),FirstName=FirstName, PhoneNumber=PhoneNumber, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, Email, FirstName, PhoneNumber, password=None,  **extra_fields):
        
        if not Email:
            raise ValueError('user must have email address')
        if not FirstName:
            raise ValueError('user must have firstname')
        if not PhoneNumber:
            raise ValueError('user must have phone number')
        user = self.create_user(Email, FirstName, PhoneNumber, password, **extra_fields)
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user