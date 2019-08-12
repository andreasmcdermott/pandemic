<script>
  import game from "../stores/game";
  import user from "../stores/user";
  import cities from "../stores/city";
  import board from "../stores/board";

  export let selectedCity;

  let cityStates = null;
  $: cityStates = $game.cities.reduce((acc, city) => {
    acc[city.id] = city;
    return acc;
  }, {});

  $: outbreakPosX = 40 + ($game.outbreaks % 2) * 40;
  $: outbreakPosY = 340 + $game.outbreaks * 28;
  $: infectionPosX = 1008 + $game.infection_rate * 46.5;

  function updateBoardClick(e) {
    const { clientX, clientY } = e;
    const { scrollX, scrollY } = window;

    board.set({ x: clientX + scrollX, y: clientY + scrollY });
  }
</script>

<style>
  .board-container {
    display: inline-block;
    position: relative;
  }
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
  .infection {
    position: absolute;
    bottom: 50px;
    max-width: 60px;
    overflow: hidden;
    font-size: 11px;
    padding: 2px;
    margin: 0;
    list-style-type: none;
  }
  .infection.red {
    left: 95px;
    background: red;
    color: white;
  }
  .infection.blue {
    left: 180px;
    background: blue;
    color: white;
  }
  .infection.black {
    left: 260px;
    background: black;
    color: white;
  }
  .infection.yellow {
    left: 20px;
    background: yellow;
    color: black;
  }
  .infectionRate {
    width: 30px;
    height: 30px;
    position: absolute;
    border-radius: 50%;
    background: darkgreen;
    border: 2px solid white;
    top: 158px;
  }
  .outbreak {
    width: 30px;
    height: 30px;
    position: absolute;
    border-radius: 50px;
    background: purple;
    border: 2px solid white;
  }
</style>

<div class="board-container">
  <img
    alt="board"
    class="image"
    src="/pandemic_board.jpg"
    style={`width: ${$game.board_width}px; height: ${$game.board_height}px;`}
    on:click={updateBoardClick} />

  {#if cityStates}
    {#each $cities as city}
      <div
        title={city.name}
        class="city {city.color}"
        class:faded={cityStates[city.id] && cityStates[city.id].faded}
        class:selected={selectedCity === city.id}
        style={`left: ${city.x}px; top: ${city.y}px; width: ${$game.city_size}px; height: ${$game.city_size}px; background: ${cityStates[city.id] && cityStates[city.id].faded ? 'lime' : city.color};`}>
        <div class="name">{city.name}</div>
        {#if cityStates[city.id]}
          <div class="city-infections">
            {#each Object.entries(cityStates[city.id].infections).filter(([, count]) => count > 0) as [infection, count]}
              <span class={infection} class:faded={infection === 'yellow'}>
                {count}
              </span>
            {/each}
          </div>
        {/if}
        <div class="panic">
          {(cityStates[city.id] && cityStates[city.id].panic) || ''}
        </div>
        {#if cityStates[city.id] && cityStates[city.id].militaryBase}
          <div class="militaryBase" />
        {/if}
        {#if cityStates[city.id] && cityStates[city.id].researchStation}
          <div class="researchStation" />
        {/if}
        {#each Object.values($game.players).filter(player => player.city === city.id) as player, i}
          <div
            class="player"
            style="background: {player.color}; left: {1 + i * 4}px" />
        {/each}
      </div>
    {/each}
  {/if}

  <div
    class="outbreak"
    style="left: {outbreakPosX}px; top: {outbreakPosY}px;" />
  <div class="infectionRate" style="left: {infectionPosX}px;" />

  <div class="infection yellow">N/A</div>
  <ul class="infection red">
    <li>
      {#if $game.cured.red}Cured{:else}Not cured{/if}
    </li>
    <li>
      {#if $game.eradicated.red}Eradicated{:else}Not eradicated{/if}
    </li>
  </ul>
  <ul class="infection blue">
    <li>
      {#if $game.cured.blue}Cured{:else}Not cured{/if}
    </li>
    <li>
      {#if $game.eradicated.blue}Eradicated{:else}Not eradicated{/if}
    </li>
  </ul>
  <ul class="infection black">
    <li>
      {#if $game.cured.black}Cured{:else}Not cured{/if}
    </li>
    <li>
      {#if $game.eradicated.black}Eradicated{:else}Not eradicated{/if}
    </li>
  </ul>
</div>
