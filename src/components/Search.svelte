<script>
  let current = 0;
  let target = 8;
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
</script>

<style>
  .container {
    position: absolute;
    bottom: 170px;
    left: 40px;
    width: 175px;
    height: 55px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 12px;
    border: 1px solid white;
    padding: 5px;
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
</style>

<div class="container">
  {#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as i}
    <div
      class="dot"
      class:target={i === target}
      class:current={i === current}
      class:end={i === end}
      style={getPosition(i)}>
      {i}
    </div>
  {/each}
</div>
