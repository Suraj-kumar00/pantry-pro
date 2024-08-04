// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA1ECQ5Il_MGYTlTOyJzuxQcOnTzMsCPX4",
  authDomain: "inventory-management-412f4.firebaseapp.com",
  projectId: "inventory-management-412f4",
  storageBucket: "inventory-management-412f4.appspot.com",
  messagingSenderId: "522407320879",
  appId: "1:522407320879:web:346462fa18b9608d7115da",
  measurementId: "G-RJZGSLC21G"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {firestore, storage};