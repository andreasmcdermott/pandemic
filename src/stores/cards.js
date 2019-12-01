import { get, derived } from 'svelte/store';
import gameData from '../data/game';
import citiesData from '../data/cities';

const cards = derived(
  [gameData, citiesData],
  ([$game, $cities], set) => {
    let unsubscribe1 = null;
    let unsubscribe2 = null;

    if ($game && $cities) {
      const allCities = $cities.docs.reduce((acc, city) => {
        acc[city.id] = city.data();
        return acc;
      }, {});

      unsubscribe1 = $game.ref.collection('cities').onSnapshot(snapshot => {
        snapshot.docs.forEach(city => {
          allCities[city.id] = { ...(allCities[city.id] || {}), ...city.data() };
        });
      });

      unsubscribe2 = $game.ref.collection('cards').onSnapshot(snapshot => {
        set(
          snapshot.docs.map(card => ({
            id: card.id,
            ...card.data(),
            ...(allCities[card.id] || {})
          }))
        );
      });
    } else {
      set([]);
    }

    return () => {
      if (unsubscribe1) unsubscribe1();
      if (unsubscribe2) unsubscribe2();
    };
  },
  []
);

export default cards;
