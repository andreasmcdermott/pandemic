<script>
  import { createEventDispatcher } from "svelte";
  import board from "../stores/board";
  import { createCity } from "../stores/city";

  const dispatch = createEventDispatcher();

  let show = false;
  let nameInput = null;
  let name = "";
  let color = "";
  let region = "";

  function newCity() {
    const id = createCity({ name, color, region, x: $board.x, y: $board.y });
    dispatch("createdCity", id);
  }
</script>

{#if show}
  <input
    type="text"
    placeholder="Name"
    bind:value={name}
    bind:this={nameInput} />
  <fieldset>
    <legend>Virus</legend>
    <label>
      <input type="radio" value="black" bind:group={color} />
      Black
    </label>
    <label>
      <input type="radio" value="blue" bind:group={color} />
      Blue
    </label>
    <label>
      <input type="radio" value="red" bind:group={color} />
      Red
    </label>
    <label>
      <input type="radio" value="yellow" bind:group={color} />
      Yellow
    </label>
  </fieldset>
  <fieldset>
    <legend>Region</legend>
    <label>
      <input type="radio" value="north-america" bind:group={region} />
      North America
    </label>
    <label>
      <input type="radio" value="south-america" bind:group={region} />
      South America
    </label>
    <label>
      <input type="radio" value="europe" bind:group={region} />
      Europe
    </label>
    <label>
      <input type="radio" value="africa" bind:group={region} />
      Africa
    </label>
    <label>
      <input type="radio" value="asia" bind:group={region} />
      Asia
    </label>
    <label>
      <input type="radio" value="pacific-rim" bind:group={region} />
      Pacific Rim
    </label>
  </fieldset>
  <fieldset>
    <legend>Position</legend>
    <input type="text" value={$board.x} />
    <input type="text" value={$board.y} />
  </fieldset>
  <button on:click={newCity}>Create</button>
  <button
    on:click={() => {
      show = false;
    }}>
    Done
  </button>
{:else}
  <button
    on:click={() => {
      show = true;
    }}>
    New city
  </button>
{/if}
