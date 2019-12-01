<script>
  import characters, { updateCharacter } from '../stores/characters';

  import CharacterSelector from './CharacterSelector.svelte';
  import CharacterTrait from './CharacterTrait.svelte';
  import Container from './Container.svelte';

  let selectedCharacter;
  let character;
  $: character = $characters.find(c => c.id === selectedCharacter);
</script>

<Container label="Characters">
  <CharacterSelector
    selected={selectedCharacter}
    on:change={e => {
      selectedCharacter = e.detail;
    }} />
  {#if character}
    {#if character.dead}
      <strong>Dead!</strong>
    {:else}
      <CharacterTrait
        items={character.abilities || []}
        type="Abilities"
        on:change={e => {
          updateCharacter(selectedCharacter, { abilities: e.detail });
        }} />
      <CharacterTrait
        items={character.relationships || []}
        type="Relationships"
        on:change={e => {
          updateCharacter(selectedCharacter, { relationships: e.detail });
        }} />
      <CharacterTrait
        items={character.upgrades || []}
        type="Upgrades"
        on:change={e => {
          updateCharacter(selectedCharacter, { upgrades: e.detail });
        }} />
      <CharacterTrait
        items={character.scars || []}
        type="Scars"
        on:change={e => {
          updateCharacter(selectedCharacter, { scars: e.detail });
        }} />
    {/if}
  {/if}
</Container>
