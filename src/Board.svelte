<script>
  import game from "./game-store";
  import user from "./user-store";
  import cities from "./city-store";
  import board from "./board-store";
  import Admin from "./Admin.svelte";

  export let adminMode = false;

  let selectedCity = null;
  let cityStates = null;
  $: cityStates = $game.cities.reduce((acc, city) => {
    acc[city.id] = city;
    return acc;
  }, {});
  $: {
    console.log($game);
  }

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
  .infection {
    position: absolute;
    bottom: 50px;
    font-size: 12px;
    padding: 2px;
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
</style>

<div class="board-container">
  <img
    alt="board"
    class="image"
    src="/pandemic_board.jpg"
    style={`width: ${$game.board_width}px; height: ${$game.board_height}px;`}
    on:click={updateBoardClick} />

  {#if $board.showOverlay && cityStates}
    {#each $cities as city}
      <div
        title={city.name}
        class="city"
        class:selected={selectedCity === city.id}
        style={`left: ${city.x}px; top: ${city.y}px; width: ${$game.city_size}px; height: ${$game.city_size}px; background: ${cityStates[city.id] && cityStates[city.id].faded ? 'lime' : city.color};`}>
        <div class="name">{city.name}</div>
        <div class="panic">
          {(cityStates[city.id] && cityStates[city.id].panic) || ''}
        </div>
        {#if cityStates[city.id] && cityStates[city.id].militaryBase}
          <div class="militaryBase" />
        {/if}
        {#if cityStates[city.id] && cityStates[city.id].researchStation}
          <div class="researchStation" />
        {/if}
      </div>
    {/each}
  {/if}

  <div class="infection yellow">N/A</div>
  <div class="infection red">
    {#if $game.cured.red}Cured{:else}Not cured{/if}
  </div>
  <div class="infection blue">
    {#if $game.cured.blue}Cured{:else}Not cured{/if}
  </div>
  <div class="infection black">
    {#if $game.cured.black}Cured{:else}Not cured{/if}
  </div>

  {#if $user.admin && adminMode}
    <Admin
      on:selectCity={e => {
        selectedCity = e.detail;
      }} />
  {/if}
</div>
