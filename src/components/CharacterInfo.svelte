<script>
  import characters from '../stores/characters';
  export let character;
  $: characterObject = $characters.find(c => c.id === character);
</script>

{#if characterObject}
  <div>{characterObject.abilities}</div>
  <div>{characterObject.relationships}</div>
  <div>{characterObject.upgrades}</div>
  <div>{characterObject.scars}</div>
{/if}
