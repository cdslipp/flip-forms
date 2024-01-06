<script lang="ts">
    import { z } from 'zod';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { documentSchema } from '$lib/forms/zod/document';

    let { data } = $props();

    onMount(() => {
        const fieldOrder = Object.keys(documentSchema.shape);
        console.log(fieldOrder);
        const firstField = fieldOrder[0];
        const firstFieldType = getFieldTypeName(documentSchema.shape[firstField]);
        goto(`/form/${data.action}/${data.type}/${firstFieldType}/${firstField}`);
    });

    function getFieldTypeName(field) {
        // Example logic to determine field type
        if (field instanceof z.ZodString) {
            return 'text';
        } else if (field instanceof z.ZodEnum) {
            return 'select';
        }
        // Add other type checks as needed
        return 'unknown'; // Fallback for unidentified types
    }
</script>

<h1>This is a form</h1>
<p>Loading...</p>