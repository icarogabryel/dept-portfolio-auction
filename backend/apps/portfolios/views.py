from typing import Any

from django.core.files.storage import default_storage
from rest_framework import permissions, status
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Portfolio
from .serializers import PortfolioSerializer
from .tasks import import_csv_task


class PortfolioCollectionView(ListCreateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAdminUser]


class PortfolioResourceView(RetrieveUpdateDestroyAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAdminUser]


class ActivePortfolioListView(ListAPIView):
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> Any:
        return [p for p in Portfolio.objects.all() if p.is_active]


class UploadCsvView(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response(
                {'detail': "Missing 'file' in form-data"},
                status=status.HTTP_400_BAD_REQUEST
            )

        path = default_storage.save(f'uploads/{file.name}', file)
        absolute_path = default_storage.path(path)
        task = import_csv_task.delay(absolute_path)

        return Response({
            'message': 'CSV upload successful. Processing started.',
            'file_path': path,
            'task_id': task.id
        }, status=status.HTTP_202_ACCEPTED)
