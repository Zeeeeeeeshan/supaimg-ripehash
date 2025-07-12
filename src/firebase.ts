import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AlzaSyAzZcNHNaI-1ZFpAAwXfTUxzUIbSCNwirU",
  authDomain: "supeimg-login.firebaseapp.com",
  projectId: "supeimg-login",
  storageBucket: "supeimg-login.appspot.com",
  messagingSenderId: "893986067448",
  appId: "1:893986067448:web:2f2222bddba36f2087c0d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider }; 