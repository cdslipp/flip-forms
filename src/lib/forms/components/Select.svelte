<!-- src/lib/forms/components/Select.svelte -->
<script>
  import {
    createCombobox,
    melt,
  } from '@melt-ui/svelte';
  import { fly } from 'svelte/transition';

  export let name;
  export let value;
  export let options = [];
  export let error;

  // Transform options into the format expected by Melt UI Combobox
  const transformedOptions = options.map(option => ({
    value: option,
    label: option,
  }));

  const {
    elements: { menu, input, option, label },
    states: { open, selected },
    helpers: { isSelected },
  } = createCombobox({
    forceVisible: true,
  });

  $: if (!$open && $selected) {
    value = $selected.label;
  }
</script>

<div class="combobox-container">
  <label class="combobox-label" use:melt={$label}>{name}</label>
  <div class="relative">
    <input use:melt={$input} bind:value={value} class=combobox-input/>
    {#if $open}
      <ul class="combobox-menu" use:melt={$menu} transition:fly={{ duration: 150, y: -5 }}>
        {#each transformedOptions as option}
          <li
            use:melt={$option(option)}
            class="combobox-option {($isSelected(option.value) ? 'selected' : '')}">
            {option.label}
          </li>
        {:else}
          <li class="combobox-option">No results found</li>
        {/each}
      </ul>
    {/if}
  </div>
  {#if error}<span class="invalid">{error}</span>{/if}
</div>

<style>
  .combobox-container {
    display: flex;
    flex-direction: column;
    gap: 8px; /* Equivalent to Tailwind's gap-1 */
  }

  .combobox-label {
    font-size: 0.875rem; /* Equivalent to Tailwind's text-sm */
    font-weight: 500; /* Equivalent to Tailwind's font-medium */
    color: #793a15; /* Custom color from Tailwind's magnum-900 */
  }

  .combobox-input {
    display: flex;
    height: 2.5rem; /* Equivalent to Tailwind's h-10 */
    align-items: center;
    justify-content: space-between;
    border-radius: 0.5rem; /* Equivalent to Tailwind's rounded-lg */
    background-color: white;
    padding: 0 1rem; /* Equivalent to Tailwind's px-3 pr-12 */
    color: black;
    border: 1px solid #d1d5db; /* Light grey border */
  }

  .combobox-input:focus {
    outline: none;
    border-color: #f38d1c; /* Focus border color */
  }

  .combobox-menu {
    position: absolute;
    z-index: 10;
    max-height: 300px;
    overflow: hidden;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); /* Tailwind's shadow */
  }

  .combobox-option {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem; /* Equivalent to Tailwind's rounded-md */
  }

  .combobox-option:hover {
    background-color: #fef2d6; /* Equivalent to Tailwind's bg-magnum-100 */
  }

  .combobox-option[data-highlighted] {
    background-color: #fce0ac; /* Equivalent to Tailwind's bg-magnum-200 */
    color: #793a15; /* Equivalent to Tailwind's text-magnum-900 */
  }

  .combobox-option[data-disabled] {
    opacity: 0.5;
  }

  .invalid {
    color: red;
  }
</style>