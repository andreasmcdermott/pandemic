<script>
  import { createEventDispatcher } from "svelte";
  import game, { createCity, updateCity } from "./game-store";
  import cities from "./city-store";

  const dispatch = createEventDispatcher();

  let selectedCity = null;

  let city;
  let panic;
  let militaryBase;
  let researchStation;
  let infections = {};
  let quarantine;
  let faded;

  function selectCity(id) {
    selectedCity = id;
    dispatch("selectCity", selectedCity);
    if (!selectedCity) return;

    city = $game.cities.find(city => city.id === selectedCity) || {};
    panic = city.panic || "0";
    militaryBase = city.militaryBase || false;
    researchStation = city.researchStation || false;
    infections = city.infections || { red: 0, blue: 0, black: 0, yellow: 0 };
    quarantine = city.quarantine || false;
    faded = city.faded || false;
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

    if (city.id) {
      updateCity(city.id, values);
    } else {
      createCity(selectedCity, values);
    }

    selectCity("");
  }
</script>

<select bind:value={selectedCity} on:change={e => selectCity(e.target.value)}>
  <option value="">Select city</option>
  {#each $cities as city}
    <option value={city.id}>{city.name}</option>
  {/each}
</select>

{#if selectedCity && city}
  <fieldset>
    <legend>Panic Level</legend>
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
  </fieldset>

  <fieldset>
    <legend>Infections</legend>
    <label>Black</label>
    <input type="number" bind:value={infections.black} />
    <label>Red</label>
    <input type="number" bind:value={infections.red} />
    <label>Blue</label>
    <input type="number" bind:value={infections.blue} />
    <label>Yellow</label>
    <input type="number" bind:value={infections.yellow} />
  </fieldset>

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
{/if}
