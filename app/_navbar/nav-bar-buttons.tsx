"use client";
import SideBar from "@/app/_navbar/side-bar";
import { useDrawerStore } from "@/components/store/drawer";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import GameControllerPNG from "@/assets/game-controller.png";

export const SideBarButton = () => {
  const setOpen = useDrawerStore(state => state.setSideBar);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="sidebar">
        <GiHamburgerMenu size={45.7} className="text-boba-light-gray" />
      </button>
      <SideBar />
    </>
  );
};

export const NavBackButton = () => {
  const path = usePathname();
  const router = useRouter();
  return path === "/" ? null : (
    <button className="bg-boba-light-gray rounded-xl px-3 text-xs h-[40px]" onClick={router.back}>
      Back
    </button>
  );
}

interface WalletButtonBaseProps {
  text: string,
  image?: string,
  useImage?: boolean,
  onClick?: () => void,
}

const WalletButtonBase = ({ text, image, useImage = false, onClick }: WalletButtonBaseProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 bg-boba-light-gray rounded-xl px-3 text-xs h-[40px]"
    >
      {useImage && (
        <Image
          src={image ?? GameControllerPNG}
          alt="avatar"
          height={28}
          className="rounded-full"
          unoptimized={!!image}
        />
      )}
      <span>{text}</span>
    </button>
  );
}

export const WalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          // authenticationStatus,
          mounted,
        }) => {
        const connected = mounted && account && chain;

        return mounted ? (
          <div>
            {(
              () => {
                if (!connected) {
                  return <WalletButtonBase onClick={openConnectModal} text="Connect Wallet" />
                }
                if (chain.unsupported) {
                  return <WalletButtonBase onClick={openChainModal} text="Wrong Network" />;
                }

                return (
                  <WalletButtonBase
                    text={account.displayName}
                    image={account.ensAvatar}
                    useImage
                    onClick={openAccountModal}
                  />
                );
              }
            )()}
          </div>
        ) : (
          <div>
            {(() => <WalletButtonBase text="Loading..." />)()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
