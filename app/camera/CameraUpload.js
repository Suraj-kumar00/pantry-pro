// // app/components/CameraUpload.js

// import React, { useState } from 'react';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '@/firebase'; // Adjust the path if necessary
// import Camera from 'react-camera-pro';

// const CameraUpload = ({ onUpload }) => {
//   const [camera, setCamera] = useState(null);
//   const [imageURL, setImageURL] = useState('');

//   const captureImage = async () => {
//     if (camera) {
//       const imageSrc = camera.takePhoto();
//       if (imageSrc) {
//         const imageBlob = await fetch(imageSrc).then(res => res.blob());
//         const file = new File([imageBlob], 'photo.jpg', { type: 'image/jpeg' });
//         const fileURL = await uploadImage(file);
//         setImageURL(fileURL);
//         if (onUpload) onUpload(fileURL); // Pass the URL to parent if needed
//       }
//     }
//   };

//   const uploadImage = async (file) => {
//     try {
//       const storageRef = ref(storage, `images/${file.name}`);
//       await uploadBytes(storageRef, file);
//       const fileURL = await getDownloadURL(storageRef);
//       return fileURL;
//     } catch (error) {
//       console.error('Error uploading image: ', error);
//     }
//   };

//   return (
//     <div>
//       <Camera
//         ref={(cam) => setCamera(cam)}
//         idealFacingMode="environment"
//         imageType="jpeg"
//         imageCompression={0.8}
//       />
//       <button onClick={captureImage}>Capture and Upload</button>
//       {imageURL && <img src={imageURL} alt="Captured" style={{ width: '100px', height: '100px' }} />}
//     </div>
//   );
// };

// export default CameraUpload;
