<script>
  export let label = "";
</script>

<style>
  fieldset {
    border: 1px solid #ddd;
    padding: 5px;
    margin-bottom: 10px;
  }

  legend {
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 9px;
    padding: 0 5px;
  }
</style>

<fieldset>
  <legend>{label}</legend>
  <slot />
</fieldset>
