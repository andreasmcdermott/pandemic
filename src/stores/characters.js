import { derived } from 'svelte/store';
import charactersData from '../data/characters';

const characters = derived(
  charactersData,
  ($characters, set) => {
    if ($characters) {
      set($characters.docs.map(char => ({ id: char.id, ...char.data() })));
    } else {
      set([]);
    }
  },
  []
);

export default characters;
