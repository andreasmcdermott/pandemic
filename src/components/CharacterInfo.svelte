<script>
  import characters from '../stores/characters';
  import CharacterInfoSection from './CharacterInfoSection.svelte';
  export let character;
  $: characterObject = $characters.find(c => c.id === character);
</script>

<style>
  .container {
    max-width: 300px;
    font-size: 8px;
  }
</style>

{#if characterObject}
  <div class="container">
    <CharacterInfoSection header="Abilities" traits={characterObject.abilities} />
    <CharacterInfoSection header="Relationships" traits={characterObject.relationships} />
    <CharacterInfoSection header="Upgrades" traits={characterObject.upgrades} />
    <CharacterInfoSection header="Scars" traits={characterObject.scars} />
  </div>
{/if}
