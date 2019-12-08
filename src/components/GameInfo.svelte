<script>
  import game from '../stores/game';
  import Container from './Container.svelte';

  const months = [
    ,
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
</script>

<style>
  .row {
    display: flex;
    justify-content: space-between;
  }

  .row strong {
    margin-right: 5px;
  }
</style>

<Container label="Game Info">
  <div class="row">
    <strong>Current month:</strong>
    <span>{months[$game.active_month]}</span>
  </div>
  <div class="row">
    <strong>Completed objectives:</strong>
    <span>{$game.objectives.filter(o => o.completed).length} / {$game.required_objectives}</span>
  </div>
  <div class="row">
    <strong>Current funding:</strong>
    <span>{$game.current_funding}</span>
  </div>
</Container>
