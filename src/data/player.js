import { derived } from 'svelte/store';
import firebase from './fb';
import game from './game';
import auth from './auth';

const player = derived([game, auth], ([$game, $auth], set) => {
  if ($game && $auth) {
    $game.ref
      .collection('players')
      .doc($auth.uid)
      .onSnapshot(snapshot => {
        set(snapshot);
      });
  } else {
    set(null);
  }
});

export default player;
