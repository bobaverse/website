import Image from "next/image";
import { FC } from "react";
import Logo from "@/public/Logo.png";
import ImgCardButton from "@/components/buttons/ImgCardButton";

const Home: FC = () => {

  return (
    <div className="flex flex-col h-full content-center gap-y-4 items-center lg:justify-center">
      <div className="flex flex-col gap-4 content-center items-center mb-8 mt-5 lg:mt-0">
        <Image src={Logo} alt="logo" height={250} className="h-[150px] lg:h-[250px] w-[130px] lg:w-[218px]" priority />
        <span className="text-h1 text-center font-normal">Welcome to the BobaVerse</span>
      </div>
      <div className="grid grid-flow-row gap-5 grid-cols-1 grid-rows-3 items-center lg:grid-cols-3 lg:grid-rows-1 lg:gap-20">
        <ImgCardButton title="Arcade" href="/arcade" />
        <ImgCardButton title="Profile" href="/profile"  />
        <ImgCardButton title="Leaderboards" href="/leaderboards" />
      </div>
    </div>
  );
}

export default Home;