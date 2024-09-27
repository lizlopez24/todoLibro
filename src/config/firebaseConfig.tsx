import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBFXtJUlA2zj4ZUuIJJ1N0siJhPsHcRtWo",
  authDomain: "todolibro-98de6.firebaseapp.com",
  projectId: "todolibro-98de6",
  storageBucket: "todolibro-98de6.appspot.com",
  messagingSenderId: "508879929830",
  appId: "1:508879929830:web:4d3e18d31d13d41eef1627",
  databaseURL:"https://todolibro-98de6-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

export const database = getDatabase(firebase);

