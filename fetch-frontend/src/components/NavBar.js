import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import logo from "../assests/footer-logo.svg";

const NavBar = ({ handleLogout }) => {
  const location = useLocation();
  const showLogoutButton = location.pathname === '/homepage';

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
            <img src={logo} alt="Logo" style={{ height: '50px' }}/>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dog Adoption Center
        </Typography>
        {showLogoutButton && (
          <>
            <Button color="inherit" component={Link} to="/about">
              About Us
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
