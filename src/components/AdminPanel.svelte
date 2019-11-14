<script>
  import game, { updateInfectionRate, updateOutbreaks } from '../stores/game';
  import cities, { updateCity } from '../stores/cities';

  import Button from './Button.svelte';
  import Container from './Container.svelte';
  import ExpandablePanel from './ExpandablePanel.svelte';
  import UpdateCityForm from './UpdateCityForm.svelte';
  import UpdateInfectionForm from './UpdateInfectionForm.svelte';
  import CityInfo from './CityInfo.svelte';

  export let selectedCity;
  export let expanded = false;

  let city;
  $: city = $cities.find(c => c.id === selectedCity);

  const resetCities = () => {
    $cities.forEach(c => {
      updateCity(c.id, { infections: { yellow: 0, black: 0, blue: 0, red: 0 } });
    });
  };
</script>

<style>
  .admin {
    background: white;
    font-size: 10px;
    min-width: 200px;
    min-height: 50px;
    padding: 5px;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .admin > *:not(:last-child) {
    margin-right: 5px;
  }

  .selectedCity {
    min-width: 100px;
  }

  .actions {
    min-width: 100px;
  }
</style>

<ExpandablePanel edge="left" bind:expanded>
  <div class="admin-container">
    <div class="admin">
      <div class="selectedCity">
        {#if city}
          <CityInfo bind:city />
        {:else}Select a city{/if}
      </div>
      <div class="actions">
        <Container label="Actions">
          <Button on:click={resetCities}>Reset board</Button>
        </Container>
      </div>
    </div>
  </div>
</ExpandablePanel>
