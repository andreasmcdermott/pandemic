import { derived } from 'svelte/store';
import playersData from '../data/players';

const players = derived(
  playersData,
  ($players, set) => {
    if ($players) {
      set($players.docs.map(player => ({ id: player.id, ...player.data() })));
    } else {
      set([]);
    }
  },
  []
);

export default players;
