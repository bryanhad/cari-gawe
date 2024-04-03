import { Metadata } from "next";
import JobForm from "./JobForm";
import H1 from "@/components/ui/h1";
import { Form } from "@/components/ui/form";

export const metadata: Metadata = {
    title: "Post a new job",
};

function CreateJobPage() {
    return (
        <main className="m-auto my-10 max-w-3xl space-y-10">
            <div className="space-y-5 text-center">
                <H1>Find your perfect candidate</H1>
                <p className="text-muted-foreground">
                    Get your job posting seed by thousands of job seekers
                </p>
            </div>
            <div className="space-y-6 rounded-lg border p-4">
                <div>
                    <h2 className="font-semibold">Job details</h2>
                    <p className="text-muted-foreground">
                        Provide a job description and details
                    </p>
                </div>
 
            <JobForm />
            </div>
        </main>
    );
}

export default CreateJobPage;
