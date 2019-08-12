<script>
  import game, { updateInfectionRate, updateOutbreaks } from "../stores/game";

  import Container from "./Container.svelte";
  import ExpandablePanel from "./ExpandablePanel.svelte";
  import UpdateCityForm from "./UpdateCityForm.svelte";
  import UpdateInfectionForm from "./UpdateInfectionForm.svelte";

  const rates = [2, 2, 2, 3, 3, 4, 4];
</script>

<style>
  .admin {
    font-size: 10px;
    background: white;
    padding: 5px;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .admin > *:not(:last-child) {
    margin-right: 5px;
  }
</style>

<ExpandablePanel edge="left">
  <div class="admin-container">
    <div class="admin">
      <div>
        <UpdateCityForm on:selectCity />
      </div>
      <div>
        <UpdateInfectionForm />
      </div>
      <div>
        <Container label="Infection Rate">
          <select
            value={$game.infection_rate}
            on:change={e => updateInfectionRate(parseInt(e.target.value, 10))}>
            {#each [0, 1, 2, 3, 4, 5, 6] as rate}
              <option value={rate}>{rates[rate]}</option>
            {/each}
          </select>
        </Container>
      </div>
      <div>
        <Container label="Outbreaks">
          <select
            value={$game.outbreaks}
            on:change={e => updateOutbreaks(parseInt(e.target.value, 10))}>
            {#each [0, 1, 2, 3, 4, 5, 6, 7, 8] as val}
              <option value={val}>{val === 8 ? 'Game over' : val}</option>
            {/each}
          </select>
        </Container>
      </div>
    </div>
  </div>
</ExpandablePanel>
