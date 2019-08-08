<script>
  import game, { toggleCured, toggleEradicated } from "./game-store";
  let selectedInfection = "";
</script>

<select
  bind:value={selectedInfection}
  on:change={e => {
    selectedInfection = e.target.value;
  }}>
  <option value="">Select infection</option>
  <option value="yellow">Yellow</option>
  <option value="red">Red</option>
  <option value="blue">Blue</option>
  <option value="black">Black</option>
</select>

{#if selectedInfection}
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
