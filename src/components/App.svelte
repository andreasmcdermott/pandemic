<script>
  import game from '../stores/game';
  import user from '../stores/user';

  import Board from './Board.svelte';
  import AccountPanel from './AccountPanel.svelte';
  import AdminPanel from './AdminPanel.svelte';
  import Loading from './Loading.svelte';
  import Login from './Login.svelte';

  $: loading = !$user;
  $: signedOut = $user && !$user.id;
  $: signedIn = $user && $user.id;
  $: adminMode = !!($user && $user.admin);

  let selectedCity = '';
  let expandAdmin = false;

  $: {
    if (!expandAdmin && !!selectedCity) {
      selectedCity = '';
    }
  }

  const selectCity = e => {
    selectedCity = e.detail;
    expandAdmin = true;
  };

  const unselectCity = () => {
    selectedCity = '';
    expandAdmin = false;
  };
</script>

<style>
  .root {
    position: relative;
    height: 100%;
    background: #fafafa;
  }
</style>

<div class="root">
  {#if signedOut}
    <Login />
  {:else if signedIn}
    {#if $game}
      <Board bind:selectedCity on:selectCity={selectCity} on:unselectCity={unselectCity} />
      <AccountPanel />

      {#if adminMode}
        <AdminPanel {selectedCity} bind:expanded={expandAdmin} />
      {/if}
    {:else}
      <Loading />
    {/if}
  {:else}
    <Loading />
  {/if}
</div>
