<script>
  import { createEventDispatcher } from 'svelte';
  import characters from '../stores/characters';

  const dispatch = createEventDispatcher();

  export let selected = '';
</script>

<select
  on:change={e => {
    dispatch('change', e.target.value);
  }}>
  <option value="" />
  {#each $characters as character}
    <option value={character.id} selected={selected === character.id}>
      {`${character.name} (${character.type})${character.dead ? ' ☠︎' : ''}`}
    </option>
  {/each}
</select>
