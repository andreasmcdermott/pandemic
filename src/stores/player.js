import { derived } from 'svelte/store';
import game from './game';
import user from './user';

const player = derived(
  [user, game],
  ([$user, $game], set) => {
    if (!$user || !$game) return;
    const userId = $user.uid;
    const players = $game.players;
    set(players[userId]);
  },
  null
);

export default player;
