import { derived } from 'svelte/store';
import firebase from './fb';
import auth from './auth';

let unsubscribe = null;

const user = derived(auth, ($auth, set) => {
  if (unsubscribe) unsubscribe();
  if (!$auth) {
    set(null);
  } else {
    unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc($auth.uid)
      .onSnapshot(snapshot => {
        set(snapshot);
      });
  }
});

export default user;
