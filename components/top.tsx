"use client"

import Logo from "@/assets/logosaas.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

export function Top() { 
    return (
        <div className="sticky top-0 backdrop-blur-sm z-20">
        <div className="py-3">
            <div className="w-[150vw] px-3 md:container">
                <div className="flex items-center justify-between">
                 <Link href={"/dashboard"}>
                    <Image src={Logo} alt="Saas Logo" height={40} width={40} /></Link>
                    <ConnectButton />

                </div>
            </div>
        </div>
    </div>
    )
}