<!-- src/lib/forms/components/Text.svelte -->
<script>
    export let name;
    export let value;
    export let error;
    export let constraints;
  </script>
  
  <label for={name}>{name}</label>
  <input type="text" name={name} bind:value={value} {...constraints} />
  {#if error}<span class="invalid">{error}</span>{/if}
  