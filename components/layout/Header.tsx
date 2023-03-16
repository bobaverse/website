import Image from "next/image";
import logoIcon from "@/public/Logo.png";
import { FC } from "react";

import WalletButton from "@/components/buttons/WalletButton";

const Header: FC = () => {
  return (
    <div className="w-full px-2.5 py-6 border-b-[0.75px] border-b-primary">
      <div className="flex items-center align-middle">
        <Image
          src={logoIcon}
          className="mr-2 select-none h-[30px] w-auto"
          alt="logo-white"
        />
        <span className="text-2xl font-semibold select-none pt-[3px] leading-6">BobaVerse</span>
        <div className="flex items-center align-middle ml-auto">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}

export default Header;