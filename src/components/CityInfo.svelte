<script>
  import Container from './Container.svelte';
  import Button from './Button.svelte';
  import { updatePlayerCity } from '../stores/player';
  import { updateCity } from '../stores/cities';

  export let city;

  const panicLevels = ['None', 'Unstable', 'Rioting', 'Rioting', 'Collapsing', 'Fallen'];
</script>

<style>
  .buttons {
    margin-top: 10px;
  }

  .row {
    display: flex;
    justify-content: space-between;
  }

  .row strong {
    margin-right: 5px;
  }

  .action {
    cursor: pointer;
  }
</style>

<Container label={city.name}>
  <div class="row">
    <strong>Region:</strong>
    {city.region}
  </div>
  <div class="row">
    <strong>Color:</strong>
    {city.color}
  </div>
  <div class="row">
    <strong>Quarantine:</strong>
    <span
      class="action"
      on:click={() => {
        updateCity(city.id, { quarantine: !city.quarantine });
      }}>
      {city.quarantine}
    </span>
  </div>
  <div class="row">
    <strong>Vaccinated:</strong>
    <span
      class="action"
      on:click={() => {
        updateCity(city.id, { vaccinated: !city.vaccinated });
      }}>
      {!!city.vaccinated}
    </span>
  </div>
  <div class="row">
    <strong>Research Station:</strong>
    <span
      class="action"
      on:click={() => {
        updateCity(city.id, { researchStation: !city.researchStation });
      }}>
      {city.researchStation}
    </span>
  </div>
  <div class="row">
    <strong>Vaccine Factory:</strong>
    <span
      class="action"
      on:click={() => {
        updateCity(city.id, {
          vaccineFactory: !city.vaccineFactory,
          vaccineDoses: city.vaccineFactory || 0
        });
      }}>
      {!!city.vaccineFactory}
    </span>
  </div>
  {#if city.vaccineFactory}
    <div class="row">
      <strong>Vaccine Doses:</strong>
      <span>{city.vaccineDoses || 0}</span>
    </div>
    <div class="row">
      <Button
        size="small"
        on:click={() => {
          updateCity(city.id, { vaccineDoses: Math.max((city.vaccineDoses || 0) - 1, 0) });
        }}>
        -
      </Button>
      <Button
        size="small"
        on:click={() => {
          updateCity(city.id, { vaccineDoses: (city.vaccineDoses || 0) + 1 });
        }}>
        +
      </Button>
    </div>
  {/if}
  <div class="row">
    <strong>Military Base:</strong>
    <span
      class="action"
      on:click={() => {
        updateCity(city.id, { militaryBase: !city.militaryBase });
      }}>
      {city.militaryBase}
    </span>
  </div>
  <div class="row">
    <strong>Panic Level:</strong>
    <span class="action" on:click={() => updateCity(city.id, { panic: (city.panic + 1) % 6 })}>
      {panicLevels[city.panic]} ({city.panic})
    </span>
  </div>
  <div class="row">
    <strong>Yellow Infection:</strong>
    <span
      class="action"
      on:click={() => updateCity(city.id, {
          infections: { ...city.infections, yellow: (city.infections.yellow + 1) % 4 }
        })}>
      {city.infections.yellow}
    </span>
  </div>
  <div class="row">
    <strong>Red Infection:</strong>
    <span
      class="action"
      on:click={() => updateCity(city.id, {
          infections: { ...city.infections, red: (city.infections.red + 1) % 4 }
        })}>
      {city.infections.red}
    </span>
  </div>
  <div class="row">
    <strong>Blue Infection:</strong>
    <span
      class="action"
      on:click={() => updateCity(city.id, {
          infections: { ...city.infections, blue: (city.infections.blue + 1) % 4 }
        })}>
      {city.infections.blue}
    </span>
  </div>
  <div class="row">
    <strong>Black Infection:</strong>
    <span
      class="action"
      on:click={() => updateCity(city.id, {
          infections: { ...city.infections, black: (city.infections.black + 1) % 4 }
        })}>
      {city.infections.black}
    </span>
  </div>
  <div class="buttons">
    <Button on:click={() => updatePlayerCity(city.id)}>Move here</Button>
  </div>
</Container>
