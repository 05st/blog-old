import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA7LvSSHQf9MkGQwHAKNzm_B1EfVZu8hgU",
  authDomain: "blog-database-72722.firebaseapp.com",
  projectId: "blog-database-72722",
  storageBucket: "blog-database-72722.appspot.com",
  messagingSenderId: "938125379165",
  appId: "1:938125379165:web:983b7e6ebb0ba1e9786fb4",
  measurementId: "G-1M4T5GXLF8"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

export default firebase;

