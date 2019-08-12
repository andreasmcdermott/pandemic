<script>
  import game from "../stores/game";
  import players from "../stores/players";

  export let selected = false;
  export let city = null;
</script>

<style>
  .city {
    position: absolute;
    border: 2px solid white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    color: white;
  }
  .city.selected {
    border-color: skyblue;
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
  .city-infections {
    position: absolute;
    left: -18px;
    top: -20px;
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
</style>

{#if city}
  <div
    title={city.name}
    class="city {city.color}"
    class:faded={city.faded}
    class:selected
    style={`left: ${city.x}px; top: ${city.y}px; width: ${$game.city_size}px; height: ${$game.city_size}px; background: ${city.faded ? 'lime' : city.color};`}>
    <div class="name">{city.name}</div>
    <div class="city-infections">
      {#each Object.entries(city.infections).filter(([, count]) => count > 0) as [infection, count]}
        <span class={infection} class:faded={infection === 'yellow'}>
          {count}
        </span>
      {/each}
    </div>
    <div class="panic">{city.panic || ''}</div>
    {#if city.militaryBase}
      <div class="militaryBase" />
    {/if}
    {#if city.researchStation}
      <div class="researchStation" />
    {/if}
    {#each Object.values($players).filter(player => player.city === city.id) as player, i}
      <div
        class="player"
        style="background: {player.color}; left: {1 + i * 4}px" />
    {/each}
  </div>
{/if}