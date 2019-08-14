import { readable } from 'svelte/store';
import firebase from './fb';

const characters = readable(null, set => {
  return firebase
    .firestore()
    .collection('characters')
    .orderBy('name')
    .onSnapshot(snapshot => {
      set(snapshot);
    });
});

export default characters;
