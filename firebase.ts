import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyAUxXByak8xOoQgKAsv637M66p8txLk1vA",
    authDomain: "beta-health-f1173.firebaseapp.com",
    projectId: "beta-health-f1173",
    storageBucket: "beta-health-f1173.firebasestorage.app",
    messagingSenderId: "73304572408",
    appId: "1:73304572408:web:0abd99d409f709fef5560d",
    measurementId: "G-ZGD24E0DDY"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { auth, firestore, storage, database };