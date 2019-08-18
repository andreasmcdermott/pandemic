<script>
  import UserDisplay from "./UserDisplay.svelte";
  import Container from "./Container.svelte";
  import Accordion from "./Accordion.svelte";
  import users from "../stores/users";
  import players from "../stores/players";
  import player from "../stores/player";

  $: otherPlayers = $players.filter(p => p.id !== $player.id);

  $: nameById = $users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});
</script>

{#each otherPlayers as player}
  <Accordion>
    <div slot="label">
      <UserDisplay color={player.color} name={nameById[player.id]} />
    </div>
    <Container label="Character">{player.character || 'N/A'}</Container>
    <Container label="City">{player.city || 'N/A'}</Container>
  </Accordion>
{/each}
