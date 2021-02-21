import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCgTxkExg8ZuIOMDrj1if8q4N9I1MJIAEo",
  authDomain: "tradehu6.firebaseapp.com",
  projectId: "tradehu6",
  storageBucket: "tradehu6.appspot.com",
  messagingSenderId: "541801606980",
  appId: "1:541801606980:web:9fba5bcc5b3eb17c407111"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const firestore = firebase.firestore();

export { auth, provider, db, firestore };
