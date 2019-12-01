<script>
  import cities from '../stores/cities';
  import cards from '../stores/cards';

  export let card;

  let city = null;
  let cardObject = null;

  $: {
    city = $cities.find(c => c.id === card) || {};
    cardObject = $cards.find(c => c.id === card) || {};
  }
</script>

<style>
  .card {
    position: relative;
    font-size: 8px;
    line-height: 12px;
  }

  .card:hover .eventInfo {
    display: inline;
  }

  .card .name {
    margin-left: 20px;
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
    display: block;
    left: 0;
    top: 0;
    background: white;
  }

  .color.red {
    background: red;
  }

  .color.black {
    background: black;
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

<div class="card">
  <div class="color {city.color}" class:faded={city.faded} />
  <span class="name">
    <strong class="header">{city.name || cardObject.eventName}</strong>
    <span>({city.region || 'N/A'})</span>
    <span>{cardObject.eventDescription ? '*' : ''}</span>
  </span>
  {#if cardObject.eventType}
    <span class="eventInfo">
      {#if city.name}
        <span class="eventName">{cardObject.eventName}:</span>
      {/if}
      <span class="eventType">{cardObject.eventType}</span>
      <div class="eventDescription">{cardObject.eventDescription}</div>
    </span>
  {/if}
</div>
