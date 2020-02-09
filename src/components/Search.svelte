<script>
  import game, { updateSearches } from '../stores/game';
  import Button from './Button.svelte';

  const getPosition = (end, index) => {
    let left = '0px';
    let top = '0px';
    if (index >= 6 && index < 12) {
      top = 35;
      left = 5 + (5 - (index % 6)) * 30;
    } else if (index >= 12) {
      top = 65;
      left = 5 + (index % 6) * 30;
    } else {
      top = 5;
      left = 5 + index * 30;
    }

    return `left: ${left}px; top: ${top}px`;
  };

  const increaseSearch = (searchIndex, clickedIndex) => {
    const searches = $game.searches;
    const search = searches[searchIndex];
    if (search.current === clickedIndex) {
      search.current = (search.current + 1) % search.end;
    } else if (search.target === clickedIndex) {
      search.target = (search.target + 1) % (search.end + 1);
    } else return;

    updateSearches(searches);
  };

  const addNew = () => {
    const end = parseInt(prompt('End index?', '10'), 10);
    if (Number.isNaN(end)) return;
    const target = parseInt(prompt('Target index?', '5'), 10);
    const text = prompt('Text', '');
    updateSearches($game.searches.concat([{ end, current: 0, target, text }]));
  };

  const cards = [
    { count: 0, type: '' },
    { count: 1, type: 'red' },
    { count: 1, type: 'red' },
    { count: 1, type: 'black' },
    { count: 1, type: 'black' },
    { count: 1, type: 'yellow' },
    { count: 1, type: 'yellow' },
    { count: 1, type: 'blue' },
    { count: 1, type: 'blue' },
    { count: 2, type: 'red' },
    { count: 2, type: 'black' },
    { count: 2, type: 'yellow' },
    { count: 2, type: 'blue' },
    { count: 2, type: 'red' },
    { count: 2, type: 'black' },
    { count: 2, type: 'yellow' },
    { count: 2, type: 'blue' },
    { count: 0, type: '' }
  ];
</script>

<style>
  .outer_container {
    position: absolute;
    top: 610px;
    left: 40px;
    min-width: 240px;
    display: flex;
    flex-direction: column;
  }

  .container {
    width: 240px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 12px;
    border: 1px solid white;
    margin-bottom: 10px;
  }

  .dots {
    width: 100%;
    position: relative;
  }

  .dots.two {
    height: 60px;
  }

  .dots.three {
    height: 90px;
  }

  .dot {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid white;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 6px;
  }

  .dot.end {
    color: black;
    border-color: black;
  }

  .dot.target {
    cursor: pointer;
    color: red;
    border-color: red;
  }

  .dot.current {
    cursor: pointer;
    color: blue;
    border-color: blue;
  }

  .dot.oneCard::before,
  .dot.twoCards::before,
  .dot.twoCards::after {
    content: ' ';
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  .dot.color-red::before,
  .dot.color-red::after {
    background: red;
  }

  .dot.color-black::before,
  .dot.color-black::after {
    background: black;
  }

  .dot.color-blue::before,
  .dot.color-blue::after {
    background: blue;
  }

  .dot.color-yellow::before,
  .dot.color-yellow::after {
    background: yellow;
  }

  .text {
    padding: 5px;
    line-height: 10px;
    font-size: 10px;
  }
</style>

<div class="outer_container">
  {#each $game.searches as search, s}
    <div class="container">
      <div class="dots" class:two={search.end <= 12} class:three={search.end > 12}>
        {#each new Array(search.end + 1).fill(null) as _, i}
          <div
            class="dot color-{cards[i].type}"
            class:target={i === search.target}
            class:current={i === search.current}
            class:end={i === search.end}
            class:oneCard={cards[i].count === 1}
            class:twoCards={cards[i].count === 2}
            style={getPosition(search.end, i)}
            on:click={() => increaseSearch(s, i)}>
            {i}
          </div>
        {/each}
      </div>
      <div class="text">{search.text}</div>
    </div>
  {/each}

  <div class="add">
    <Button on:click={addNew}>Add Search</Button>
  </div>
</div>
