<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let items;
  export let type;

  const onChangeExisting = (item, i) => e => {
    if (e.key === 'Escape') {
      e.target.value = item;
    } else if (e.key === 'Enter') {
      if (e.target.value === '') {
        items.splice(i, 1);
      } else {
        items[i] = e.target.value;
      }
      dispatch('change', items);
    }
  };

  const onChangeNew = e => {
    if (e.key === 'Escape') {
      e.target.value = '';
    } else if (e.key === 'Enter') {
      dispatch('change', items.concat([e.target.value]));
      e.target.value = '';
    }
  };
</script>

<style>
  .section {
    padding-top: 10px;
  }
</style>

<div class="section">
  {#each items as item, i}
    <div class="item">
      <input type="text" value={item} on:keyup={onChangeExisting(item, i)} />
    </div>
  {/each}
  <div class="new-item">
    <input type="text" value="" placeholder="New {type}" on:keyup={onChangeNew} />
  </div>
</div>
