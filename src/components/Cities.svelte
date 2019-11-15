<script>
  import cities from '../stores/cities';
  import City from './City.svelte';

  export let selectedCity;
</script>

<div class="cities">
  {#each $cities as city}
    <City {city} selected={selectedCity === city.id} on:selectCity on:unselectCity />
  {/each}
</div>
