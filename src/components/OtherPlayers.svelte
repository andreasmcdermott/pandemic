<script>
  import users from '../stores/users';
  import players from '../stores/players';
  import player from '../stores/player';
  import characters from '../stores/characters';
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

  const getMaxCards = player => {
    const character = $characters.find(c => c.id === player.character);
    return character.max_cards || 7;
  };
</script>

{#each otherPlayers as player}
  <Accordion>
    <div slot="label">
      <UserDisplay color={player.color} name={nameById[player.id]} />
    </div>
    <Container label="Character">

      {#if player.character}
        <CharacterInfo character={player.character} />
      {:else}
        <span>N/A</span>
      {/if}
    </Container>
    <Container label="City">{capitalize(player.city) || 'N/A'}</Container>
    <Container label={`Cards${` (${player.cards.length} / ${getMaxCards(player)})`}`}>
      <Cards canEdit={false} {player} />
    </Container>
  </Accordion>
{/each}
