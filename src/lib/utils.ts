import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatToMoney(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(amount);
}

export function getRelativeDate(from: Date) {
    return formatDistanceToNowStrict(from, {
        addSuffix: true,
    });
}

export function toSlug(str: string) {
    return str
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""); 
        // the first regex replace all spaces into -
        // the second regex replaces all - that is more than 1 to be an empty string 
}
