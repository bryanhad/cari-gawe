'use server'

import db from "./db"
import { toSlug } from "./utils"
import { createJobSchema } from "./validation"
import {nanoid} from 'nanoid'
import {put} from '@vercel/blob'
import path from "path"
import { redirect } from "next/navigation"


export async function postJob(formData: FormData) {
    const values = Object.fromEntries(formData.entries())

    const {
        title,
        companyName,
        locationType,
        type,
        applicationEmail,
        applicationUrl,
        companyLogo,
        description,
        location,
        salary,
    } = createJobSchema.parse(values)

    const slug = `${toSlug(title)}-${nanoid(10)}`

    // store our company logo to blob storage
    let companyLogoUrl: string | undefined = undefined

    if (companyLogo) {
        // we can only send up to 4.5 MB to a server action! u can check the docs
        const blob = await put(
            `company-logos/${slug}${path.extname(companyLogo.name)}`,
            companyLogo,
            {
                access: 'public',
                addRandomSuffix: false,
            }
        )
        companyLogoUrl = blob.url
    }

    await db.job.create({
        data: {
            slug,
            title: title.trim(),
            type,
            companyName: companyName.trim(),
            companyLogoUrl,
            locationType,
            location,
            applicationEmail: applicationEmail?.trim(),
            applicationUrl: applicationUrl?.trim(),
            description: description?.trim(),
            salary: parseInt(salary),
        }
    })

    redirect('/job-submitted')
}