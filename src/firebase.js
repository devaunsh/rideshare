import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCmtoHnfyQB9ffgfuYCt-ztRJFMWkLErfs",
  authDomain: "rideshare-3c3c1.firebaseapp.com",
  databaseURL: "https://rideshare-3c3c1.firebaseio.com",
  projectId: "rideshare-3c3c1",
  storageBucket: "rideshare-3c3c1.appspot.com",
  messagingSenderId: "591511873815"
}

firebase.initializeApp(config);

//Export GoogleAuth and auth module
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
