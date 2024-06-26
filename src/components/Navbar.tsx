import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from '@/assets/website-logo.png'
import { Button } from "./ui/button";

function Navbar() {
    return (
        <header className="shadow-sm">
            <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
                <Link href={'/'} className="flex items-center gap-3">
                    <Image
                        alt="Cari Gawe logo"
                        width={40}
                        height={40}
                        src={logo}
                    />
                    <span className="text-xl font-bold tracking-tight">
                        Cari Gawe
                    </span>
                </Link>
                <Button asChild>
                    <Link href={'jobs/new'}>Post a job</Link>
                </Button>
            </nav>
        </header>
    );
}

export default Navbar;
