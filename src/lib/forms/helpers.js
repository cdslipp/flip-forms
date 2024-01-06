// src/lib/forms/helpers.js
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { documentSchema, fieldTypeMapping } from '$lib/forms/zod/document';

export function createSubsetSchema(routeParams, fullSchema) {
    const fields = routeParams.field.split('/');
    let subsetSchemaFields = {};

    fields.forEach(f => {
        if (fullSchema.shape[f]) {
            subsetSchemaFields[f] = fullSchema.shape[f];
        }
    });

    if (Object.keys(subsetSchemaFields).length === 0) {
        throw error(404, 'No valid fields found for form schema');
    }

    return z.object(subsetSchemaFields);
}

export function getNextFieldUrl(currentFieldName, action, type) {
    const fieldOrder = Object.keys(documentSchema.shape);
    const currentFieldIndex = fieldOrder.indexOf(currentFieldName);
    const nextFieldName = fieldOrder[currentFieldIndex + 1];

    if (!nextFieldName) {
        return null; // No more fields
    }

    // Determine the field type of the next field
    const nextFieldSchema = documentSchema.shape[nextFieldName];
    const nextFieldType = fieldTypeMapping[nextFieldSchema.constructor.name] || 'unknown';

    // Construct and return the URL for the next field
    return `/form/${action}/${type}/${nextFieldType}/${nextFieldName}`;
}