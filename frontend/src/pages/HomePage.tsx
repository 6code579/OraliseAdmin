import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, Button, Container, Typography, Stack, Paper, Grid } from '@mui/material';
import { School, Assignment, Group, Computer } from '@mui/icons-material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  const features = [
    {
      icon: <School fontSize="large" color="primary" />,
      title: "Gestion des étudiants",
      description: "Suivez les progrès académiques de tous vos étudiants en un seul endroit."
    },
    {
      icon: <Assignment fontSize="large" color="primary" />,
      title: "Suivi des activités",
      description: "Organisez et suivez toutes les activités pédagogiques et extrascolaires."
    },
    {
      icon: <Group fontSize="large" color="primary" />,
      title: "Collaboration",
      description: "Facilitez la communication entre enseignants, étudiants et administration."
    },
    {
      icon: <Computer fontSize="large" color="primary" />,
      title: "Accès multi-plateforme",
      description: "Disponible sur tous vos appareils, où que vous soyez."
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 8,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Plateforme de Suivi des Activités Étudiantes
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Optimisez la gestion académique et le suivi des étudiants
          </Typography>
          
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            {!user ? (
              <>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  onClick={() => navigate('/login')}
                >
                  Connexion
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  size="large"
                  onClick={() => navigate('/register')}
                >
                  Inscription
                </Button>
              </>
            ) : (
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                onClick={() => navigate('/dashboard')}
              >
                Accéder au tableau de bord
              </Button>
            )}
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom textAlign="center">
                  {feature.title}
                </Typography>
                <Typography textAlign="center">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      {!user && (
        <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Prêt à commencer?
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
              Rejoignez notre plateforme et découvrez une nouvelle façon de gérer les activités étudiantes.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => navigate('/register')}
            >
              Créer un compte maintenant
            </Button>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;