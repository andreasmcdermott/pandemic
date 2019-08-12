import { readable } from 'svelte/store';
import firebase from './fb';

let unsubscribe = null;

const game = readable(null, set => {
  firebase
    .firestore()
    .collection('games')
    .where('active', '==', true)
    .limit(1)
    .onSnapshot(snapshot => {
      if (unsubscribe) unsubscribe();

      if (snapshot.docs[0]) {
        unsubscribe = firebase
          .firestore()
          .collection('games')
          .doc(snapshot.docs[0].id)
          .onSnapshot(snapshot => {
            set(snapshot);
          });
      }
    });
});

export default game;
