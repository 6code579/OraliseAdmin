import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Link, Paper } from '@mui/material';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        
        <Box sx={{ mt: 3, width: '100%' }}>
          <LoginForm />
        </Box>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Pas encore de compte?{' '}
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                navigate('/register');
              }}
              sx={{ cursor: 'pointer' }}
            >
              S'inscrire
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;