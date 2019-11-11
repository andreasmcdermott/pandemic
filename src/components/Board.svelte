<script>
  import { createEventDispatcher } from "svelte";

  import game, {
    updateInfectionRate,
    updateOutbreaks,
    updateObjectives
  } from "../stores/game";
  import cities from "../stores/cities";
  import Button from "./Button.svelte";
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
    content: " ";
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
    src="/pandemic_board.jpg"
    style={`width: ${$game.board_width}px; height: ${$game.board_height}px;`} />

  {#each $cities as city}
    <City
      {city}
      selected={selectedCity === city.id}
      on:select={e => dispatch('selectedCity', city.id)} />
  {/each}

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
