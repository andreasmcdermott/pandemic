import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: '',
  authDomain: 'localhost:5000', //'https://pandemic-b27e9.firebaseapp.com',
  projectId: 'pandemic-b27e9'
});

export default firebase;
