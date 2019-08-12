<script>
  import ExpandablePanel from "./ExpandablePanel.svelte";
  import Button from "./Button.svelte";
  import UserDisplay from "./UserDisplay.svelte";
  import PlayerSettings from "./PlayerSettings.svelte";
  import LogOut from "./LogOut.svelte";
</script>

<style>
  .account {
    background: white;
    padding: 5px;
    font-size: 12px;
    min-width: 100px;
  }
</style>

<ExpandablePanel edge="right" expanded={true}>
  <div class="account">
    <UserDisplay />
    <PlayerSettings />
    <LogOut />
  </div>
</ExpandablePanel>
