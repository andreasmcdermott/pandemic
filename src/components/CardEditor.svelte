<script>
  import cards, { updateCard } from '../stores/cards';

  import CardSelector from './CardSelector.svelte';
  import Container from './Container.svelte';

  let selectedCard;
  let card;

  $: card = $cards.find(c => c.id === selectedCard);
</script>

<Container label="Cards">
  <CardSelector
    selected={selectedCard}
    on:change={e => {
      selectedCard = e.detail;
    }} />
  {#if card}
    <input
      type="text"
      placeholder="Event Type"
      value={card.eventType || ''}
      on:change={e => updateCard({ ...card, eventType: e.target.value })} />
    <input
      type="text"
      placeholder="Event Name"
      value={card.eventName || ''}
      on:change={e => updateCard({ ...card, eventName: e.target.value })} />
    <input
      type="text"
      placeholder="Event Description"
      value={card.eventDescription || ''}
      on:change={e => updateCard({ ...card, eventDescription: e.target.value })} />
  {/if}
</Container>
