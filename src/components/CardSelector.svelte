<script>
  import { createEventDispatcher } from 'svelte';
  import cards from '../stores/cards';
  const dispatch = createEventDispatcher();
  export let selected = '';
</script>

<select
  on:change={e => {
    dispatch('change', e.target.value);
  }}>
  <option value="" />
  {#each $cards.sort((c1, c2) => {
    if (c1.id.startsWith('event')) return -1;
    if (c2.id.startsWith('event')) return 1;
    return c1.name.localeCompare(c2.name);
  }) as c}
    <option value={c.id} selected={selected === c.id}>{c.name || c.eventName}</option>
  {/each}
</select>
