<script>
  import ExpandablePanel from './ExpandablePanel.svelte';
  import Button from './Button.svelte';
  import Accordion from './Accordion.svelte';
  import UserDisplay from './UserDisplay.svelte';
  import PlayerSettings from './PlayerSettings.svelte';
  import OtherPlayers from './OtherPlayers.svelte';
  import LogOut from './LogOut.svelte';

  import user from '../stores/user';
  import player from '../stores/player';
</script>

<style>
  .account {
    background: white;
    padding: 5px;
    font-size: 12px;
    width: 250px;
  }
</style>

{#if $user && $player}
  <ExpandablePanel edge="right" expanded={false}>
    <div class="account">
      <Accordion>
        <div slot="label">
          <UserDisplay color={$player.color} name={$user.name} />
        </div>
        <PlayerSettings />
      </Accordion>
      <OtherPlayers />
      <LogOut />
    </div>
  </ExpandablePanel>
{/if}
