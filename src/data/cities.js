import { readable } from 'svelte/store';
import firebase from './fb';

const cities = readable(null, set => {
  return firebase
    .firestore()
    .collection('cities')
    .orderBy('name')
    .onSnapshot(snapshot => {
      set(snapshot);
    });
});

export default cities;
