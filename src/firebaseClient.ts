import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyACN4TtvmruQWast_UAd3jXuyaqVIFCJ6Y",
    authDomain: "nutrichef-74c4e.firebaseapp.com",
    databaseURL: "https://nutrichef-74c4e-default-rtdb.firebaseio.com",
    projectId: "nutrichef-74c4e",
    storageBucket: "nutrichef-74c4e.firebasestorage.app",
    messagingSenderId: "764809766675",
    appId: "1:764809766675:web:00d02df784baae11ff1ce6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);