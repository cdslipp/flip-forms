<script lang="ts">
  //forms/[action]/[type]/[fieldType]/[fieldName]/+page.svelte
  import { superForm } from 'sveltekit-superforms/client';
  import type { PageData } from './$types';
  import Text from '$lib/forms/components/Text.svelte';
  import Select from '$lib/forms/components/Select.svelte';
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
  import { documentSchema } from '$lib/forms/zod/document';
  

  export let data: PageData;
  const { form, errors, constraints, submitForm } = superForm(data.form);

  function isValidField(fieldType, fieldName) {
      // Define valid type mappings
      const validTypes = {
          title: 'text',
          docType: 'select',
          author: 'text'
          // ... other fields
      };
      return validTypes[fieldName] === fieldType;
  }

  const fieldOrder = Object.keys(documentSchema.shape);
  const currentFieldIndex = fieldOrder.indexOf(data.fieldName);
  const nextFieldName = fieldOrder[currentFieldIndex + 1];

  async function handleSubmit() {
    const result = await submitForm();
    if (result.valid) {
      if (nextFieldName) {
        goto(`/form/${data.action}/${data.type}/text/${nextFieldName}`);
      } else {
        // Handle form completion, e.g., redirect to a summary or success page
      }
    }
  }

  // Function to handle Enter key press
  function handleKeydown(event) {
    if (event.key === 'Enter') {
      event.target.form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  }

onMount(() => {
  // Add keydown event listener
  window.addEventListener('keydown', handleKeydown);
});

// Cleanup event listener on component destruction
onDestroy(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<SuperDebug data={$form} />

<form method="POST">
  {#if isValidField(data.fieldType, data.fieldName)}
      {#if data.fieldType === 'text'}
          <Text
              name={data.fieldName}
              bind:value={$form[data.fieldName]}
              error={$errors[data.fieldName]}
              constraints={$constraints[data.fieldName]}
          />
      {:else if data.fieldType === 'select'}
          <Select
              name={data.fieldName}
              bind:value={$form[data.fieldName]}
              options={['Type1', 'Type2', 'Type3']}
              error={$errors[data.fieldName]}
          />
      {/if}
  {:else}
      <p>Error: Invalid field type for the given field name.</p>
  {/if}
  <button type="submit">Next</button>
</form>

<style>
  .invalid {
      color: red;
  }
</style>