// import React, { useEffect, useState } from 'react';
// import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
// import { Link } from 'react-router-dom';
// import SocialMedia from './SocialMedia';

// function Footer() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState("");
//   const [appBarColor, setAppBarColor] = useState('primary');

//   useEffect(() => {
//     const authToken = localStorage.getItem("authToken");
//     const role = localStorage.getItem("userRole");
//     setIsLoggedIn(!!authToken);
//     setUserRole(role);
//   }, []);

//   useEffect(() => { 
//     const role = localStorage.getItem('userRole');
//     if (role !== userRole) {
//       setUserRole(role); 
//     }
//     if (role === 'Admin') { 
//       setAppBarColor('secondary'); 
//     } else { 
//       setAppBarColor('primary');
//     }
//   }, [userRole]);

//   return (
//     <AppBar position="static" color={appBarColor} component="footer" sx={{ top: 'auto', bottom: 0 }}>
//       <Container>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
//           <Button color="inherit" component={Link} to="/aboutUs">
//             About Us
//           </Button>
//           {!isLoggedIn && (
//             <Button color="inherit" component={Link} to="/signin">
//               Join Us
//             </Button>
//           )}
//           <Button color="inherit" component={Link} to="/feedback">
//             Feedback
//           </Button>
//           <Button color="inherit" href="/donation">
//             Donation
//           </Button>
//           <SocialMedia/>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default Footer;

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";

function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [footerBg, setFooterBg] = useState("#000"); // Default thick black

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(!!authToken);
    setUserRole(role);

    // Set dynamic background color
    setFooterBg(role === "Admin" ? "#333" : "#000"); // Light black for Admin, Thick black for User
  }, []);

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: footerBg,
        color: "white",
        top: "auto",
        bottom: 0,
      }}
      component="footer"
    >
      <Container>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Left Section: Address */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: "white" }}>
              <strong>Our Office</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              123, Example Street, <br />
              Example City, EX 12345
            </Typography>
          </Box>

          {/* Middle Section: Navigation */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/aboutUs"
              sx={{ textTransform: "none" }}
            >
              About Us
            </Button>
            {!isLoggedIn && (
              <Button
                color="inherit"
                component={Link}
                to="/signin"
                sx={{ textTransform: "none" }}
              >
                Join Us
              </Button>
            )}
            <Button
              color="inherit"
              component={Link}
              to="/feedback"
              sx={{ textTransform: "none" }}
            >
              Feedback
            </Button>
            <Button
              color="inherit"
              href="/donation"
              sx={{ textTransform: "none" }}
            >
              Donation
            </Button>
          </Box>

          {/* Right Section: Social Media */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Facebook
              sx={{
                cursor: "pointer",
                "&:hover": { color: "#1877F2", transform: "scale(1.2)" },
              }}
            />
            <Twitter
              sx={{
                cursor: "pointer",
                "&:hover": { color: "#1DA1F2", transform: "scale(1.2)" },
              }}
            />
            <Instagram
              sx={{
                cursor: "pointer",
                "&:hover": { color: "#E1306C", transform: "scale(1.2)" },
              }}
            />
            <LinkedIn
              sx={{
                cursor: "pointer",
                "&:hover": { color: "#0077B5", transform: "scale(1.2)" },
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;

