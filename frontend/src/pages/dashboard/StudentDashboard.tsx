import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Tableau de bord Étudiant</h1>
      <p>Bienvenue, {user?.firstName} {user?.lastName}</p>
      <button onClick={logout}>Déconnexion</button>
      {/* Contenu spécifique à l'étudiant */}
    </div>
  );
};

export default StudentDashboard;