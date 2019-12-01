<script>
  import game, { updateOutbreaks } from '../stores/game';

  const OUTBREAKS = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const getOutbreakPosX = index => 40 + (index % 2) * 40;
  const getOutbreakPosY = index => 240 + index * 28;
</script>

<style>
  .outbreak {
    width: 30px;
    height: 30px;
    position: absolute;
    border-radius: 50px;
    background: purple;
    opacity: 0.25;
    border: 2px solid white;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .outbreak.active {
    cursor: pointer;
    opacity: 1;
  }
  .skull {
    display: block;
    width: 20px;
    height: 20px;
    background: url('/skull.svg') center center;
    background-size: contain;
  }
</style>

<div class="outbreaks">
  {#each OUTBREAKS as o}
    <div class="outbreak" style="left: {getOutbreakPosX(o)}px; top: {getOutbreakPosY(o)}px;">
      {#if o === 8}
        <span class="skull" />
      {:else}{o}{/if}
    </div>
  {/each}
  
  <div
    class="outbreak active"
    style="left: {getOutbreakPosX($game.outbreaks)}px; top: {getOutbreakPosY($game.outbreaks)}px;"
    on:click={() => updateOutbreaks(($game.outbreaks + 1) % OUTBREAKS.length)}>
    {#if $game.outbreaks === 8}
      <span class="skull" />
    {:else}{$game.outbreaks}{/if}
  </div>
</div>
