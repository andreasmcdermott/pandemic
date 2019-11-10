<script>
  import game, { toggleCured, toggleEradicated } from "../stores/game";
  import Container from "./Container.svelte";
  import { capitalize } from "../utils/strings";

  let selectedInfection = "";
</script>

<Container label="Infection">
  {#each ['Red', 'Blue', 'Black'] as infection}
    <button on:click={() => (selectedInfection = infection.toLowerCase())}>
      {infection}
    </button>
  {/each}

  {#if selectedInfection}
    <strong>{capitalize(selectedInfection)}:</strong>
    <label>
      <input
        type="checkbox"
        checked={$game.cured[selectedInfection]}
        on:change={() => {
          toggleCured(selectedInfection);
        }} />
      Cured
    </label>
    <label>
      <input
        type="checkbox"
        checked={$game.eradicated[selectedInfection]}
        on:change={() => {
          toggleEradicated(selectedInfection);
        }} />
      Eradicated
    </label>
    <button
      on:click={() => {
        selectedInfection = '';
      }}>
      Done
    </button>
  {/if}
</Container>
