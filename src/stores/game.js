import { get, derived } from 'svelte/store';
import gameData from '../data/game';

const game = derived(gameData, ($game, set) => {
  if ($game) {
    set({
      id: $game.id,
      ...$game.data()
    });
  } else {
    set(null);
  }
});

export default game;

export function toggleCured(infection) {
  const $game = get(gameData);
  if (!$game) return;
  const cured = $game.data().cured;
  cured[infection] = !cured[infection];
  $game.ref.update({ cured });
}

export function toggleEradicated(infection) {
  const $game = get(gameData);
  if (!$game) return;
  const eradicated = $game.data().eradicated;
  eradicated[infection] = !eradicated[infection];
  $game.ref.update({ eradicated });
}

export function clearInfection(infection) {
  const $game = get(gameData);
  if (!$game) return;
  const { eradicated, cured } = $game.data();
  eradicated[infection] = false;
  cured[infection] = false;
  $game.ref.update({ eradicated, cured });
}

export function updateInfectionRate(val) {
  const $game = get(gameData);
  if (!$game) return;
  $game.ref.update({ infection_rate: val });
}

export function updateOutbreaks(val) {
  const $game = get(gameData);
  if (!$game) return;
  $game.ref.update({ outbreaks: val });
}

export function updateObjectives(objectives) {
  const $game = get(gameData);
  if (!$game) return;
  $game.ref.update({ objectives });
}
