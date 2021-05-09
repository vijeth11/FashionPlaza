from rest_framework import permissions

class AdminUserCanOnlyUpdate(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):       
        if request.method in ('POST','PUT','PATCH','DELETE'):
            return request.user.is_admin
        elif request.method in permissions.SAFE_METHODS:
            return True