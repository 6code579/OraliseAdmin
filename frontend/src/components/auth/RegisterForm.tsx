import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole,type RegisterData } from '../../types/auth';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: UserRole.STUDENT,
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Erreur lors de l\'inscription');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Nom d'utilisateur</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Prénom</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Nom</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Rôle</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value={UserRole.STUDENT}>Étudiant</option>
          <option value={UserRole.TEACHER}>Enseignant</option>
        </select>
      </div>
      
      {formData.role === UserRole.STUDENT && (
        <>
          <div>
            <label>Matricule</label>
            <input
              type="text"
              name="matricule"
              value={formData.matricule || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Promotion</label>
            <input
              type="text"
              name="promotion"
              value={formData.promotion || ''}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}
      
      {formData.role === UserRole.TEACHER && (
        <div>
          <label>Spécialité</label>
          <input
            type="text"
            name="specialite"
            value={formData.specialite || ''}
            onChange={handleChange}
            required
          />
        </div>
      )}
      
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default RegisterForm;