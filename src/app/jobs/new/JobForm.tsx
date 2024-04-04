"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CreateJobValues, createJobSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { Button } from "@/components/ui/button";
import LocationInput from "@/components/LocationInput";
import { XIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import LoadingButton from "@/components/LoadingButton";

function JobForm() {
    const form = useForm<CreateJobValues>({
        resolver: zodResolver(createJobSchema),
        defaultValues: {
            title: "",
            type: "",
            companyName: "",
            locationType: "",
        },
    });

    const {
        handleSubmit,
        watch,
        trigger,
        control,
        setValue,
        setFocus,
        formState: { isSubmitting },
    } = form;

    async function onSubmit(values: CreateJobValues) {
        // console.log("first");
        alert(JSON.stringify(values, null, 2));
    }

    return (
        <Form {...form}>
            {/* noValidate will disable browser's native validation, cuz we want to use our own JS based valdiation dammit! */}
            <form
                className="space-y-4"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormField
                    control={control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. Tukang Bakso"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="type"
                    render={({ field: { value, ...restOfFieldValues } }) => (
                        <FormItem>
                            <FormLabel>Job Type</FormLabel>
                            <FormControl>
                                <Select
                                    {...restOfFieldValues}
                                    defaultValue={""}
                                >
                                    <option value={""} hidden>
                                        Select job type
                                    </option>
                                    {jobTypes.map((jobType) => (
                                        <option key={jobType} value={jobType}>
                                            {jobType}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="companyLogo"
                    // we have to seperate the value field on the field obj, cuz you cannot assign value to an input with "file" type!
                    render={({ field: { value, ...restOfFieldValues } }) => (
                        <FormItem>
                            <FormLabel>Company Logo</FormLabel>
                            <FormControl>
                                <Input
                                    {...restOfFieldValues}
                                    type="file"
                                    accept="image/*"
                                    // we have to make some adjustments to our onChange, cuz by default input with "file" type will return a FileList, but our schema expects a File type, so we just have to give the schema a File type instead.
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        restOfFieldValues.onChange(file);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="locationType"
                    render={({
                        field: {
                            value,
                            onChange: fieldOnChange,
                            ...restOfFieldValues
                        },
                    }) => (
                        <FormItem>
                            <FormLabel>Location Type</FormLabel>
                            <FormControl>
                                <Select
                                    {...restOfFieldValues}
                                    defaultValue={""}
                                    onChange={(e) => {
                                        fieldOnChange(e);
                                        trigger("location");
                                    }}
                                >
                                    <option value={""} hidden>
                                        Select location type
                                    </option>
                                    {locationTypes.map((locationType) => (
                                        <option
                                            key={locationType}
                                            value={locationType}
                                        >
                                            {locationType}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Office Location</FormLabel>
                            <FormControl>
                                <LocationInput
                                    // here, we handle the onChange of our react-hook-form our self, so that the onChange would be called when the onLocationSelected is called in our custom LocationInput compoennt
                                    ref={field.ref}
                                    onLocationSelected={(location) =>
                                        field.onChange(location)
                                    }
                                />
                            </FormControl>
                            {watch("location") && (
                                <div className="flex max-w-max items-center gap-1 rounded-md border p-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setValue("location", "", {
                                                shouldValidate: true,
                                            })
                                        }
                                    >
                                        <XIcon size={20} />
                                    </button>
                                    <span className="text-sm">
                                        {watch("location")}
                                    </span>
                                </div>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-y-2">
                    <Label htmlFor="applicationEmail">How to apply</Label>
                    <div className="flex justify-between">
                        <FormField
                            control={control}
                            name="applicationEmail"
                            render={({ field }) => {
                                return (
                                    <FormItem className="grow">
                                        <FormControl>
                                            <div className="flex items-center">
                                                <Input
                                                    id="applicationEmail"
                                                    placeholder="Email"
                                                    type="email"
                                                    {...field}
                                                />
                                                <span className="mx-2">
                                                    or{" "}
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={control}
                            name="applicationUrl"
                            render={({ field }) => {
                                return (
                                    <FormItem className="grow">
                                        <FormControl>
                                            <Input
                                                placeholder="Website url"
                                                type="url"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    // trigger is one of the method that our form from ReactHookForm gave us
                                                    trigger("applicationEmail");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                </div>
                <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <Label
                                // The Editor from wysiwyg doesn't support the ID attribute, so we have to do some workaround to achieve focus on label click.. with this onclick trick!
                                onClick={() => {
                                    // this setFocus also uses the ref that we pass to the component below! so it is important to pass a the field.ref if you want react-hook-form to work properly.
                                    setFocus("description");
                                }}
                            >
                                Description
                            </Label>
                            <FormControl>
                                <RichTextEditor
                                    onChange={(draft) =>
                                        field.onChange(draftToMarkdown(draft))
                                    }
                                    // note: ref is neccessary in using react-hook-form, so that whenever ther's a validation error, react-hook-form can automatically focus on that input!
                                    ref={field.ref}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="salary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Salary</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton type="submit" loading={isSubmitting}>
                    Submit Job
                </LoadingButton>
            </form>
        </Form>
    );
}

export default JobForm;
