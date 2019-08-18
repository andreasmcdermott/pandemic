<script>
  import ExpandablePanel from "./ExpandablePanel.svelte";
  import Button from "./Button.svelte";
  import UserDisplay from "./UserDisplay.svelte";
  import PlayerSettings from "./PlayerSettings.svelte";
  import OtherPlayers from "./OtherPlayers.svelte";
  import LogOut from "./LogOut.svelte";

  import user from "../stores/user";
  import player from "../stores/player";
</script>

<style>
  .account {
    background: white;
    padding: 5px;
    font-size: 12px;
    min-width: 100px;
  }
</style>

{#if $user && $player}
  <ExpandablePanel edge="right" expanded={true}>
    <div class="account">
      <UserDisplay color={$player.color} name={$user.name} />
      <PlayerSettings />
      <OtherPlayers />
      <LogOut />
    </div>
  </ExpandablePanel>
{/if}
