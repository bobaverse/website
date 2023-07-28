import GameControllerGridPNG from "@/assets/game-controller-grid.png";
import Button2 from "@/components/buttons/Button2";
import { PlinkoIcon } from "@/components/icons";
import { classNames } from "@/utils/strings";
import Image from "next/image";
import { FC } from "react";
import { FaBasketball } from "react-icons/fa6";
import { GiPinballFlipper } from "react-icons/gi";

const Arcade: FC = () => {
  const games = [
    { text: "Plinko", icon: PlinkoIcon, href: "/arcade/plinko" },
    { text: "Planko", icon: FaBasketball, href: "/arcade/Planko", disabled: true },
    { text: "Plonko", icon: GiPinballFlipper, href: "/arcade/Plonko", disabled: true },
  ]
  return (
    <div className="flex flex-col h-full relative justify-center sm:justify-start content-center items-center ">
      <Image
        src={GameControllerGridPNG}
        alt="controller"
        className="max-w-sm sm:max-w-2xl md:max-w-3xl"
        priority
      />
      <div className="z-10 flex flex-col items-center gap-8 -mt-20 sm:-mt-40 md:-mt-48">
        <div>
          <h1 className="text-boba-green sm:text-[3.75rem]">Arcade</h1>
          <h4 className="sm:text-[1.75rem] text-center">Select a game:</h4>
        </div>
        <div className="flex flex-col gap-4 w-full sm:grid sm:grid-cols-3 sm:gap-8">
          {games.map((game, i) => (
            <Button2
              key={i}
              className={classNames(
                "sm:space-x-0 sm:space-y-1 sm:flex-col sm:px-7",
                game.disabled ? "pointer-events-none opacity-70" : ""
              )}
              iconClassName="sm:text-6xl"
              {...game}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Arcade;
