<script>
  import user, { signin, signout } from "./user-store";
  import Board from "./Board.svelte";

  let email = window.localStorage.getItem("email") || "";
  let password = "";

  let expandAccount = false;
  let adminMode = true;
</script>

<style>
  .root {
    position: relative;
    height: 100%;
  }

  .form-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form {
    background: white;
    padding: 25px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .account {
    position: absolute;
    background: white;
    padding: 5px;
    font-size: 12px;
    min-width: 100px;
    top: 0;
    left: 100%;
  }

  .account.expanded {
    right: 0;
    left: auto;
  }

  .toggleAccount {
    position: absolute;
    left: -20px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    padding: 0;
    text-align: center;
  }

  .sign-out {
    font-size: 10px;
  }
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    color: white;
    height: 100%;
  }
</style>

<div class="root">
  {#if $user && $user.uid}
    <Board {adminMode} />
    <div class="account" class:expanded={expandAccount}>
      <button
        class="toggleAccount"
        on:click={() => {
          expandAccount = !expandAccount;
        }}>
        {expandAccount ? '>' : '<'}
      </button>
      {$user.name}
      <label class="admin-mode">
        <input type="checkbox" bind:checked={adminMode} />
        Admin mode
      </label>
      <button class="sign-out" on:click={signout}>Sign out</button>
    </div>
  {:else if $user === null}
    <div class="form-container">
      <form
        on:submit|preventDefault={() => {
          signin(email, password, () => {
            password = '';
          });
        }}>
        <label>Email</label>
        <input
          type="email"
          bind:value={email}
          on:change={() => {
            window.localStorage.setItem('email', email);
          }} />
        <label>Password</label>
        <input type="password" bind:value={password} />
        <button type="submit">Sign in</button>
      </form>
    </div>
  {:else}
    <div class="loading">Loading...</div>
  {/if}
</div>
