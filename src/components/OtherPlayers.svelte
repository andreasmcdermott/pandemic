<script>
  import users from '../stores/users';
  import players from '../stores/players';
  import player from '../stores/player';
  import { capitalize } from '../utils/strings';

  import Cards from './Cards.svelte';
  import UserDisplay from './UserDisplay.svelte';
  import Container from './Container.svelte';
  import Accordion from './Accordion.svelte';
  import CharacterInfo from './CharacterInfo.svelte';

  $: otherPlayers = $players.filter(p => p.id !== $player.id);

  $: nameById = $users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});
</script>

<style>
  .character {
    display: block;
    padding-bottom: 10px;
  }
</style>

{#each otherPlayers as player}
  <Accordion>
    <div slot="label">
      <UserDisplay color={player.color} name={nameById[player.id]} />
    </div>
    <Container label="Character">
      <span class="character">{capitalize(player.character) || 'N/A'}</span>
      {#if player.character}
        <CharacterInfo character={player.character} />
      {/if}
    </Container>
    <Container label="City">{capitalize(player.city) || 'N/A'}</Container>
    <Container label="Cards">
      <Cards canEdit={false} {player} />
    </Container>
  </Accordion>
{/each}
