<script>
  import game, {
    toggleCured,
    toggleEradicated,
    clearInfection
  } from "../stores/game";
</script>

<style>
  .infection {
    position: absolute;
    bottom: 25px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
  .infection.red {
    left: 105px;
    background: red;
  }
  .infection.blue {
    left: 190px;
    background: blue;
  }
  .infection.black {
    left: 270px;
    background: black;
  }
  .infection > .cured {
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 25px;
    height: 0;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
  }
  .infection > .cured:after {
    content: " ";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 25px;
    height: 25px;
    border: 2px solid white;
    border-radius: 50%;
  }
  .infection.cured:not(.eradicated) > .cured {
    display: block;
  }
  .infection > .eradicated {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75%;
    height: 75%;
    background: url("/skull.svg") center center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .infection.eradicated > .eradicated {
    display: block;
  }
</style>

{#each ['red', 'blue', 'black'] as infection}
  <div
    class="infection {infection}"
    class:cured={$game.cured[infection]}
    class:eradicated={$game.eradicated[infection]}
    on:click={() => {
      if (!$game.cured[infection] && !$game.eradicated[infection]) {
        toggleCured(infection);
      } else if ($game.cured[infection] && !$game.eradicated[infection]) {
        toggleEradicated(infection);
      } else if ($game.cured[infection] && $game.eradicated[infection]) {
        clearInfection(infection);
      }
    }}>
    <div class="cured" />
    <div class="eradicated" />
  </div>
{/each}
