<script>
  import { createEventDispatcher } from "svelte";
  import cities, { updateCity } from "../stores/cities";
  import { updatePlayerCity } from "../stores/player";

  import Container from "./Container.svelte";
  import CitySelector from "./CitySelector.svelte";

  const dispatch = createEventDispatcher();

  export let selectedCity = null;

  let city;
  let panic;
  let militaryBase;
  let researchStation;
  let infections = {};
  let quarantine;
  let faded;

  $: {
    if (selectedCity && (!city || city.id !== selectedCity)) {
      city = $cities.find(city => city.id === selectedCity) || {};
      panic = city.panic || "0";
      militaryBase = city.militaryBase || false;
      researchStation = city.researchStation || false;
      infections = city.infections || { red: 0, blue: 0, black: 0, yellow: 0 };
      quarantine = city.quarantine || false;
      faded = city.faded || false;
    }
  }

  function selectCity(cityId) {
    selectedCity = cityId;
    dispatch("selectCity", selectedCity);
    if (!selectedCity) {
      city = null;
    }
  }

  function updateSelectedCity() {
    if (!city) return;
    const values = {
      panic,
      militaryBase,
      researchStation,
      infections,
      quarantine,
      faded
    };

    updateCity(city.id, values);

    selectCity(null);
  }
</script>

<style>
  [type="number"] {
    width: 100%;
  }
</style>

<Container label="City">
  <CitySelector selected={selectedCity} on:change={e => selectCity(e.detail)} />
  {#if selectedCity && city}
    <button
      on:click={() => {
        updatePlayerCity(selectedCity);
        selectCity(null);
      }}>
      Go to
    </button>
    <Container label="Panic Level">
      <label>
        <input type="radio" value="0" bind:group={panic} />
        None
      </label>
      <label>
        <input type="radio" value="1" bind:group={panic} />
        Unstable (1)
      </label>
      <label>
        <input type="radio" value="2" bind:group={panic} />
        Rioting (2)
      </label>
      <label>
        <input type="radio" value="3" bind:group={panic} />
        Rioting (3)
      </label>
      <label>
        <input type="radio" value="4" bind:group={panic} />
        Collapsing (4)
      </label>
      <label>
        <input type="radio" value="5" bind:group={panic} />
        Fallen (5)
      </label>
    </Container>

    <Container label="Infections">
      <label>Black</label>
      <input type="number" bind:value={infections.black} min="0" max="3" />
      <label>Red</label>
      <input type="number" bind:value={infections.red} min="0" max="3" />
      <label>Blue</label>
      <input type="number" bind:value={infections.blue} min="0" max="3" />
      <label>Yellow</label>
      <input type="number" bind:value={infections.yellow} min="0" max="3" />
    </Container>

    <label>
      <input type="checkbox" bind:checked={militaryBase} />
      Military Base
    </label>

    <label>
      <input type="checkbox" bind:checked={researchStation} />
      Research Station Base
    </label>

    <label>
      <input type="checkbox" bind:checked={quarantine} />
      Quarantine
    </label>

    <label>
      <input type="checkbox" bind:checked={faded} />
      Faded
    </label>

    <button on:click={updateSelectedCity}>Save</button>
    <button on:click={() => selectCity(null)}>Done</button>
  {/if}
</Container>
