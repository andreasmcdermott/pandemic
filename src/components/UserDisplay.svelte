<script>
  export let color;
  export let name;
</script>

<style>
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .user-color {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
</style>

<div class="user-info">
  <div class="user-color" style="background: {color || 'white'}" />
  {name || 'N/A'}
</div>
