<script>
  import { createEventDispatcher } from "svelte";
  import cities, { createCity, updateCity } from "./city-store";
  import board, { toggleOverlay } from "./board-store";
  import NewCityForm from "./NewCityForm.svelte";
  import UpdateCityForm from "./UpdateCityForm.svelte";

  const dispatch = createEventDispatcher();

  let enabled = true;

  function selectCity(id) {
    dispatch("selectCity", id);
  }
</script>

<style>
  .admin-container {
    font-size: 10px;
    position: fixed;
    left: 0;
    top: 0;
    background: white;
    padding: 5px;
    z-index: 5;
    overflow-y: auto;
    max-height: 100%;
  }
  .admin-mode,
  .overlay {
    margin-bottom: 5px;
  }
</style>

<div class="admin-container">
  <label class="admin-mode">
    <input type="checkbox" bind:checked={enabled} />
    Admin mode
  </label>
  <label class="overlay">
    <input
      type="checkbox"
      checked={$board.showOverlay}
      on:change={toggleOverlay} />
    Show overlay
  </label>

  {#if enabled}
    <UpdateCityForm on:selectCity={e => selectCity(e.detail)} />

    <!-- <NewCityForm on:createdCity={e => selectCity(e.detail)} /> -->
  {/if}

</div>
