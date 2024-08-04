'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { firestore } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  
  const theme = useTheme();
  
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, 'inventory'));
        const items = snapshot.docs.map(doc => ({
          name: doc.id,
          ...doc.data()
        }));
        console.log("Fetched items:", items);
        setInventory(items);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      background: {
        default: '#121212',
        paper: '#1d1d1d',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b0b0b0',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={darkTheme.palette.background.default} color={darkTheme.palette.text.primary} minHeight="100vh">
        <Box p={4} display="flex" justifyContent="center">
          <TextField
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: '300px',
              mb: 4,
              borderRadius: '50px',
              backgroundColor: darkTheme.palette.background.paper,
              '.MuiOutlinedInput-root': {
                borderRadius: '50px',
                '& fieldset': {
                  borderColor: darkTheme.palette.primary.main,
                },
                '&:hover fieldset': {
                  borderColor: darkTheme.palette.primary.light,
                },
                '&.Mui-focused fieldset': {
                  borderColor: darkTheme.palette.primary.dark,
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <Grid container spacing={4} justifyContent="center">
            {filteredInventory.length === 0 ? (
              <Typography variant="h6" color="error">
                No items found
              </Typography>
            ) : (
              filteredInventory.map(({ name, quantity, imageURL }) => (
                <Grid item xs={12} sm={4} md={3} key={name}>
                  <Card sx={{ backgroundColor: darkTheme.palette.background.paper }}>
                    {imageURL && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={imageURL}
                        alt={name}
                      />
                    )}
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" component="div" fontWeight="bold">
                          {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {quantity}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
