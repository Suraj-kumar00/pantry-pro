// components/FileUpload.js
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';
import { Button, Box, Typography } from '@mui/material';

const FileUpload = ({ onImageUpload }) => {
  const [imageURL, setImageURL] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = await uploadImage(file);
      setImageURL(fileURL);
      onImageUpload(fileURL); // Call the parent component's handler
    }
  };

  const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileURL = await getDownloadURL(storageRef);
      return fileURL;
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="file-upload"
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
      {imageURL && (
        <Box mt={2}>
          <Typography variant="body2">Image Preview:</Typography>
          <img
            src={imageURL}
            alt="Item Preview"
            style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
