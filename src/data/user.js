import { derived } from 'svelte/store';
import firebase from './fb';
import auth from './auth';

const user = derived(auth, ($auth, set) => {
  let unsubscribe;

  if ($auth && $auth.uid) {
    unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc($auth.uid)
      .onSnapshot(snapshot => {
        set(snapshot);
      });
  } else if ($auth) {
    set({ id: null });
  } else {
    set(null);
  }

  return () => unsubscribe && unsubscribe();
});

export default user;
