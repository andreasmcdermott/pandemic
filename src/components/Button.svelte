<script>
  export let type = "button";
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
</style>

<button class="button" on:click {type}>
  <slot />
</button>
