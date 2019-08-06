<script>
  let selectedInfection = "";
</script>

<select
  bind:value={selectedInfection}
  on:change={e => {
    selectedInfection = e.target.value;
  }}>
  <option value="">Select infection</option>
  <option value="yellow">Yellow</option>
  <option value="red">Red</option>
  <option value="blue">Blue</option>
  <option value="black">Black</option>
</select>
