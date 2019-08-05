<script>
  import Admin from "./Admin.svelte";
  import game from "./game-store";
  import cities from "./city-store";
  import board from "./board-store";

  let selectedCity = null;
  let cityStates = null;
  $: cityStates = $game.cities.reduce((acc, city) => {
    acc[city.id] = city;
    return acc;
  }, {});

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

  <Admin
    on:selectCity={e => {
      selectedCity = e.detail;
    }} />
</div>
