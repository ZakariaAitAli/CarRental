// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK5-HKbvCXEhNWKSk-_Ecp9hQnhmlqo9Q",
  authDomain: "car-rental-6dd50.firebaseapp.com",
  projectId: "car-rental-6dd50",
  storageBucket: "car-rental-6dd50.appspot.com",
  messagingSenderId: "113254545495",
  appId: "1:113254545495:web:a72618575324b56d130b12",
  measurementId: "G-6SKQ78NDPX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirebase = () =>  {
    return app;
};
