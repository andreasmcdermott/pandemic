<script>
  import game, { updateInfectionRate, updateOutbreaks } from "../stores/game";

  import Container from "./Container.svelte";
  import ExpandablePanel from "./ExpandablePanel.svelte";
  import UpdateCityForm from "./UpdateCityForm.svelte";
  import UpdateInfectionForm from "./UpdateInfectionForm.svelte";

  const rateValues = [0, 1, 2, 3, 4, 5, 6];
  const rateDisplay = [2, 2, 2, 3, 3, 4, 4];

  const outbreakValues = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  export let selectedCity;
  export let expanded = false;
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

  .buttons {
    display: flex;
  }
</style>

<ExpandablePanel edge="left" bind:expanded>
  <div class="admin-container">
    <div class="admin">
      <div>
        <UpdateCityForm {selectedCity} on:selectCity />
      </div>
      <div>
        <UpdateInfectionForm />
      </div>
      <div>
        <Container label="Infection Rate">
          <select
            value={$game.infection_rate}
            on:change={e => updateInfectionRate(parseInt(e.target.value, 10))}>
            {#each rateValues as rate}
              <option value={rate}>{rateDisplay[rate]}</option>
            {/each}
          </select>
          <div class="buttons">
            <button
              on:click={() => {
                const newVal = $game.infection_rate - 1;
                if (newVal < rateValues[0]) return;
                updateInfectionRate(newVal);
              }}>
              -
            </button>
            &nbsp;
            <button
              on:click={() => {
                const newVal = $game.infection_rate + 1;
                if (newVal > rateValues[rateValues.length - 1]) return;
                updateInfectionRate(newVal);
              }}>
              +
            </button>
          </div>
        </Container>
      </div>
      <div>
        <Container label="Outbreaks">
          <select
            value={$game.outbreaks}
            on:change={e => updateOutbreaks(parseInt(e.target.value, 10))}>
            {#each outbreakValues as val}
              <option value={val}>{val === 8 ? 'Game over' : val}</option>
            {/each}
          </select>
          <div class="buttons">
            <button
              on:click={() => {
                const newVal = $game.outbreaks - 1;
                if (newVal < outbreakValues[0]) return;
                updateOutbreaks(newVal);
              }}>
              -
            </button>
            &nbsp;
            <button
              on:click={() => {
                const newVal = $game.outbreaks + 1;
                if (newVal > outbreakValues[outbreakValues.length - 1]) return;
                updateOutbreaks(newVal);
              }}>
              +
            </button>
          </div>
        </Container>
      </div>
    </div>
  </div>
</ExpandablePanel>
