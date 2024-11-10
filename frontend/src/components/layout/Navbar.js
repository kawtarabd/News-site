// src/components/layout/Navbar.js
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
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link to="/news" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
          <Button color="inherit">News</Button>
        </Link>
        {user && (
          <>
            <Link to="/add-friend" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
  <Button color="inherit">Add Friend</Button>
</Link>

            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
              <Button color="inherit">Profile</Button>
            </Link>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Register</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
