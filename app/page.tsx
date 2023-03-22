import Image from "next/image";
import { FC } from "react";
import Logo from "@/public/Logo.png";
import BigButton from "@/components/buttons/BigButton";

const Home: FC = () => {

  return (
    <div className="flex flex-col pt-4 h-full items-center">
      <Image src={Logo} alt="logo" width={256} priority />
      <span className="text-4xl font-semibold mt-4 text-center">Welcome to the BobaVerse</span>
      <div className="grid grid-flow-row gap-4 grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 items-center sm:grid-rows-2 mt-4">
        <BigButton text="Arcade" href="/arcade" />
        <BigButton text="Profile" href="/#"  />
        <BigButton text="Leaderboards" href="/#" className="" />
      </div>
    </div>
  );
}

export default Home;