import { writable } from 'svelte/store';
import firebase from './fb';

const cityCollection = firebase.firestore().collection('cities');

const cities = writable([]);

cityCollection.orderBy('name').onSnapshot(snap => {
  cities.set(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});

export default cities;

export function updateCity(id, values) {
  cityCollection.doc(id).update(values);
}

export function createCity({ name, region, color, x, y }) {
  const id = name
    .toLowerCase()
    .replace(/\s+|-+/g, '-')
    .replace(/[^a-z-]+/g, '');
  cityCollection.doc(id).set({ name, region, color, x, y });
  return id;
}
