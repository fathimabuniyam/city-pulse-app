import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDl3-ivO8IZVO5bWVnXS2Vb3xYRp0i7OXg',
  authDomain: 'city-pulse-app-26112025.firebaseapp.com',
  projectId: 'city-pulse-app-26112025',
  storageBucket: 'city-pulse-app-26112025.firebasestorage.app',
  messagingSenderId: '137331293532',
  appId: '1:137331293532:web:29aa8dcc1592b279f7d599',
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
