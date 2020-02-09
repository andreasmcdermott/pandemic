<script>
  import game from '../stores/game';
  import Cities from './Cities.svelte';
  import Infections from './Infections.svelte';
  import Outbreaks from './Outbreaks.svelte';
  import InfectionRate from './InfectionRate.svelte';
  import Objectives from './Objectives.svelte';
  import Search from './Search.svelte';
  import Roadblocks from './Roadblocks.svelte';

  export let selectedCity;
</script>

<style>
  .board-container {
    display: inline-block;
    position: relative;
    background: #333;
    border: 5px solid gray;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
</style>

<div class="board-container">
  <img
    alt="board"
    class="image"
    src="/pandemic_board_simple.png"
    style={`width: ${$game.board_width}px; height: ${$game.board_height}px;`} />

  <Cities bind:selectedCity on:selectCity on:unselectCity />
  <Outbreaks />
  <InfectionRate />
  <Infections />
  <Search />
  <Roadblocks />
  <Objectives />
</div>
