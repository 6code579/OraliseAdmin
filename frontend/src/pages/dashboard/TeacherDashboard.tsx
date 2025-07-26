import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const TeacherDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Tableau de bord Enseignant</h1>
      <p>Bienvenue, {user?.firstName} {user?.lastName}</p>
      <button onClick={logout}>Déconnexion</button>
      {/* Contenu spécifique à l'enseignant */}
    </div>
  );
};

export default TeacherDashboard;