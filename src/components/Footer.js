import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import SocialMedia from './SocialMedia';

function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [appBarColor, setAppBarColor] = useState('primary');

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(!!authToken);
    setUserRole(role);
  }, []);

  useEffect(() => { 
    const role = localStorage.getItem('userRole');
    if (role !== userRole) {
      setUserRole(role); 
    }
    if (role === 'Admin') { 
      setAppBarColor('secondary'); 
    } else { 
      setAppBarColor('primary');
    }
  }, [userRole]);

  return (
    <AppBar position="static" color={appBarColor} component="footer" sx={{ top: 'auto', bottom: 0 }}>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="inherit" component={Link} to="/aboutUs">
            About Us
          </Button>
          {!isLoggedIn && (
            <Button color="inherit" component={Link} to="/signin">
              Join Us
            </Button>
          )}
          <Button color="inherit" component={Link} to="/feedback">
            Feedback
          </Button>
          <Button color="inherit" href="/donation">
            Donation
          </Button>
          <SocialMedia/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
