import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyD9pr8rIUHRmehHLy6LdFiZdb3sT2Bx0TY',
  authDomain: 'localhost:5000', //'https://pandemic-b27e9.firebaseapp.com',
  projectId: 'pandemic-b27e9'
});

export default firebase;
