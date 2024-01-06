//forms/[action]/[type]/[fieldType]/[fieldName]/+page.server.js

import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { documentSchema } from '$lib/forms/zod/document';
import { createSubsetSchema, getNextFieldUrl } from '$lib/forms/helpers';

export async function load({ params }) {
    const { action, type, fieldType, fieldName } = params;

    // Use the helper function to create the subset schema
    const subsetSchema = createSubsetSchema({ field: fieldName }, documentSchema);

    const form = await superValidate(subsetSchema);
    return { action, type, fieldType, fieldName, form };
};

export const actions = {
    default: async ({ request, params }) => {
        const { fieldName } = params;

        // Use the helper function to create the subset schema
        const subsetSchema = createSubsetSchema({ field: fieldName }, documentSchema);

        const form = await superValidate(request, subsetSchema);
        console.log('POST', form);

        if (!form.valid) {
            return fail(400, { form });
        }
        // Get the URL for the next field
        const nextFieldUrl = getNextFieldUrl(params.fieldName, params.action, params.type);

        if (nextFieldUrl) {
            // Redirect to the next field
            throw redirect(302, nextFieldUrl);
        } else {
            // Handle completion of the form
            // Redirect to a summary or success page
        }

        return { form };
    }
};