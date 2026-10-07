import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAtEux_Di_n1TjSuAw5R8vFdFWbpLsXRbs',
  authDomain: 'portfolio-4f00d.firebaseapp.com',
  projectId: 'portfolio-4f00d',
  storageBucket: 'portfolio-4f00d.firebasestorage.app',
  messagingSenderId: '950810787909',
  appId: '1:950810787909:web:b89974adfe1d6b2bd2232c',
  measurementId: 'G-WYH18ML73Z',
};

export const app = initializeApp(firebaseConfig);

// Firestore = where contact-form messages are stored.
export const db = getFirestore(app);

// Auth = the admin sign-in used to read those messages.
export const auth = getAuth(app);

// Analytics is optional: it is blocked in some privacy modes, so resolve
// support at runtime instead of crashing the app when it is unavailable.
export const analytics = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null,
);

export default app;
