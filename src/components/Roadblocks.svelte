<script>
  import game, { setRoadblocks } from '../stores/game';
  import Button from './Button.svelte';

  let adding = false;
  let buttonNode = null;
  let containerNode = null;
</script>

<style>
  .outer-container {
    position: absolute;
    top: 150px;
    left: 40px;
    min-width: 100px;
  }

  .roadblock {
    position: absolute;
    width: 8px;
    height: 8px;
    background: red;
    border: 1px solid black;
    transform: translate(-50%, -50%);
  }
</style>

<div bind:this={containerNode} class="outer-container">
  <Button
    bind:this={buttonNode}
    on:click={() => {
      adding = !adding;
    }}>
    {adding ? 'Cancel' : 'Add'} roadblock
  </Button>
  {#each $game.roadblocks as block}
    <div class="roadblock" style="left: {block.x}px; top:{block.y}px;" />
  {/each}
</div>
<svelte:window
  on:click={e => {
    if (adding && e.target !== buttonNode.node()) {
      if (e.target.classList.contains('roadblock')) {
        setRoadblocks($game.roadblocks.filter(b => {
            if (Math.abs(b.x - (e.clientX + window.scrollX - containerNode.offsetLeft)) < 10 && Math.abs(b.y - (e.clientY + window.scrollY - containerNode.offsetTop)) < 10) {
              return false;
            }
            return true;
          }));
      } else {
        setRoadblocks($game.roadblocks.concat([
            {
              x: e.clientX + window.scrollX - containerNode.offsetLeft,
              y: e.clientY + window.scrollY - containerNode.offsetTop
            }
          ]));
      }
    }
  }} />
