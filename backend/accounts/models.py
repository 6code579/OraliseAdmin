from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
#customise of models using users roles
class CustomUser(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', _('Administrateur')
        TEACHER = 'TEACHER', _('Enseignant')
        STUDENT = 'STUDENT', _('Étudiant')
    
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.STUDENT,
        verbose_name=_('Rôle')
    )
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
#student profil
class StudentProfile(models.Model):
    user = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE,
        related_name='student_profile',
        limit_choices_to={'role': CustomUser.Role.STUDENT}
    )
    matricule = models.CharField(max_length=20, unique=True, verbose_name=_('Matricule'))
    promotion = models.CharField(max_length=50, verbose_name=_('Promotion'))
    
    def __str__(self):
        return f"{self.user.username} ({self.user.email})"
    
#teacher profil
class TeacherProfile(models.Model):
    user = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE,
        related_name='teacher_profile',
        limit_choices_to={'role': CustomUser.Role.TEACHER}
    )
    specialite = models.CharField(max_length=100, verbose_name=_('Spécialité'))
    
    def __str__(self):
        return f"{self.user.username}  ({self.user.email})"