import { get, derived } from 'svelte/store';
import gameData from '../data/game';
import citiesData from '../data/cities';

const cities = derived(
  [gameData, citiesData],
  ([$game, $cities], set) => {
    let unsubscribe = null;
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

    return () => unsubscribe && unsubscribe();
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
