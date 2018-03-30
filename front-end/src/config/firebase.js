import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.API_KEY || "AIzaSyDl79tH6D__av98YNdlt-0mpghb6wFzMwY",
  authDomain: "https://ethereum-chatbot.firebaseapp.com/",
  databaseURL: "https://ethereum-chatbot.firebaseio.com/",
  storageBucket: "ethereum-chatbot.appspot.com"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
