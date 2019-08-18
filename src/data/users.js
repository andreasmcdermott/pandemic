import { readable } from 'svelte/store';
import firebase from './fb';

const users = readable(null, set => {
  let unsubscribe = firebase
    .firestore()
    .collection('users')
    .orderBy('name')
    .onSnapshot(snapshot => {
      set(snapshot);
    });

  return () => unsubscribe && unsubscribe();
});

export default users;
