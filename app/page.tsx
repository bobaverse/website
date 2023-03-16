import Image from "next/image";
import { FC } from "react";
import Logo from "@/public/Logo.png";

const Home: FC = () => {
  return (
    <div className="flex flex-col pt-4 h-full justify-center select-none">
      <Image src={Logo} alt="logo" width={512} className="mx-auto" />
      <span className="text-4xl font-semibold mx-auto mt-4">Welcome to the BobaVerse</span>
    </div>
  );
}

export default Home;