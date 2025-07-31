// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBqNN4tPd7_mL1id7aeZAENdVnP6B5v9O8",
  authDomain: "tksas-a23d9.firebaseapp.com",
  projectId: "tksas-a23d9",
  storageBucket: "tksas-a23d9.appspot.com",
  messagingSenderId: "260541042943",
  appId: "1:260541042943:web:1f8bd26cf07e66aaefbcca",
  measurementId: "G-8FT9D6QWMB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
