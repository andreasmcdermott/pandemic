<script>
  import player, {
    updatePlayerCharacter,
    updatePlayerCity,
    updatePlayerDoses
  } from '../stores/player';
  import characters from '../stores/characters';

  import Container from './Container.svelte';
  import CharacterSelector from './CharacterSelector.svelte';
  import CharacterInfo from './CharacterInfo.svelte';
  import CitySelector from './CitySelector.svelte';
  import Cards from './Cards.svelte';
  import Button from './Button.svelte';

  $: characterObject = $characters.find(c => c.id === $player.character);
</script>

<style>
  .doses-actions {
    display: flex;
  }

  .doses-action {
    width: 33%;
  }
  .doses-display {
    width: 33%;
    text-align: center;
  }
</style>

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

  <Container label={`Doses`}>
    <div class="doses-actions">
      <div class="doses-action">
        <Button
          size="small"
          on:click={() => {
            updatePlayerDoses(($player.doses || 0) - 1);
          }}>
          -
        </Button>
      </div>
      <div class="doses-display">{$player.doses || 0}</div>
      <div class="doses-action">
        <Button
          size="small"
          on:click={() => {
            updatePlayerDoses(($player.doses || 0) + 1);
          }}>
          +
        </Button>
      </div>
    </div>
  </Container>
{/if}
