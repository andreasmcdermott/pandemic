<script>
  import { createEventDispatcher } from "svelte";

  import game, { updateInfectionRate, updateOutbreaks } from "../stores/game";
  import cities from "../stores/cities";

  import City from "./City.svelte";
  import Infections from "./Infections.svelte";

  export let selectedCity;

  const dispatch = createEventDispatcher();

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
  .infectionRate {
    cursor: pointer;
    width: 30px;
    height: 30px;
    position: absolute;
    border-radius: 50%;
    background: darkgreen;
    border: 2px solid white;
    top: 158px;
  }
  .outbreak {
    cursor: pointer;
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
    <City
      {city}
      selected={selectedCity === city.id}
      on:select={e => dispatch('selectedCity', city.id)} />
  {/each}

  <div
    class="outbreak"
    style="left: {outbreakPosX}px; top: {outbreakPosY}px;"
    on:click={() => updateOutbreaks(($game.outbreaks + 1) % 9)} />

  <div
    class="infectionRate"
    style="left: {infectionPosX}px;"
    on:click={() => updateInfectionRate(($game.infection_rate + 1) % 7)} />

  <Infections />
</div>
