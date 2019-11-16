import { derived, get } from 'svelte/store';
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

export function updateCharacter(id, values) {
  const $data = get(charactersData);
  if (!$data) return;
  const char = $data.docs.find(c => c.id === id);
  if (char) {
    char.ref.update(values);
  }
}
