import { derived } from 'svelte/store';
import firebase from './fb';
import game from './game';

let unsubscribe = null;
const players = derived(game, ($game, set) => {
  if (unsubscribe) unsubscribe();
  if ($game) {
    unsubscribe = $game.ref.collection('players').onSnapshot(snapshot => {
      set(snapshot);
    });
  } else {
    set(null);
  }
});

export default players;
