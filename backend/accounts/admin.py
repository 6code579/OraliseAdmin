from django.contrib import admin
from accounts.models import StudentProfile, TeacherProfile

@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    # Affiche ces colonnes dans la liste des objets
    list_display = ('user_full_name', 'user_email', 'matricule', 'promotion')

    # Méthode pour afficher le nom complet lié à l'utilisateur
    def user_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username
    user_full_name.short_description = 'Nom complet'

    # Méthode pour afficher l'email lié à l'utilisateur
    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'Email'


@admin.register(TeacherProfile)
class TeacherProfilAdmin(admin.ModelAdmin):
    list_display = ('user_full_name', 'user_email', 'get_speciality')

    def user_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username
    user_full_name.short_description = 'Nom complet'

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'Email'

    def get_speciality(self, obj):
        return obj.speciality  
    get_speciality.short_description = 'Spécialité'