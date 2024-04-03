import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

// to get the search params of a page we can access it from the searchParams prop that is available to every server component page in nextjs
type HomePageProps = {
    searchParams: {
        query?: string;
        type?: string;
        location?: string;
        remote?: string;
    };
};

function getTitle({ query, type, location, remote }: JobFilterValues) {
    const titlePrefix = query
        ? `${query} jobs`
        : type
          ? `${type} jobs`
          : remote
            ? `Remote jobs`
            : "All Jobs";

    const titleSuffix = location ? ` in ${location}` : "";
    return titlePrefix + titleSuffix;
}

export function generateMetadata({
    searchParams: {query, location, remote, type}
}:HomePageProps):Metadata {
    return {
        // Since template metadata title only works for child pages, we have to add the template manually
        title: `${getTitle({
            query,
            type,
            location,
            // we convert the remote into a boolean by using a deep equal operator since the remote query only can be either "true" or undefined
            remote: remote === "true",
        })} | Cari Gawe`
    }
}

function HomePage({
    searchParams: { query, location, type, remote },
}: HomePageProps) {
    const filterValues: JobFilterValues = {
        query,
        type,
        location,
        // we convert the remote into a boolean by using a deep equal operator since the remote query only can be either "true" or undefined
        remote: remote === "true",
    };

    return (
        <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
            <div className="space-y-5 text-center">
                <H1>{getTitle(filterValues)}</H1>
                <p className="text-muted-foreground">Find your dream job.</p>
            </div>
            <section className="flex flex-col gap-4 md:flex-row">
                <JobFilterSidebar defaultFilterValues={filterValues} />
                <JobResults filterValues={filterValues} />
            </section>
        </main>
    );
}

export default HomePage;
