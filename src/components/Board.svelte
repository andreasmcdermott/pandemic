<script>
  import game from "../stores/game";
  import cities from "../stores/cities";

  import City from "./City.svelte";

  export let selectedCity;

  let outbreakPosX = 0;
  let outbreakPosY = 0;
  let infectionPosX = 0;

  $: outbreakPosX = 40 + ($game.outbreaks % 2) * 40;
  $: outbreakPosY = 340 + $game.outbreaks * 28;
  $: infectionPosX = 1008 + $game.infection_rate * 46.5;
</script>

<style>
  .board-container {
    display: inline-block;
    position: relative;
  }
  .infection {
    position: absolute;
    bottom: 25px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  .infection.red {
    left: 105px;
    background: red;
  }
  .infection.blue {
    left: 190px;
    background: blue;
  }
  .infection.black {
    left: 270px;
    background: black;
  }
  .infection > .cured {
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 25px;
    height: 0;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
  }
  .infection > .cured:after {
    content: " ";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 25px;
    height: 25px;
    border: 2px solid white;
    border-radius: 50%;
  }
  .infection.cured:not(.eradicated) > .cured {
    display: block;
  }
  .infection > .eradicated {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75%;
    height: 75%;
    background: url("/skull.svg") center center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .infection.eradicated > .eradicated {
    display: block;
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
    style={`width: ${$game.board_width}px; height: ${$game.board_height}px;`} />

  {#each $cities as city}
    <City {city} selected={selectedCity === city.id} />
  {/each}

  <div
    class="outbreak"
    style="left: {outbreakPosX}px; top: {outbreakPosY}px;" />
  <div class="infectionRate" style="left: {infectionPosX}px;" />

  {#each ['red', 'blue', 'black'] as infection}
    <div
      class="infection {infection}"
      class:cured={$game.cured[infection]}
      class:eradicated={$game.eradicated[infection]}>
      <div class="cured" />
      <div class="eradicated" />
    </div>
  {/each}
</div>
