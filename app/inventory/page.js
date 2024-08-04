'use client'
import { useState, useEffect, useRef } from 'react';
import { firestore, storage } from '@/firebase';
import { Box, Button, Modal, Stack, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ThemeProvider, createTheme } from '@mui/material';
import { collection, getDocs, query, setDoc, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import FileUpload from '../images/fileupload'; 

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    primary: {
      main: '#bb86fc',
    },
    error: {
      main: '#cf6679',
    },
  },
  typography: {
    fontFamily: 'Quicksand, Arial, sans-serif',
    h6: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 500,
    },
  },
});

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach(doc => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item, quantity, imageURL) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity: existingQuantity } = docSnap.data();
      await setDoc(docRef, {
        quantity: existingQuantity + quantity,
        imageURL: imageURL || docSnap.data().imageURL,
      });
    } else {
      await setDoc(docRef, {
        quantity: quantity,
        imageURL: imageURL || '',
      });
    }
    await updateInventory();
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    await deleteDoc(doc(collection(firestore, 'inventory'), itemToDelete));
    setConfirmOpen(false);
    await updateInventory();
  };

  const handleOpen = () => {
    setOpen(true);
    setImageFile(null);
    setImageURL('');
  };

  const handleClose = () => {
    setOpen(false);
    setItemName('');
    setQuantity(1);
  };

  const handleImageUpload = (fileURL) => {
    setImageURL(fileURL);
  };

  const increaseQuantity = async (item) => {
    await addItem(item, 1);
  };

  const decreaseQuantity = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().quantity > 1) {
      await updateDoc(docRef, {
        quantity: docSnap.data().quantity - 1
      });
      await updateInventory();
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
        bgcolor="background.default"
        color="text.primary"
      >
        <Modal open={open} onClose={handleClose}>
          <Box 
            position="absolute"
            top="50%"
            left="50%"
            width={400}
            bgcolor="background.paper"
            border="2px solid #000"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}    
            sx={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography variant='h6' color="white">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField
                label="Item Name"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}    
              />
              <TextField
                label="Quantity"
                type="number"
                variant="outlined"
                fullWidth
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}    
              />
            </Stack>
            <FileUpload onImageUpload={handleImageUpload} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addItem(itemName, quantity, imageURL);
                handleClose();
              }}
              sx={{ backgroundColor: '#1E90FF', color: 'white', '&:hover': { backgroundColor: '#1C86EE' } }}
            >
              Add
            </Button>
          </Box>
        </Modal>

        <Button 
          variant="contained" 
          onClick={handleOpen} 
          sx={{ backgroundColor: '#1E90FF', color: 'white', '&:hover': { backgroundColor: '#1C86EE' } }}
        >
          Add New Item
        </Button>

        <Box border="1px solid #333">
          <Box
            width="800px"
            height="100px"
            bgcolor="#1b263b"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h2" color="text.primary">Inventory Items</Typography>
          </Box>

          <Stack
            width="800px"
            height="300px"
            spacing={2}
            overflow="auto"
          >
            {inventory.map(({ name, quantity, imageURL }) => (
              <Box
                key={name}
                width="100%"
                height="150px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                bgcolor="#415a77"
                padding={5}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  {imageURL && (
                    <img
                      src={imageURL}
                      alt={name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  )}
                  <Typography variant='h5' color="text.primary" textAlign="center">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                </Box>
                <Typography variant='h6' color="text.primary" textAlign="center">
                  {quantity}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => increaseQuantity(name)} 
                    sx={{ backgroundColor: '#32CD32', color: 'white', '&:hover': { backgroundColor: '#228B22' } }}
                  >
                    +
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() => decreaseQuantity(name)} 
                    sx={{ backgroundColor: '#FFA07A', color: 'white', '&:hover': { backgroundColor: '#FF7F50' } }}
                  >
                    -
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error"
                    onClick={() => handleDelete(name)} 
                    sx={{ backgroundColor: '#FF4500', color: 'white', '&:hover': { backgroundColor: '#FF6347' } }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>

        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Item"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
