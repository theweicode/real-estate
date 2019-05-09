import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCTR19HkSG-8jfVPz_QONEk7HPlLuF7Bd0",
  authDomain: "portfolio-realestate-app.firebaseapp.com",
  databaseURL: "https://portfolio-realestate-app.firebaseio.com",
  projectId: "portfolio-realestate-app",
  storageBucket: "portfolio-realestate-app.appspot.com",
  messagingSenderId: "735297484298"
};

const Firebase = firebase.initializeApp(config);

export default Firebase;
