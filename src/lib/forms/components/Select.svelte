<!-- src/lib/forms/components/Select.svelte -->
<script>
    export let name;
    export let value;
    export let options = [];
    export let error;
  </script>
  
  <label for={name}>{name}</label>
  <select name={name} bind:value={value}>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
  {#if error}<span class="invalid">{error}</span>{/if}
  