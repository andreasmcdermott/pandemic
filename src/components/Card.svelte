<script>
  import { createEventDispatcher } from 'svelte';
  export let card;
  export let canEdit = false;

  const dispatch = createEventDispatcher();

  const remove = () => {
    if (canEdit) {
      dispatch('remove');
    }
  };
</script>

<style>
  .card {
    position: relative;
    font-size: 8px;
    line-height: 12px;
    margin-bottom: 1px;
  }

  .card:hover .eventInfo {
    display: inline;
  }

  .card .name {
    margin-left: 20px;
  }

  .card.canEdit .name {
    cursor: pointer;
  }

  .header {
    text-transform: uppercase;
    font-weight: normal;
    letter-spacing: 1px;
  }

  .color {
    position: absolute;
    width: 10px;
    height: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    background: white;
    border: 1px solid black;
  }

  .x {
    display: none;
    color: black;
  }

  .card.canEdit:hover .x {
    display: block;
  }

  .color.red {
    background: red;
  }

  .color.black {
    background: black;
  }

  .color.black .x {
    color: white;
  }

  .color.blue {
    background: blue;
  }

  .color.faded {
    background: lime;
  }

  .eventInfo {
    background: white;
    display: none;
    position: absolute;
    z-index: 2;
    padding: 0 5px;
  }
</style>

{#if card}
  <div class="card" class:canEdit>
    <div class="color {card.color || ''}" class:faded={card.faded}>
      <span class="x">x</span>
    </div>
    <span class="name" on:click={remove}>
      <strong class="header">{card.name || card.eventName}</strong>
      <span>({card.region || 'N/A'})</span>
      <span>{card.eventDescription ? '*' : ''}</span>
    </span>
    {#if card.eventType}
      <span class="eventInfo">
        {#if card.name}
          <span class="eventName">{card.eventName}:</span>
        {/if}
        <span class="eventType">{card.eventType}</span>
        <div class="eventDescription">{card.eventDescription}</div>
      </span>
    {/if}
  </div>
{/if}
