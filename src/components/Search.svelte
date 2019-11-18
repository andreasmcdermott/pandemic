<script>
  import game, { updateSearches } from '../stores/game';
  const end = 11;

  const getPosition = index => {
    let left = '0px';
    let top = '0px';

    if (index > 5) {
      top = 35;
      left = 5 + (11 - index) * 30;
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
      search.current = (search.current + 1) % end;
    } else if (search.target === clickedIndex) {
      search.target = (search.target + 1) % (end + 1);
    } else return;

    updateSearches(searches);
  };
</script>

<style>
  .outer_container {
    position: absolute;
    top: 610px;
    left: 40px;
    display: flex;
    flex-direction: column;
  }

  .container {
    width: 180px;
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
        {#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as i}
          <div
            class="dot"
            class:target={i === search.target}
            class:current={i === search.current}
            class:end={i === end}
            style={getPosition(i)}
            on:click={() => increaseSearch(s, i)}>
            {i}
          </div>
        {/each}
      </div>
      <div class="text">{search.text}</div>
    </div>
  {/each}
</div>
