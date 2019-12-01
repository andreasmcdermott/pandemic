<script>
  import Card from './Card.svelte';
  export let player;
</script>

{#if player && player.cards}
  {#each player.cards as c}
    <Card bind:card={c} />
  {/each}
{/if}
