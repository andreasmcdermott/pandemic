import { readable, derived } from 'svelte/store';
import firebase from './fb';
import auth from './auth';

const doc = derived(auth, ($auth, set) => {
  if (!$auth) return;

  return firebase
    .firestore()
    .collection('games')
    .where('active', '==', true)
    .limit(1)
    .onSnapshot(snapshot => {
      set(snapshot.docs[0]);
    });
});

const game = derived(doc, ($doc, set) => {
  let unsubscribe = null;
  if ($doc) {
    unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc($doc.id)
      .onSnapshot(snapshot => {
        set(snapshot);
      });
  } else {
    set(null);
  }

  return () => unsubscribe && unsubscribe();
});

export default game;
