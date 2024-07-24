import Logo from "@/assets/logosaas.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="sticky top-0 backdrop-blur-sm z-20">
        <div className="py-5">
            <div className="container">
                <div className="flex items-center justify-between">
                    <Image src={Logo} alt="Saas Logo" height={40} width={40} />
                    <MenuIcon className="h-5 w-5 md:hidden" />
                    <nav className="hidden md:flex gap-6 text-black/60 items-center">
                    <ConnectButton />
                    </nav>
                </div>
            </div>
        </div>
    </div>
        {children}
    </>
  );
}