import { FC } from "react";
import ImgCardButton from "@/components/buttons/ImgCardButton";

const Arcade: FC = () => {

  const games = [
    'Plinko',
  ]
  return (
    <div className="content">
      <span className="text-h1 mb-4">Arcade</span>
      <div className="grid grid-flow-row gap-20 grid-cols-1 grid-rows-1 sm:grid-cols-1 items-center sm:grid-rows-1">
        {games.map((game, index) => (
          <ImgCardButton key={index} title={game} href={"/arcade/" + game.toLowerCase()} />
        ))}
      </div>
    </div>

  );
}

export default Arcade;