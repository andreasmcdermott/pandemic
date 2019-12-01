<script>
  import cards from '../stores/cards';

  export let selected = '';
</script>

<select bind:value={selected}>
  <option value="" />
  {#each $cards.sort((c1, c2) => {
    if (c1.id.startsWith('event')) return -1;
    if (c2.id.startsWith('event')) return 1;
    return c1.name.localeCompare(c2.name);
  }) as c}
    <option value={c.id}>{c.name || c.eventName}</option>
  {/each}
</select>
