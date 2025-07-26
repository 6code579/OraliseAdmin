from django.urls import path
from .views import (
    CurrentUserView,
    RegistrationView,
    StudentProfileView,
    TeacherProfileView
)

urlpatterns = [
    path('users/me/', CurrentUserView.as_view(), name='current-user'),
    path('register/', RegistrationView.as_view(), name='register'),
    path('student-profile/', StudentProfileView.as_view(), name='student-profile'),
    path('teacher-profile/', TeacherProfileView.as_view(), name='teacher-profile'),
]