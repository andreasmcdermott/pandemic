<script>
  import { createEventDispatcher } from "svelte";
  import cities, { createCity, updateCity } from "../stores/city";
  import board from "../stores/board";
  import game, { updateInfectionRate, updateOutbreaks } from "../stores/game";
  import UpdateCityForm from "./UpdateCityForm.svelte";
  import UpdateInfectionForm from "./UpdateInfectionForm.svelte";

  import ExpandablePanel from "./ExpandablePanel.svelte";

  const dispatch = createEventDispatcher();

  const rates = [2, 2, 2, 3, 3, 4, 4];

  function selectCity(id) {
    dispatch("selectCity", id);
  }
</script>

<style>
  .admin {
    font-size: 10px;
    background: white;
    padding: 5px;
    max-height: 100vh;
    display: flex;
    flex-direction: row;
  }

  .admin > *:not(:last-child) {
    margin-right: 10px;
  }
</style>

<ExpandablePanel edge="left">
  <div class="admin-container">
    <div class="admin">
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
</ExpandablePanel>
