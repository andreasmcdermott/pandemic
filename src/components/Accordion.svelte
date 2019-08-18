<script>
  export let label;
  let expanded = false;
</script>

<style>
  .label > button {
    display: flex;
    border: none;
    background: none;
    padding: 0;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }

  .toggle-arrow {
    display: inline-block;
    font-weight: bold;
    transform: rotate(180deg);
    transform-origin: 50% 50%;
  }

  .label.expanded .toggle-arrow {
    transform: rotate(0deg);
  }
</style>

<div>
  <div class="label" class:expanded>
    <button on:click={() => (expanded = !expanded)}>
      <slot name="label" />
      <span class="toggle-arrow">^</span>
    </button>
  </div>
  {#if expanded}
    <div>
      <slot />
    </div>
  {/if}
</div>
