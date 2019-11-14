<script>
  import game, { updateInfectionRate, updateOutbreaks, updateObjectives } from '../stores/game';
  import cities from '../stores/cities';
  import Button from './Button.svelte';
  import City from './City.svelte';
  import Infections from './Infections.svelte';

  export let selectedCity;

  let outbreakPosX = 0;
  let outbreakPosY = 0;
  let infectionPosX = 0;

  const getOutbreakPosX = index => 40 + (index % 2) * 40;
  const getOutbreakPosY = index => 340 + index * 28;
  const getInfectionPosX = index => 1008 + index * 46.5;

  $: outbreakPosX = getOutbreakPosX($game.outbreaks);
  $: outbreakPosY = getOutbreakPosY($game.outbreaks);
  $: infectionPosX = getInfectionPosX($game.infection_rate);

  const updateObjective = (values, index) => {
    const objectives = $game.objectives;
    objectives[index] = values;
    updateObjectives(objectives);
  };
</script>

<style>
  .board-container {
    display: inline-block;
    position: relative;
    background: #333;
    border: 5px solid gray;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  .infectionRate {
    width: 30px;
    height: 30px;
    position: absolute;
    border-radius: 50%;
    background: darkgreen;
    border: 2px solid white;
    top: 158px;
    opacity: 0.25;
  }
  .infectionRate.active {
    cursor: pointer;
    opacity: 1;
  }
  .outbreak {
    width: 30px;
    height: 30px;
    position: absolute;
    border-radius: 50px;
    background: purple;
    opacity: 0.25;
    border: 2px solid white;
  }
  .outbreak.active {
    cursor: pointer;
    opacity: 1;
  }
  .objectives {
    position: absolute;
    top: 15px;
    left: 25px;
    display: flex;
  }
  .objective {
    background: black;
    color: white;
    border: 1px solid white;
    width: 155px;
    height: 110px;
    padding: 5px;
    box-sizing: border-box;
    position: relative;
    font-size: 12px;
    margin-right: 18px;
    overflow: hidden;
  }
  .objective:hover {
    height: auto;
  }
  .objective .text {
    background: black;
    width: 100%;
  }
  .objective .actions {
    display: none;
    margin-top: 10px;
  }
  .objective:hover .actions {
    display: block;
  }
  .objective .mandatory-toggle {
    content: ' ';
    z-index: 2;
    background: black;
    border: 1px solid red;
    border-radius: 50%;
    position: absolute;
    right: 5px;
    top: 5px;
    width: 5px;
    height: 5px;
    display: block;
    cursor: pointer;
  }
  .objective.mandatory .mandatory-toggle {
    background: red;
  }
  .objective.completed {
    border-color: lightgreen;
    color: lightgreen;
  }
  .objective.add-new {
    background: white;
    border-color: black;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
</style>

<div class="board-container">
  <img
    alt="board"
    class="image"
    src="/pandemic_board_simple.png"
    style={`width: ${$game.board_width}px; height: ${$game.board_height}px;`} />

  <div class="cities">
    {#each $cities as city}
      <City {city} selected={selectedCity === city.id} on:selectCity on:unselectCity />
    {/each}
  </div>

  <div class="objectives">
    {#each $game.objectives as objective, i}
      <div
        class="objective"
        class:mandatory={objective.mandatory}
        class:completed={objective.completed}>
        <div class="text">{objective.text}</div>
        <div class="actions">
          <Button
            on:click={() => {
              updateObjective({ ...objective, completed: !objective.completed }, i);
            }}>
            {objective.completed ? 'In Progress' : 'Complete'}
          </Button>
          <Button>Edit</Button>
          <Button>Remove</Button>
        </div>
        <div
          class="mandatory-toggle"
          on:click={() => {
            updateObjective({ ...objective, mandatory: !objective.mandatory }, i);
          }} />
      </div>
    {/each}
    {#if $game.objectives.length < 5}
      <div class="objective add-new">
        <strong>+ Add</strong>
      </div>
    {/if}
  </div>

  <div class="outbreaks">
    {#each [0, 1, 2, 3, 4, 5, 6, 7, 8] as o}
      <div class="outbreak" style="left: {getOutbreakPosX(o)}px; top: {getOutbreakPosY(o)}px;" />
    {/each}
    <div
      class="outbreak active"
      style="left: {outbreakPosX}px; top: {outbreakPosY}px;"
      on:click={() => updateOutbreaks(($game.outbreaks + 1) % 9)} />
  </div>

<div class="infectionRates">
  {#each [0, 1, 2 ,3, 4, 5, 6] as i}
    <div class="infectionRate" style="left: {getInfectionPosX(i)}px;" />
  {/each}

  <div
    class="infectionRate active"
    style="left: {infectionPosX}px;"
    on:click={() => updateInfectionRate(($game.infection_rate + 1) % 7)} />
</div>

  <Infections />
</div>
