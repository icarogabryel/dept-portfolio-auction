from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """Permissão que verifica se o objeto pertence ao usuário autenticado."""
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
