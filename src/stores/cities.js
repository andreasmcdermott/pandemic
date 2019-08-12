import { get, derived } from 'svelte/store';
import gameData from '../data/game';
import citiesData from '../data/cities';

let unsubscribe = null;
const cities = derived(
  [gameData, citiesData],
  ([$game, $cities], set) => {
    if (unsubscribe) unsubscribe();
    if ($game && $cities) {
      const allCities = $cities.docs.reduce((acc, city) => {
        acc[city.id] = city.data();
        return acc;
      }, {});

      unsubscribe = $game.ref.collection('cities').onSnapshot(snapshot => {
        set(
          snapshot.docs.map(city => ({
            id: city.id,
            ...allCities[city.id],
            ...city.data()
          }))
        );
      });
    } else {
      set([]);
    }
  },
  []
);

export default cities;

export function updateCity(id, values) {
  const $game = get(gameData);
  if (!$game) return;
  $game.ref
    .collection('cities')
    .doc(id)
    .update(values);
}
