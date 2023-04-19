import Image from "next/image";
import logoIcon from "@/public/Logo.png";
import { FC, Suspense } from "react";

import WalletButton from "@/components/buttons/WalletButton";
import NavDrawerButton from "@/components/buttons/NavDrawerButton";
import Link from "next/link";

const NavBar: FC = () => {

  return (
    <div className="w-full px-2.5 py-6 border-b-[0.75px] border-b-[rgp(0, 0, 0, 0.1)]">
      <div className="flex items-center align-middle">
        <Suspense fallback={<p>Loading feed...</p>}>
          <NavDrawerButton className="mr-3 sm:hidden" />
        </Suspense>
        <Link href="/" className="flex items-center">
          <Image
            src={logoIcon}
            className="mr-2 select-none h-[40px] w-auto"
            alt="logo-white"
          />
          <span className="hidden sm:inline-block text-2xl text-black font-semibold select-none pt-[3px] leading-6">
          BobaVerse
        </span>
        </Link>
        <div className="flex items-center align-middle ml-auto">
          <Suspense fallback={<p>Loading feed...</p>}>
            <WalletButton />
          </Suspense>
          <Suspense fallback={<p>Loading feed...</p>}>
            <NavDrawerButton className="ml-3 hidden sm:inline-block" />
          </Suspense>
        </div>
      </div>

    </div>
  );
}

export default NavBar;