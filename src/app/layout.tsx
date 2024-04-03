import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: 'Cari Gawe',
        template: '%s | Cari Gawe',
    },
    description: "Find Your dream job.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    inter.className,
                    "min-h-screen min-w-[350px] bg-background antialiased",
                )}
            >
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
