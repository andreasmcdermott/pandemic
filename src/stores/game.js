import { writable } from 'svelte/store';
import firebase from '../data//fb';

const game = writable({ cities: [], cured: {}, eradicated: {}, players: {} });

const gameCollection = firebase
  .firestore()
  .collection('games')
  .where('active', '==', true)
  .limit(1);

let gameId;
let gameDoc;
let cityCollection;
let playerCollection;

gameCollection.onSnapshot(snap => {
  gameDoc = snap.docs[0];
  gameId = gameDoc.id;
  playerCollection = gameDoc.ref.collection('/players');
  playerCollection.onSnapshot(playersSnap => {
    game.update(g => ({
      ...g,
      ...gameDoc.data(),
      players: playersSnap.docs.reduce((acc, playerDoc) => {
        acc[playerDoc.id] = { id: playerDoc.id, ...playerDoc.data() };
        return acc;
      }, {})
    }));
  });
  cityCollection = gameDoc.ref.collection('/cities');
  cityCollection.onSnapshot(citiesSnap => {
    game.update(g => ({
      ...g,
      ...gameDoc.data(),
      cities: citiesSnap.docs.map(cityDoc => ({ id: cityDoc.id, ...cityDoc.data() }))
    }));
  });
});

export default game;

export function updateCity(id, values) {
  cityCollection.doc(id).update(values);
}

export function createCity(id, values) {
  cityCollection.doc(id).set(values);
}

export function toggleCured(infection) {
  const cured = gameDoc.data().cured;
  cured[infection] = !cured[infection];
  gameDoc.ref.update({ cured });
}

export function toggleEradicated(infection) {
  const eradicated = gameDoc.data().eradicated;
  eradicated[infection] = !eradicated[infection];
  gameDoc.ref.update({ eradicated });
}

export function updateInfectionRate(val) {
  gameDoc.ref.update({ infection_rate: val });
}

export function updateOutbreaks(val) {
  gameDoc.ref.update({ outbreaks: val });
}

export function updatePlayerCharacter(playerId, characterId) {
  playerCollection.doc(playerId).update({ character: characterId });
}

export function updatePlayerCity(playerId, cityId) {
  playerCollection.doc(playerId).update({ city: cityId });
}
