<script>
  import user from "../stores/user";
  import player from "../stores/player";
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

{#if $user && $player}
  <div class="user-info">
    <div class="user-color" style="background: {$player.color}" />
    {$user.name}
  </div>
{/if}
