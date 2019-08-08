<script>
  import { createEventDispatcher } from "svelte";
  import cities, { createCity, updateCity } from "./city-store";
  import board from "./board-store";
  import game, { updateInfectionRate, updateOutbreaks } from "./game-store";
  import UpdateCityForm from "./UpdateCityForm.svelte";
  import UpdateInfectionForm from "./UpdateInfectionForm.svelte";

  const dispatch = createEventDispatcher();

  let expanded = false;

  const rates = [2, 2, 2, 3, 3, 4, 4];

  function selectCity(id) {
    dispatch("selectCity", id);
  }
</script>

<style>
  .admin {
    position: fixed;
    transform: translateX(-100%);
    left: 0;
    top: 0;
    font-size: 10px;
    background: white;
    padding: 5px;
    z-index: 5;
    max-height: 100vh;
    display: flex;
    flex-direction: row;
  }

  .admin.expanded {
    transform: none;
  }

  .toggleExpanded {
    position: absolute;
    width: 20px;
    height: 20px;
    padding: 0;
    text-align: center;
    line-height: 20px;
    left: 100%;
  }

  .admin > *:not(:last-child) {
    margin-right: 10px;
  }
</style>

<div class="admin-container">
  <div class="admin" class:expanded>
    <button
      class="toggleExpanded"
      on:click={() => {
        expanded = !expanded;
      }}>
      {expanded ? '<' : '>'}
    </button>
    <div>
      <UpdateCityForm on:selectCity={e => selectCity(e.detail)} />
    </div>
    <div>
      <UpdateInfectionForm />
    </div>
    <fieldset>
      <legend>Infection rate</legend>
      <select
        value={$game.infection_rate}
        on:change={e => updateInfectionRate(parseInt(e.target.value, 10))}>
        {#each [0, 1, 2, 3, 4, 5, 6] as rate}
          <option value={rate}>{rates[rate]}</option>
        {/each}
      </select>
    </fieldset>

    <fieldset>
      <legend>Outbreaks</legend>
      <select
        value={$game.outbreaks}
        on:change={e => updateOutbreaks(parseInt(e.target.value, 10))}>
        {#each [0, 1, 2, 3, 4, 5, 6, 7, 8] as val}
          <option value={val}>{val === 8 ? 'Game over' : val}</option>
        {/each}
      </select>
    </fieldset>
  </div>
</div>
