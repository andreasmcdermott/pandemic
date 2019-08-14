import { derived } from 'svelte/store';
import firebase from './fb';
import game from './game';

const players = derived(game, ($game, set) => {
  let unsubscribe = null;
  if ($game) {
    unsubscribe = $game.ref.collection('players').onSnapshot(snapshot => {
      set(snapshot);
    });
  } else {
    set(null);
  }

  return () => unsubscribe && unsubscribe();
});

export default players;
