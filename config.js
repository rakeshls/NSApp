import firebase from 'firebase'
require('@firebase/firestore')

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAMj2UdOEG_f8ht7Bf09n-0s88TrXzM5rg",
    authDomain: "nsapp-5b98d.firebaseapp.com",
    projectId: "nsapp-5b98d",
    storageBucket: "nsapp-5b98d.appspot.com",
    messagingSenderId: "962931635618",
    appId: "1:962931635618:web:5c56861ff8d17447b12efb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()