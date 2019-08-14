import { derived } from 'svelte/store';
import firebase from './fb';
import game from './game';
import auth from './auth';

const player = derived([game, auth], ([$game, $auth], set) => {
  let unsubscribe = null;
  if ($game && $auth) {
    unsubscribe = $game.ref
      .collection('players')
      .doc($auth.uid)
      .onSnapshot(snapshot => {
        set(snapshot);
      });
  } else {
    set(null);
  }

  return () => unsubscribe && unsubscribe();
});

export default player;
