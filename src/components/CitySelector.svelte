<script>
  import { createEventDispatcher } from 'svelte';
  import cities from '../stores/cities';

  const dispatch = createEventDispatcher();

  export let selected = '';
</script>

<select
  on:change={e => {
    dispatch('change', e.target.value);
  }}>
  <option value="" />
  {#each $cities as city}
    <option value={city.id} selected={selected === city.id}>{city.name}</option>
  {/each}
</select>
