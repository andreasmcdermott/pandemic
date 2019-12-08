<script>
  import player, { updatePlayerCharacter, updatePlayerCity } from '../stores/player';
  import characters from '../stores/characters';

  import Container from './Container.svelte';
  import CharacterSelector from './CharacterSelector.svelte';
  import CharacterInfo from './CharacterInfo.svelte';
  import CitySelector from './CitySelector.svelte';
  import Cards from './Cards.svelte';

  $: characterObject = $characters.find(c => c.id === $player.character);
</script>

{#if $player}
  <Container label="Character">
    <CharacterSelector
      selected={$player.character}
      on:change={e => updatePlayerCharacter(e.detail)} />
    <CharacterInfo character={$player.character} showName={false} />
  </Container>

  <Container label="City">
    <CitySelector selected={$player.city} on:change={e => updatePlayerCity(e.detail)} />
  </Container>

  <Container
    label={`Cards${characterObject ? ` (${$player.cards.length} / ${characterObject.max_cards || 7})` : ''}`}>
    <Cards canEdit={true} player={$player} />
  </Container>
{/if}
