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
  const { cured } = $game.data();
  cured[infection] = !cured[infection];
  $game.ref.update({ cured });
}

export function toggleEradicated(infection) {
  const $game = get(gameData);
  if (!$game) return;
  const { eradicated } = $game.data();
  eradicated[infection] = !eradicated[infection];
  $game.ref.update({ eradicated });
}

export function clearInfection(infection) {
  const $game = get(gameData);
  if (!$game) return;
  const { eradicated, cured } = $game.data();
  console.log(infection, eradicated, cured);
  $game.ref.update({
    eradicated: { ...eradicated, [infection]: false },
    cured: { ...cured, [infection]: false }
  });
}

export function clearAllInfections() {
  const $game = get(gameData);
  if (!$game) return;
  const { eradicated, cured } = $game.data();
  Object.keys(eradicated).forEach(k => (eradicated[k] = false));
  Object.keys(cured).forEach(k => (cured[k] = false));

  $game.ref.update({
    eradicated: { ...eradicated },
    cured: { ...cured }
  });
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

export function updateSearches(searches) {
  const $game = get(gameData);
  if (!$game) return;
  $game.ref.update({ searches });
}
