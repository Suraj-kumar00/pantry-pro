'use client';
import React from 'react';
import { Box, Typography, Button, IconButton, useMediaQuery, Container } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/quicksand/700.css'; // Ensure you install this package using `npm install @fontsource/quicksand`

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, Arial',
    fontWeightBold: 700,
  },
});

const Footer = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#1b263b',
          color: 'white',
          borderTop: '1px solid',
          borderColor: 'divider',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: 1000,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{ mb: { xs: 2, md: 0 }, fontWeight: 'bold' }}
            >
              © Pantry App All Rights Reserved
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: { xs: 2, md: 0 } }}>
              <Button
                onClick={() => window.location.href = '/'}
                color="inherit"
                sx={{ color: 'white' }}
              >
                Home
              </Button>
              <Button
                onClick={() => window.location.href = '/contact'}
                color="inherit"
                sx={{ color: 'white' }}
              >
                Contact
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                href="https://github.com/Suraj-kumar00"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                color="inherit"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/surajkumar00/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                color="inherit"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="https://x.com/surajk_umar01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="mailto:suraj.ukumar.p@gmail.com"
                aria-label="Email"
                color="inherit"
              >
                <EmailIcon />
              </IconButton>
              {/* <IconButton
                href="tel:+1234567890"
                aria-label="Phone"
                color="inherit"
              >
                <PhoneIcon /> */}
              {/* </IconButton> */}
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
