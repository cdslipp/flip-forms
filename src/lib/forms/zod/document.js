// src/lib/forms/zod/document.js
import { z } from 'zod';

export const documentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  docType: z.enum(['Type1', 'Type2', 'Type3']),
  author: z.string().min(1, "Author is required"),
  // Other fields...
});

// Mapping Zod types to form field types
export const fieldTypeMapping = {
  [z.ZodString.name]: 'text',
  [z.ZodEnum.name]: 'select',
  // Add other mappings here
};
