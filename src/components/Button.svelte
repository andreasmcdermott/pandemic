<script>
  export let type = 'button';
  export let size = 'normal';

  let n = null;
  export const node = () => n;
</script>

<style>
  .button {
    border: none;
    background: rebeccapurple;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    height: 26px;
    border-radius: 3px;
  }

  .button.small {
    height: 12px;
    font-weight: normal;
    display: inline-flex;
    font-size: 10px;
  }
</style>

<button bind:this={n} class="button" on:click {type} class:small={size === 'small'}>
  <slot />
</button>
