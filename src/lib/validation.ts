import { z } from "zod";

export const jobFilterSchema = z.object({
    query: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    // the remote from the jobFilter form is a checkbox, which will also send a string by default,
    // well, i want to make it into a boolean, we can use coerce to convert any string into a boolean.
    remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;