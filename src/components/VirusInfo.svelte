<script>
  import game from '../stores/game';
  import cities from '../stores/cities';
  import Container from './Container.svelte';

  $: yellow = $cities.reduce((acc, city) => acc + city.infections.yellow, 0);
  $: red = $cities.reduce((acc, city) => acc + city.infections.red, 0);
  $: blue = $cities.reduce((acc, city) => acc + city.infections.blue, 0);
  $: black = $cities.reduce((acc, city) => acc + city.infections.black, 0);

  const warnLimit = 5;
  const maxCubes = 24;
  const maxFaded = 38;
</script>

<style>
  .row {
    display: flex;
    justify-content: space-between;
  }

  .row.warn {
    color: red;
  }

  .row strong {
    margin-right: 5px;
  }
</style>

<Container label="Viruses">
  <div class="row" class:warn={maxFaded - yellow <= warnLimit}>
    <strong>Yellow:</strong>
    <span>{yellow} / {maxFaded}</span>
  </div>
  <div class="row" class:warn={maxCubes - red <= warnLimit}>
    <strong>Red:</strong>
    <span>{red} / {maxCubes}</span>
  </div>
  <div class="row" class:warn={maxCubes - blue <= warnLimit}>
    <strong>Blue</strong>
    <span>{blue} / {maxCubes}</span>
  </div>
  <div class="row" class:warn={maxCubes - black <= warnLimit}>
    <strong>Black</strong>
    <span>{black} / {maxCubes}</span>
  </div>
</Container>
