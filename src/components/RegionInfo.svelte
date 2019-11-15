<script>
  import cities from '../stores/cities';
  import Container from './Container.svelte';

  export let region;

  const name = region
    .split('-')
    .map(str => str[0].toUpperCase() + str.substr(1))
    .join(' ');

  $: theCities = ($cities || []).filter(c => c.region === region);

  const hasThreeInfections = ({ yellow, blue, red, black }) =>
    yellow === 3 || blue === 3 || red === 3 || black === 3;
</script>

<style>
  .row {
    display: flex;
    justify-content: space-between;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .row strong {
    margin-right: 5px;
  }
</style>

<Container label={name}>
  <div class="row">
    <strong>Military bases:</strong>
    <span>{theCities.filter(c => c.militaryBase).length}</span>
  </div>
  <div class="row">
    <strong>Research stations:</strong>
    <span>{theCities.filter(c => c.researchStation).length}</span>
  </div>
  <div class="row">
    <strong>High risk:</strong>
    <div class="column">
      {#each theCities.filter(c => hasThreeInfections(c.infections) && !c.quarantine) as c}
        <span>{c.name}</span>
      {:else}
        <span>N/A</span>
      {/each}
    </div>
  </div>
</Container>
