import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const config = {
  apiKey: "AIzaSyBL-l5QBFkDKrb_Fx5e0Cm45kp5JbEiN3s",
  authDomain: "rideshare-5555.firebaseapp.com",
  databaseURL: "https://rideshare-5555.firebaseio.com",
  projectId: "rideshare-5555",
  storageBucket: "rideshare-5555.appspot.com",
  messagingSenderId: "40940726939"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
