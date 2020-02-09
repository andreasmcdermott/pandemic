<script>
  import { createEventDispatcher } from 'svelte';
  import { updateCity } from '../stores/cities';

  import game from '../stores/game';
  import players from '../stores/players';

  export let selected = false;
  export let city = null;

  const dispatch = createEventDispatcher();

  const increaseInfection = infection => {
    if (!city) return;
    city.infections[infection] = (city.infections[infection] + 1) % 4;
    updateCity(city.id, city);
  };
</script>

<style>
  .city {
    position: absolute;
    border: 2px solid white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    color: white;
    cursor: pointer;
  }
  .city.selected {
    border-color: skyblue;
    z-index: 10;
  }
  .city:hover {
    z-index: 10;
  }
  .panic,
  .name {
    display: block;
    position: absolute;
    text-align: center;
    background: black;
    border: 2px solid white;
  }
  .panic {
    left: calc(100% + 4px);
    top: 0;
    width: 12px;
    height: 12px;
  }
  .name {
    left: 0;
    top: -20px;
    width: auto;
    height: 12px;
    white-space: nowrap;
    padding: 0 2px;
  }
  .militaryBase {
    background: gold;
    width: 12px;
    height: 12px;
    position: absolute;
    top: calc(100% + 2px);
    left: -6px;
    border: 2px solid black;
  }
  .researchStation {
    width: 12px;
    height: 12px;
    position: absolute;
    top: calc(100% + 2px);
    left: 8px;
    border: 2px solid black;
    background: white;
  }
  .vaccineFactory {
    width: 12px;
    height: 12px;
    position: absolute;
    top: calc(100% + 2px);
    left: 22px;
    border: 2px solid black;
    background: orangered;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .city-infections {
    position: absolute;
    left: -18px;
    top: -20px;
    height: 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .city-infections > * {
    border: 1px solid white;
    color: white;
    display: block;
    padding: 0 2px;
  }
  .city-infections > .red {
    background-color: red;
  }
  .city-infections > .yellow {
    background-color: yellow;
    color: black;
  }
  .city-infections > .black {
    background-color: black;
  }
  .city-infections > .blue {
    background-color: blue;
  }
  .city-infections > .faded {
    background-color: lime !important;
  }
  .player {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid white;
    position: absolute;
    top: 5px;
  }
  .city.yellow .player,
  .city.faded .player {
    border-color: black !important;
  }
  .city-quarantine,
  .city-vaccinated {
    display: none;
    background-color: white;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 4px;
    left: 4px;
  }
  .city-quarantine {
    background-image: url('/biohazard.png');
  }
  .city-vaccinated {
    background-image: url('/syringe.png');
  }
  .city.vaccinated > .city-vaccinated,
  .city.quarantine > .city-quarantine {
    display: block;
  }
  .city.vaccinated.quarantine > .city-quarantine,
  .city.vaccinated.quarantine > .city-vaccinated {
    width: 8px;
    height: 8px;
  }
  .city.vaccinated.quarantine > .city-vaccinated {
    top: 12px;
    left: 12px;
  }
</style>

{#if city}
  <div
    title={city.name}
    class="city {city.color}"
    class:faded={city.faded}
    class:selected
    class:quarantine={city.quarantine}
    class:vaccinated={city.vaccinated}
    style={`left: ${city.x}px; top: ${city.y}px; width: ${$game.city_size}px; height: ${$game.city_size}px; background: ${city.faded ? 'lime' : city.color}; border-color: ${city.faded ? city.color : 'white'};`}
    on:click={() => dispatch(selected ? 'unselectCity' : 'selectCity', city.id)}>
    <div class="name">{city.name}</div>
    <div class="city-quarantine" />
    <div class="city-vaccinated" />
    <div class="city-infections">
      {#each Object.entries(city.infections).filter(([, count]) => selected || count > 0) as [infection, count]}
        <span
          class={infection}
          class:faded={infection === 'yellow'}
          on:click|preventDefault|stopPropagation={() => increaseInfection(infection)}>
          {count}
        </span>
      {/each}
    </div>
    <div class="panic">{city.panic}</div>
    {#if city.militaryBase}
      <div class="militaryBase" />
    {/if}
    {#if city.researchStation}
      <div class="researchStation" />
    {/if}
    {#if city.vaccineFactory}
      <div
        class="vaccineFactory"
        on:click|preventDefault|stopPropagation={() => {
          updateCity(city.id, { vaccineDoses: (city.vaccineDoses || 0) + 1 });
        }}>
        {city.vaccineDoses}
      </div>
    {/if}
    {#each Object.values($players).filter(player => player.city === city.id) as player, i}
      <div class="player" style="background: {player.color}; left: {1 + i * 4}px" />
    {/each}
  </div>
{/if}
