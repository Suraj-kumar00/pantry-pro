'use client';
import { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Button, Divider, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/quicksand/700.css'; // Ensure you install this package using `npm install @fontsource/quicksand`

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, Arial',
    fontWeightBold: 700,
  },
});

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleNavigate = (path) => () => {
    router.push(path);
    setDrawerOpen(false);
  };

  // Handle click on "Pantry Pro" to navigate to the root (home page)
  const handleTitleClick = () => {
    router.push('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" sx={{ bgcolor: '#1b263b', width: '100%', top: 0, left: 0, zIndex: 1201 }}>
        <Toolbar>
          <Typography
            variant="h4"
            color="white"
            fontWeight="bold"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={handleTitleClick}
          >
            Pantry Pro
          </Typography>

          {!isMobile && (
            <>
              <IconButton
                onClick={() => window.open('https://github.com/Suraj-kumar00/pantry-pro', '_blank')}
                color="inherit"
                sx={{ color: 'white' }}
              >
                <GitHubIcon />
              </IconButton>
              <Button
                onClick={() => router.push('/blog')}
                color="inherit"
                sx={{ color: 'white', ml: 2, fontSize: '20px' }}
              >
                Blog
              </Button>
            </>
          )}

          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ color: '#FFF4DD' }}
          >
            <MenuIcon style={{ fontSize: '2rem' }} />
          </IconButton>
        </Toolbar>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            width={250}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{ backgroundColor: 'offwhite', height: '100vh' }}
          >
            <Box
              px={2}
              py={1}
              bgcolor="black"
              color="white"
              display="flex"
              alignItems="center"
              height="75px"
              sx={{ overflow: 'hidden' }}
            >
              <Typography variant="h6" fontWeight="bold">MENU</Typography>
            </Box>
            <Divider />
            <List>
              <Divider />
              <ListItem button onClick={handleNavigate('/')}>
                <ListItemText primary="Home" />
              </ListItem>
              <Divider />
              <ListItem button onClick={handleNavigate('/inventory')}>
                <ListItemText primary="Inventory Items" />
              </ListItem>
              <Divider />
              {/* <ListItem button onClick={handleNavigate('/recipe')}>
                <ListItemText primary="Recipe Suggestion" />
              </ListItem> */}
              <Divider />
            </List>
            {isMobile && (
              <>
                <Divider />
                <List>
                  <ListItem button onClick={() => window.open('https://github.com/your-repo', '_blank')}>
                    <ListItemText primary="GitHub" />
                  </ListItem>
                  <Divider />
                  <ListItem button onClick={handleNavigate('/blog')}>
                    <ListItemText primary="Blog" />
                  </ListItem>
                  <Divider />
                </List>
              </>
            )}
          </Box>
        </Drawer>
      </AppBar>

      {/* Add a spacer to prevent content from hiding behind the fixed AppBar */}
      <Box sx={{ minHeight: '64px' }} />
    </ThemeProvider>
  );
};

export default Header;
