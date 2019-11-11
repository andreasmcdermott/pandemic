<script>
  import player, {
    updatePlayerCharacter,
    updatePlayerCity
  } from "../stores/player";

  import Container from "./Container.svelte";
  import CharacterSelector from "./CharacterSelector.svelte";
  import CitySelector from "./CitySelector.svelte";
</script>

{#if $player}
  <Container label="Character">
    <CharacterSelector
      selected={$player.character}
      on:change={e => updatePlayerCharacter(e.detail)} />
  </Container>

  <Container label="City">
    <CitySelector
      selected={$player.city}
      on:change={e => updatePlayerCity(e.detail)} />
  </Container>

  <Container label="Cards">
    <div>TOdo</div>
  </Container>
{/if}
