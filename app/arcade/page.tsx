import { FC } from "react";
import BigButton from "@/components/buttons/BigButton";

const Arcade: FC = () => {

  return (
    <div className="grid grid-flow-row gap-4 grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 items-center sm:grid-rows-2 mt-4">
      <BigButton text="Plinko" href="/arcade/plinko" />
      <BigButton text="Coming Soon..." href="/#" />
      <BigButton text="Coming Soon..." href="/#" className="" />
    </div>
  );
}

export default Arcade;