import { readable } from 'svelte/store';
import firebase from './fb';

const auth = readable(null, set => {
  firebase.auth().onAuthStateChanged(user => {
    set(user);
  });
});

export default auth;

export function signIn(email, password, onFail) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(onFail);
}

export function signOut() {
  firebase.auth().signOut();
}
