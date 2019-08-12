<script>
  import { signout } from "../stores/user";
  import Button from "./Button.svelte";
</script>

<Button on:click={signout}>Sign Out</Button>
