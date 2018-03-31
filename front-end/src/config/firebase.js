import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyArTsLDvwQM8MEpPOoletLc9a2ovT5H910",
  authDomain: "challenge-matheus-lima.firebaseapp.com",
  databaseURL: "https://challenge-matheus-lima.firebaseio.com",
  storageBucket: "challenge-matheus-lima.appspot.com"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
