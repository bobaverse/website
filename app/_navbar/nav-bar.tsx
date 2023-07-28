import { SideBarButton, NavBackButton, WalletButton } from "@/app/_navbar/nav-bar-buttons";
import Image from "next/image";
import Link from "next/link";
import GameControllerPNG from "@/assets/game-controller.png";

const NavBar = () => {
  return (
    <div className="absolute z-10 top-0 w-full h-[70px] px-4 flex items-center justify-between border-b-[0.75px] border-b-[rgp(0, 0, 0, 0.1)] bg-boba-grey">
      <div className="inline-flex space-x-3">
        <NavBackButton />
        <Link href="/">
          <Image
            src={GameControllerPNG}
            height={40}
            className="select-none"
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <WalletButton />
        <SideBarButton />
      </div>
    </div>
  );
}

export default NavBar;
