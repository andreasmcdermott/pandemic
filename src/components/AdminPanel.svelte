<script>
  import game, {
    updateInfectionRate,
    updateOutbreaks,
    updateSearches,
    clearAllInfections,
    updateObjectives
  } from '../stores/game';
  import cities, { updateCity } from '../stores/cities';

  import Container from './Container.svelte';
  import Button from './Button.svelte';
  import CharacterEditor from './CharacterEditor.svelte';
  import CardEditor from './CardEditor.svelte';
  import ExpandablePanel from './ExpandablePanel.svelte';
  import CityInfo from './CityInfo.svelte';
  import VirusInfo from './VirusInfo.svelte';
  import GameInfo from './GameInfo.svelte';
  import RegionInfo from './RegionInfo.svelte';

  export let selectedCity;
  export let expanded = false;

  let city;
  $: city = $cities.find(c => c.id === selectedCity);

  const resetBoard = () => {
    const isSure = confirm('This will clear the board completely. Are you sure?');
    if (!isSure) return;

    $cities.forEach(c => {
      updateCity(c.id, { infections: { yellow: 0, black: 0, blue: 0, red: 0 }, quarantine: false });
    });

    updateOutbreaks(0);
    updateInfectionRate(0);
    updateSearches([]);
    updateObjectives([]);
    clearAllInfections();
    expanded = false;
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
      <div class="regions">
        <RegionInfo region="north-america" />
        <RegionInfo region="south-america" />
        <RegionInfo region="africa" />
        <RegionInfo region="europe" />
        <RegionInfo region="asia" />
        <RegionInfo region="pacific-rim" />
      </div>
      <div>
        <div class="viruses">
          <VirusInfo />
        </div>
        <div class="game-info">
          <GameInfo />
        </div>
      </div>
      <div class="characters">
        <CharacterEditor />
      </div>
      <div class="cards">
        <CardEditor />
      </div>
      <div class="actions">
        <Container label="Global Actions">
          <Button on:click={resetBoard}>Reset board</Button>
        </Container>
      </div>
    </div>
  </div>
</ExpandablePanel>
