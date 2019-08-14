import { readable } from 'svelte/store';
import firebase from './fb';

const auth = readable(null, set => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      set(user);
    } else {
      set({ uid: null });
    }
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
