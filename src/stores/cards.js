import { get, derived } from 'svelte/store';
import gameData from '../data/game';

const cards = derived(
  gameData,
  ($game, set) => {
    let unsubscribe = null;
    if ($game) {
      unsubscribe = $game.ref.collection('cards').onSnapshot(snapshot => {
        set(
          snapshot.docs.map(card => ({
            id: card.id,
            ...card.data()
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

export default cards;
