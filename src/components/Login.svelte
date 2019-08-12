<script>
  import { signin } from "../stores/user";

  let email = window.localStorage.getItem("email") || "";
  let password = "";
</script>

<style>
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
</style>

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
