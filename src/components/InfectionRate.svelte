<script>
  import game, { updateInfectionRate } from '../stores/game';
  const INFECTION_RATES = [2, 2, 2, 3, 3, 4, 4];

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
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .infectionRate.active {
    cursor: pointer;
    opacity: 1;
  }
</style>

<div class="infectionRates">
  {#each INFECTION_RATES as r, i}
    <div class="infectionRate" style="left: {getInfectionPosX(i)}px;">{r}</div>
  {/each}

  <div
    class="infectionRate active"
    style="left: {getInfectionPosX($game.infection_rate)}px;"
    on:click={() => updateInfectionRate(($game.infection_rate + 1) % INFECTION_RATES.length)}>
    {INFECTION_RATES[$game.infection_rate]}
  </div>
</div>
