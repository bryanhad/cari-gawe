import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobListItem from "@/components/JobListItem";
import db from "@/lib/db";

async function HomePage() {
    const jobs = await db.job.findMany({
        where: { approved: true },
    });
    return (
        <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
            <div className="space-y-5 text-center">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Developer Jobs</h1>
                <p className="text-muted-foreground">Find your dream job.</p>
            </div>
            <section className="flex flex-col md:flex-row gap-4">
              <JobFilterSidebar/>
                <div className="space-y-4 grow">
                    {jobs.map((job) => (
                        <JobListItem job={job} key={job.id} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default HomePage;
