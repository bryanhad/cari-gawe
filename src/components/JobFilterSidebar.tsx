import db from "@/lib/db";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { jobTypes } from "@/lib/job-types";
import { Button } from "./ui/button";
import { jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

async function filterJobs(formData: FormData) {
    "use server";

    const formValues = Object.fromEntries(formData.entries());

    const { location, query, remote, type } = jobFilterSchema.parse(formValues);

    const searchParams = new URLSearchParams({
        // the code below is to ensure to pass the object conditionally.. if the query is defined, then pass the object containing the trimmed query
        ...(query && { query: query.trim() }),
        ...(type && { type }),
        ...(location && { location }),
        ...(remote && { remote: "true" }),
    });

    // Below is what searchParams.toString() result into...
    // "[fieldName]=[value]&[fieldName]=[value]&[fieldName]=[value]&...."
    redirect(`/?${searchParams.toString()}`);
}

async function JobFilterSidebar() {
    const distinctLocations = (await db.job
        .findMany({
            where: { approved: true },
            // specifying the select will prompt prisma to only query the specified column, in this case, we only need the location of the jobs which is more efficient
            select: { location: true },
            distinct: ["location"],
        })
        // the prisma findMany distinct returns an array of objects, we process it further by using then to make it into an array of strings, then we chain it with filter(Boolean) which filter's out null values
        .then((locations) =>
            locations.map(({ location }) => location).filter(Boolean),
        )) as string[];
    // unfortunately, typescript doesn't recognize that we already process the query further, so we have to cast it manualy..

    // h-fit is to set the height of the parent as high as the content! nice!
    return (
        <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
            <form action={filterJobs}>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="query">Search</Label>
                        <Input
                            id="query"
                            name="query"
                            placeholder="Title, company, etc.."
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="types">Types</Label>
                        <Select id="types" defaultValue="" name="types">
                            <option value="">All Types</option>
                            {jobTypes.map((type) => (
                                <option value={type} key={type}>
                                    {type}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Select id="location" defaultValue="" name="location">
                            <option value="">All Location</option>
                            {distinctLocations.map((location) => (
                                <option value={location} key={location}>
                                    {location}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* we can't use width/height for checkbox, we use scale instead */}
                        <input
                            type="checkbox"
                            id="remote"
                            name="remote"
                            value={"oh yes"}
                            className="scale-125 accent-black"
                        />
                        <Label htmlFor="rmeote">Remote Jobs</Label>
                    </div>
                    <Button type="submit" className="w-full">
                        Filter Jobs
                    </Button>
                </div>
            </form>
        </aside>
    );
}

export default JobFilterSidebar;
