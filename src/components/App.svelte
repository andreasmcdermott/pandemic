<script>
  import game from "../stores/game";
  import user from "../stores/user";

  import Board from "./Board.svelte";
  import AccountPanel from "./AccountPanel.svelte";
  import AdminPanel from "./AdminPanel.svelte";
  import Loading from "./Loading.svelte";
  import Login from "./Login.svelte";

  $: loading = !$user;
  $: signedOut = $user && !$user.id;
  $: signedIn = $user && $user.id;
  $: adminMode = !!($user && $user.admin);

  let selectedCity = "";
</script>

<style>
  .root {
    position: relative;
    height: 100%;
  }
</style>

<div class="root">
  {#if signedOut}
    <Login />
  {:else if signedIn}
    {#if $game}
      <Board {selectedCity} />
      <AccountPanel />

      {#if adminMode}
        <AdminPanel
          on:selectCity={e => {
            selectedCity = e.detail;
          }} />
      {/if}
    {:else}
      <Loading />
    {/if}
  {:else}
    <Loading />
  {/if}
</div>
