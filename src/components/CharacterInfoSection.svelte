<script>
  export let traits;
  export let header;
</script>

<style>
  .section:not(:last-child) {
    padding-bottom: 10px;
  }

  .header {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: normal;
  }

  .trait {
    position: relative;
    padding: 2px 0;
  }

  .extra {
    display: none;
    position: absolute;
    z-index: 4;
    background: white;
    padding: 0 5px;
  }

  .trait:hover .extra {
    display: inline;
  }
</style>

<div class="section">
  <strong class="header">{header}</strong>
  <div class="traits">
    {#each traits || [] as trait}
      <div class="trait">
        {#if trait.indexOf('|') > 0}
          <strong>{trait.split('|')[0].trim()}</strong>
          <span class="extra">{trait.split('|')[1].trim()}</span>
        {:else}
          <span>{trait}</span>
        {/if}
      </div>
    {/each}
  </div>
</div>
