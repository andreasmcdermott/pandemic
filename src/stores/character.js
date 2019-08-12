import { writable } from 'svelte/store';
import firebase from '../data/fb';

const characterCollection = firebase.firestore().collection('characters');

const characters = writable([]);

characterCollection.orderBy('name').onSnapshot(snap => {
  characters.set(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});

export default characters;
