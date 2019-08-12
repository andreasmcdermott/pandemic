<script>
  export let edge = "right";
  export let expanded = false;

  const isRight = edge === "right";
  const isLeft = edge === "left";

  const togglePanel = () => {
    expanded = !expanded;
  };
</script>

<style>
  .expandable {
    position: fixed;
    z-index: 2;
    top: 0;
    border: 4px solid rebeccapurple;
    border-top: none;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
  }

  .expandable.right {
    right: 0;
    border-radius: 0 0 0 3px;
    border-right: none;
    transform: translateX(100%);
  }

  .expandable.left {
    left: 0;
    border-radius: 0 0 3px 0;
    border-left: none;
    transform: translateX(-100%);
  }

  .expandable.expanded {
    transform: none;
  }

  .toggle-expanded {
    width: 20px;
    height: 40px;
    position: absolute;
    top: 10px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rebeccapurple;
    border: none;
    font-weight: bold;
    color: white;
  }

  .expandable.right > .toggle-expanded {
    border-radius: 3px 0 0 3px;
    left: -24px;
  }
  .expandable.left > .toggle-expanded {
    right: -24px;
    border-radius: 0 3px 3px 0;
  }
</style>

<div class="expandable {edge}" class:expanded>
  <button class="toggle-expanded" on:click={togglePanel}>
    {(isRight && expanded) || (isLeft && !expanded) ? '>' : '<'}
  </button>
  <slot />
</div>
