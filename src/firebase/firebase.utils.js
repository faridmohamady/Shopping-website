import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBHQ9dpaxfMsMnh6dgRYVIUkUMzslDy_h0",
    authDomain: "shopping-website-db.firebaseapp.com",
    databaseURL: "https://shopping-website-db.firebaseio.com",
    projectId: "shopping-website-db",
    storageBucket: "shopping-website-db.appspot.com",
    messagingSenderId: "150967726232",
    appId: "1:150967726232:web:8ab56faf90f18536a920ed",
    measurementId: "G-H2005LFS0J"
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;