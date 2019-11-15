<script>
  import game, { toggleCured, toggleEradicated, clearInfection } from '../stores/game';
</script>

<style>
  .infection-background {
    position: absolute;
    display: flex;
  }
  .infection {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    bottom: 125px;
    width: 80px;
    height: 100px;
    border: 2px solid transparent;
    border-top-width: 6px;
    padding-bottom: 10px;
  }
  .infection.red {
    left: 50px;
    border-color: red;
    background-color: rgba(255, 0, 0, 0.1);
  }
  .infection.blue {
    left: 150px;
    border-color: blue;
    background-color: rgba(0, 0, 255, 0.1);
  }
  .infection.black {
    left: 250px;
    border-color: black;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .display {
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid white;
  }
  .infection.red > .display {
    background: red;
  }
  .infection.blue > .display {
    background: blue;
  }
  .infection.black > .display {
    background: black;
  }
  .display > .cured {
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
  .display > .cured:after {
    content: ' ';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 25px;
    height: 25px;
    border: 2px solid white;
    border-radius: 50%;
  }
  .display.cured:not(.eradicated) > .cured {
    display: block;
  }
  .display > .eradicated {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75%;
    height: 75%;
    background: url('/skull.svg') center center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .display.eradicated > .eradicated {
    display: block;
  }
</style>

{#each ['red', 'blue', 'black'] as infection}
  <div class="infection-background">
    <div class="infection {infection}">
      <div
        class="display"
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
    </div>
  </div>
{/each}
