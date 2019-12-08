<script>
  import Card from './Card.svelte';
  import CardSelector from './CardSelector.svelte';
  import Button from './Button.svelte';
  import cards from '../stores/cards';
  import { updateCards } from '../stores/player';

  export let player;
  export let canEdit = false;
  let selectedNewCard = '';

  const sortCards = (c1, c2) => {
    if (c1.id.startsWith('event')) return -1;
    if (c2.id.startsWith('event')) return 1;
    if (c1.color === 'yellow') return -1;
    if (c2.color === 'yellow') return 1;
    if (c1.color === 'red') return -1;
    if (c2.color === 'red') return 1;
    if (c1.color === 'blue') return -1;
    if (c2.color === 'blue') return 1;
    if (c1.color === 'black') return -1;
    if (c2.color === 'black') return 1;
    return 0;
  };

  const remove = id => {
    if (canEdit) {
      updateCards(player.cards.filter(c => c !== id));
    }
  };

  const add = () => {
    if (canEdit && selectedNewCard.length > 0) {
      updateCards(player.cards.concat([selectedNewCard]));
      selectedNewCard = '';
    }
  };

  let cardObjects = null;
  $: {
    if (player && player.cards) {
      cardObjects = player.cards
        .map(c => $cards.find(card => card.id === c))
        .filter(Boolean)
        .sort(sortCards);
    }
  }
</script>

<style>
  .actions {
    margin-top: 5px;
  }
</style>

{#if cardObjects}
  {#each cardObjects as c (c.id)}
    <Card card={c} {canEdit} on:remove={() => remove(c.id)} />
  {:else}
    <em>None</em>
  {/each}

  {#if canEdit}
    <div class="actions">
      <CardSelector bind:selected={selectedNewCard} />
      <Button size="small" on:click={add}>Add</Button>
    </div>
  {/if}
{/if}
