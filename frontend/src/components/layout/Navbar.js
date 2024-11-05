import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          News Site
        </Typography>
        {user ? (
          <>
            <Button color="inherit" onClick={logout}>Logout</Button>
            <Link to="/profile">
              <Button color="inherit">Profile</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/register">
              <Button color="inherit">Register</ Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;