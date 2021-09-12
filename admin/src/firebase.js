import  firebase  from 'firebase';
require('dotenv').config();

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_KEY}`,
    authDomain: "socialnetwork-4c57b.firebaseapp.com",
    projectId: "socialnetwork-4c57b",
    storageBucket: "socialnetwork-4c57b.appspot.com",
    messagingSenderId: "79013184837",
    appId: "1:79013184837:web:c80c04fdec76f5cecc6a2c",
    measurementId: "G-865FLWFL5K"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // TODO decidir si dejo las analytics
  firebase.analytics();
  // dado que voy a usar su Storage lo inicio y exporto
  const storage = firebase.storage();
  export default storage;