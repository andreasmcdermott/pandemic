<script>
  import game, { updateObjectives } from '../stores/game';
  import Button from './Button.svelte';

  const updateObjective = (values, index) => {
    const objectives = $game.objectives;
    objectives[index] = values;
    updateObjectives(objectives);
  };

  const removeObjective = index => {
    const objectives = $game.objectives;
    objectives.splice(index, 1);
    updateObjectives(objectives);
  };

  const addObjective = () => {
    const objectives = $game.objectives;
    objectives.push({
      completed: false,
      mandatory: false,
      text: 'Objective ' + (objectives.length + 1)
    });
    updateObjectives(objectives);
  };

  const toggleCompleted = index => {
    const objective = $game.objectives[index];
    updateObjective({ ...objective, completed: !objective.completed }, index);
  };

  let editing = null;
  let editingText = null;
  const editObjective = index => {
    editing = index;
    editingText = $game.objectives[index].text;
  };

  const stopEdit = () => {
    editing = null;
    editingText = null;
  };

  const updateText = () => {
    console.log(editingText);
    const objective = $game.objectives[editing];
    updateObjective({ ...objective, text: editingText }, editing);
    stopEdit();
  };
</script>

<style>
  .objectives {
    position: absolute;
    top: 15px;
    left: 25px;
    display: flex;
  }
  .objective {
    background: black;
    color: white;
    border: 1px solid white;
    width: 155px;
    min-height: 110px;
    padding: 5px;
    box-sizing: border-box;
    position: relative;
    font-size: 12px;
    margin-right: 18px;
    overflow: hidden;
  }
  .objective:hover {
    height: auto;
  }
  .objective .text {
    background: black;
    width: 100%;
  }
  .objective .actions {
    display: none;
    margin-top: 10px;
  }
  .objective:hover .actions {
    display: block;
  }
  .objective .mandatory-toggle {
    content: ' ';
    z-index: 2;
    background: black;
    border: 1px solid red;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 0;
    width: 5px;
    height: 5px;
    display: block;
    cursor: pointer;
  }
  .objective.mandatory .mandatory-toggle {
    background: red;
  }
  .objective.completed {
    border-color: lightgreen;
    color: lightgreen;
  }
  .objective.add-new {
    background: white;
    border-color: black;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
</style>

<div class="objectives">
  {#each $game.objectives as objective, i}
    <div
      class="objective"
      class:mandatory={objective.mandatory}
      class:completed={objective.completed}>
      {#if editing === i}
        <textarea bind:value={editingText} />
        <div class="actions">
          <Button on:click={updateText}>Update</Button>
          <Button on:click={stopEdit}>Cancel</Button>
        </div>
      {:else}
        <div class="text">{objective.text}</div>

        <div class="actions">
          <Button on:click={() => toggleCompleted(i)}>
            {objective.completed ? 'In Progress' : 'Complete'}
          </Button>
          <Button on:click={() => editObjective(i)}>Edit</Button>
          <Button on:click={() => removeObjective(i)}>Remove</Button>
        </div>
      {/if}
      <div
        class="mandatory-toggle"
        on:click={() => {
          updateObjective({ ...objective, mandatory: !objective.mandatory }, i);
        }} />
    </div>
  {/each}

  {#if $game.objectives.length < 5}
    <div class="objective add-new">
      <Button on:click={addObjective}>+ Add</Button>
    </div>
  {/if}
</div>
