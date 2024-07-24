"use client"

import Logo from "@/assets/logosaas.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export function Top() { 
    return (
        <div className="sticky top-0 backdrop-blur-sm z-20">
        <div className="py-3">
            <div className="container">
                <div className="flex items-center justify-between">
                    <Image src={Logo} alt="Saas Logo" height={40} width={40} />
                    <nav className="hidden md:flex gap-6 text-black/60 items-center">
                    <ConnectButton />
                    </nav>
                </div>
            </div>
        </div>
    </div>
    )
}