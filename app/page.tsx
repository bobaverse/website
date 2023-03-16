import Image from "next/image";
import { FC } from "react";
import Logo from "@/public/Logo.png";
import BigButton from "@/components/buttons/BigButton";

const Home: FC = () => {

  return (
    <div className="flex flex-col flex-wrap pt-4 h-full items-center select-none">
      <Image src={Logo} alt="logo" width={256} priority />
      <span className="text-4xl font-semibold mt-4 text-center">Welcome to the BobaVerse</span>
      <div className="flex flex-col sm:flex-row center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
        <BigButton text="Arcade" href="/#" />
        <BigButton text="Profile" href="/#" />
        <BigButton text="Leaderboards" href="/#" />
      </div>
    </div>
  );
}

export default Home;