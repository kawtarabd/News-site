import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1">Name: {user.name}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
      </Paper>
    </Container>
  );
};

export default Profile;