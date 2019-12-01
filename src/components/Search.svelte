<script>
  import game, { updateSearches } from '../stores/game';
  import Button from './Button.svelte';

  const getPosition = (end, index) => {
    let left = '0px';
    let top = '0px';
    const half = end / 2;
    if (index > half) {
      top = 35;
      left = 5 + (end - index) * 30;
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
    const text = prompt('Text', '');
    updateSearches($game.searches.concat([{ end, current: 0, target: 5, text }]));
  };
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
    height: 60px;
    position: relative;
  }

  .dot {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
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

  .text {
    padding: 5px;
    line-height: 10px;
    font-size: 10px;
  }
</style>

<div class="outer_container">
  {#each $game.searches as search, s}
    <div class="container">
      <div class="dots">
        {#each new Array(search.end + 1).fill(null) as _, i}
          <div
            class="dot"
            class:target={i === search.target}
            class:current={i === search.current}
            class:end={i === search.end}
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
