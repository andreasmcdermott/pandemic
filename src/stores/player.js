import { get, derived } from 'svelte/store';
import game from './game';
import playerData from '../data/player';

const player = derived(
  playerData,
  ($player, set) => {
    if ($player) {
      set({ id: $player.id, ...$player.data() });
    } else {
      set(null);
    }
  },
  null
);

export default player;

export async function updatePlayerCharacter(character) {
  const $player = get(playerData);
  if (!$player) return;
  $player.ref.update({ character });
}

export async function updatePlayerCity(city) {
  const $player = get(playerData);
  if (!$player) return;
  $player.ref.update({ city });
}

export async function updateCards(cards) {
  const $player = get(playerData);
  if (!$player) return;
  $player.ref.update({ cards });
}
