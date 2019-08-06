import { writable } from 'svelte/store';
import firebase from './fb';

const game = writable({ cities: [], cured: {} });

const gameCollection = firebase
  .firestore()
  .collection('games')
  .where('active', '==', true)
  .limit(1);

let gameId;
let cityCollection;

gameCollection.onSnapshot(snap => {
  const gameDoc = snap.docs[0];
  gameId = gameDoc.id;
  cityCollection = gameDoc.ref.collection('/cities');
  cityCollection.onSnapshot(citiesSnap => {
    game.set({
      ...gameDoc.data(),
      cities: citiesSnap.docs.map(cityDoc => ({ id: cityDoc.id, ...cityDoc.data() }))
    });
  });
});

export default game;

export function updateCity(id, values) {
  cityCollection.doc(id).update(values);
}

export function createCity(id, values) {
  cityCollection.doc(id).set(values);
}
