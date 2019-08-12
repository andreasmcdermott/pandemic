import { readable } from 'svelte/store';
import firebase from '../data//fb';

const user = readable(undefined, set => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(snap => {
          set({ uid: user.uid, ...snap.data() });
        });
    } else {
      set(null);
    }
  });
});

export default user;

export function signin(email, password, onFail) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(onFail);
}

export function signout() {
  firebase.auth().signOut();
}
