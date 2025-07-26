import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Tableau de bord Administrateur</h1>
      <p>Bienvenue, {user?.firstName} {user?.lastName}</p>
      <button onClick={logout}>Déconnexion</button>
      {/* Contenu spécifique à l'admin */}
    </div>
  );
};

export default AdminDashboard;