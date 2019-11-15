<script>
  import game, { updateInfectionRate } from '../stores/game';
  const INFECTION_RATES = [0, 1, 2, 3, 4, 5, 6];

  const getInfectionPosX = index => 1008 + index * 46.5;
</script>

<style>
  .infectionRate {
    width: 30px;
    height: 30px;
    position: absolute;
    border-radius: 50%;
    background: darkgreen;
    border: 2px solid white;
    top: 158px;
    opacity: 0.25;
  }
  .infectionRate.active {
    cursor: pointer;
    opacity: 1;
  }
</style>

<div class="infectionRates">
  {#each INFECTION_RATES as i}
    <div class="infectionRate" style="left: {getInfectionPosX(i)}px;" />
  {/each}

  <div
    class="infectionRate active"
    style="left: {getInfectionPosX($game.infection_rate)}px;"
    on:click={() => updateInfectionRate(($game.infection_rate + 1) % INFECTION_RATES.length)} />
</div>
