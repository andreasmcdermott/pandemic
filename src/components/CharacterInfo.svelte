<script>
  import characters from '../stores/characters';
  import CharacterInfoSection from './CharacterInfoSection.svelte';
  import { capitalize } from '../utils/strings';

  export let character;
  export let showName = true;
  $: characterObject = $characters.find(c => c.id === character);
</script>

<style>
  .container {
    max-width: 300px;
    font-size: 8px;
  }

  .name {
    font-size: 12px;
    display: block;
    padding-bottom: 10px;
  }
</style>

{#if characterObject}
  <div class="container">
    {#if characterObject.dead}
      <strong>Dead!</strong>
    {:else}
      {#if showName}
        <span class="name">{capitalize(characterObject.name)} ({characterObject.type})</span>
      {/if}
      <CharacterInfoSection header="Abilities" traits={characterObject.abilities} />
      <CharacterInfoSection header="Relationships" traits={characterObject.relationships} />
      <CharacterInfoSection header="Upgrades" traits={characterObject.upgrades} />
      <CharacterInfoSection header="Scars" traits={characterObject.scars} />
    {/if}
  </div>
{/if}
