import db from "@/lib/db";
import React from "react";
import JobListItem from "./JobListItem";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

type JobResultsProps = {
    filterValues: JobFilterValues;
};

async function JobResults({
    filterValues: { query, location, remote, type },
}: JobResultsProps) {
    const searchString = query
        ?.split(" ")
        .filter((word) => word.length > 0)
        .join(" & ");

    // The code above will do something like...
    // 1. query input: "nextjs frontend" => "nextjs & frontend"
    // 2. query input: "microsoft     fullstack" => "nextjs & frontend"

    const searchFilter: Prisma.JobWhereInput = searchString
        ? {
              // we use "OR" filter, so that the searh filter will work on any columns that we specify
              OR: [
                  { title: { search: searchString } },
                  { companyName: { search: searchString } },
                  { type: { search: searchString } },
                  { locationType: { search: searchString } },
                  { location: { search: searchString } },
              ],
          }
        : {};

    const whereFilter: Prisma.JobWhereInput = {
        AND: [
            searchFilter,
            type ? { type } : {},
            location ? { location } : {},
            remote ? { locationType: "Remote" } : {},
            { approved: true },
        ],
    };

    const jobs = await db.job.findMany({
        where: whereFilter,
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="grow space-y-4">
            {jobs.map((job) => (
                <JobListItem job={job} key={job.id} />
            ))}
            {jobs.length === 0 && (
                <p className="m-auto text-center">
                    No jobs found. Try adjusting your search filters.
                </p>
            )}
        </div>
    );
}

export default JobResults;
