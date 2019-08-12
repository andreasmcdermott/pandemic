<script>
  import user from "../stores/user";

  import Board from "./Board.svelte";
  import AccountPanel from "./AccountPanel.svelte";
  import AdminPanel from "./AdminPanel.svelte";
  import Loading from "./Loading.svelte";
  import Login from "./Login.svelte";

  $: adminMode = $user && $user.admin;

  let selectedCity = "";
</script>

<style>
  .root {
    position: relative;
    height: 100%;
  }
</style>

<div class="root">
  {#if $user && $user.uid}
    <Board {selectedCity} />
    <AccountPanel />

    {#if adminMode}
      <AdminPanel
        on:selectCity={e => {
          selectedCity = e.detail;
        }} />
    {/if}
  {:else if $user === null}
    <Login />
  {:else}
    <Loading />
  {/if}
</div>
