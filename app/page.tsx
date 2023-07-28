import Button2 from "@/components/buttons/Button2";
import { AvatarIcon, JoystickIcon, TrophyIcon } from "@/components/icons";
import Image from "next/image";
import GameControllerGridPNG from "@/assets/game-controller-grid.png";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row-reverse h-full relative justify-center content-center items-center ">
      <Image
        src={GameControllerGridPNG}
        alt="controller"
        className="max-w-sm sm:max-w-2xl md:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl"
        priority
      />
      <div className="z-10 flex flex-col items-center gap-8 -mt-20 lg:mt-0 lg:-mr-40 xl:-mr-56 2xl:-mr-72">
        <div>
          <h4>Welcome to the</h4>
          <h1>
            <b className="text-boba-green">BOBA</b>
            VERSE
          </h1>
        </div>
        <div className="flex flex-col gap-4 w-fit lg:grid lg:grid-cols-3 lg:gap-8">
          <Button2 text="Arcade" icon={JoystickIcon} href="/arcade" />
          <Button2 text="Profile" icon={AvatarIcon} href="/profile" />
          <Button2 text="Rankings" icon={TrophyIcon} href="/rankings" />
        </div>
      </div>
    </div>
  );
}

export default Home;
