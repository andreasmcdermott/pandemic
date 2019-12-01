<script>
  import player, { updatePlayerCharacter, updatePlayerCity } from '../stores/player';

  import Container from './Container.svelte';
  import CharacterSelector from './CharacterSelector.svelte';
  import CharacterInfo from './CharacterInfo.svelte';
  import CitySelector from './CitySelector.svelte';
  import Cards from './Cards.svelte';
</script>

{#if $player}
  <Container label="Character">
    <CharacterSelector
      selected={$player.character}
      on:change={e => updatePlayerCharacter(e.detail)} />
    <CharacterInfo character={$player.character} />
  </Container>

  <Container label="City">
    <CitySelector selected={$player.city} on:change={e => updatePlayerCity(e.detail)} />
  </Container>

  <Container label="Cards">
    <Cards player={$player} />
  </Container>
{/if}
