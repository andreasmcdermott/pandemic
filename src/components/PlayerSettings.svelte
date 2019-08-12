<script>
  import game, {
    updatePlayerCharacter,
    updatePlayerCity
  } from "../stores/game";
  import characters from "../stores/character";
  import cities from "../stores/city";
  import user from "../stores/user";

  $: userId = $user.uid;
  $: player = $game.players[userId] || {};
</script>

{#if player}
  <fieldset>
    <legend>Character</legend>
    <select
      bind:value={player.character}
      on:change={e => {
        updatePlayerCharacter(userId, e.target.value);
      }}>
      <option value="none">None</option>
      {#each $characters as character}
        <option value={character.id}>
          {character.name} ({character.type})
        </option>
      {/each}
    </select>
  </fieldset>

  <fieldset>
    <legend>City</legend>
    <select
      bind:value={player.city}
      on:change={e => {
        updatePlayerCity(userId, e.target.value);
      }}>
      <option value="">Nowhere</option>
      {#each $cities as city}
        <option value={city.id}>{city.name}</option>
      {/each}
    </select>
  </fieldset>
{/if}
