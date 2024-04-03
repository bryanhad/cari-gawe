import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().min(1, "Required");
// only allow string that is a number
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

// a workaround with zod to validate a file in zod!
const companyLogoSchema = z
    .custom<File | undefined>()
    .refine((input) => {
        return (
            !input || (input instanceof File && input.type.startsWith("image/"))
        );
    }, "Please select an image file")
    .refine((input) => {
        // if input is not provided, is okey..
        // if it is provided, must be less than 2 MB
        return !input || input.size < 1024 * 1024 * 2;
    }, "File must less than 2MB");

const applicationSchema = z
    .object({
        // the or(z.literal('')) is neccessary so that our schema will allow an empty string.
        // cuz if we only use .email().optional(), an empty string won't pass.
        applicationEmail: z
            .string()
            .max(100)
            .email()
            .optional()
            .or(z.literal("")),
        applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
    })
    .refine((data) => data.applicationEmail || data.applicationUrl, {
        // using an object makes us to be able to customize more granularly.
        // now the error message will only show to the applicationEmail field.
        message: "Email or url is required",
        path: ["applicationEmail"],
    });

const locationSchema = z
    .object({
        locationType: requiredString.refine(
            (input) => locationTypes.includes(input),
            "Invalid location type",
        ),
        location: z.string().max(100).optional(),
    })
    .refine(
        (data) => {
            if (!data.locationType || data.locationType === "Remote") {
                return true;
            } else {
                return data.location;
            }
        },
        {
            message: "Location is required for on-site and hybrid jobs",
            path: ["location"],
        },
    );

export const jobFilterSchema = z.object({
    query: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    // the remote from the jobFilter form is a checkbox, which will also send a string by default,
    // well, i want to make it into a boolean, we can use coerce to convert any string into a boolean.
    remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;

export const createJobSchema = z
    .object({
        title: requiredString.max(100),
        // We can use enum, but it seems it is hard to customize enum error message. So we use refine and use our defined array of jobTypes
        type: requiredString.refine(
            (input) => jobTypes.includes(input),
            "Invalid Job Type",
        ),
        companyName: requiredString,
        companyLogo: companyLogoSchema,
        description: z.string().max(5000).optional(),
        salary: numericRequiredString.max(
            9,
            `Number can't be longer than 9 digits`,
        ),
    })
    .and(applicationSchema)
    .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;
