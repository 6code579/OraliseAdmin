import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole, RegisterData } from '../../types/auth';
import {
  TextField,
  Button,
  Stack,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setFormData(prev => ({ ...prev, role: e.target.value as UserRole }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          name="username"
          label="Nom d'utilisateur"
          variant="outlined"
          fullWidth
          value={formData.username}
          onChange={handleChange}
          required
        />

        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextField
          name="password"
          label="Mot de passe"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Stack direction="row" spacing={2}>
          <TextField
            name="firstName"
            label="Prénom"
            variant="outlined"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
          />

          <TextField
            name="lastName"
            label="Nom"
            variant="outlined"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
          />
        </Stack>

        <FormControl fullWidth>
          <InputLabel>Rôle</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
            label="Rôle"
            required
          >
            <MenuItem value={UserRole.STUDENT}>Étudiant</MenuItem>
            <MenuItem value={UserRole.TEACHER}>Enseignant</MenuItem>
          </Select>
        </FormControl>

        {formData.role === UserRole.STUDENT && (
          <Stack direction="row" spacing={2}>
            <TextField
              name="matricule"
              label="Matricule"
              variant="outlined"
              fullWidth
              value={formData.matricule || ''}
              onChange={handleChange}
              required
            />

            <TextField
              name="promotion"
              label="Promotion"
              variant="outlined"
              fullWidth
              value={formData.promotion || ''}
              onChange={handleChange}
              required
            />
          </Stack>
        )}

        {formData.role === UserRole.TEACHER && (
          <TextField
            name="specialite"
            label="Spécialité"
            variant="outlined"
            fullWidth
            value={formData.specialite || ''}
            onChange={handleChange}
            required
          />
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 2 }}
        >
          S'inscrire
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;