import React, { useEffect } from 'react';
import { Container, Typography, Paper, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1" paragraph>
          First Name: {user.firstName}
        </Typography>
        <Typography variant="body1" paragraph>
          Last Name: {user.lastName}
        </Typography>
        <Typography variant="body1" paragraph>
          Email: {user.email}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Profile;