import { FC } from "react";
import { PageProps } from "@/interfaces";
import BackButton from "@/components/buttons/BackButton";

const Layout: FC<PageProps> = ({ children }) => {
  return (
    <div className="flex flex-col pt-4 h-full items-center">
      <div className="relative w-full text-center">
        <BackButton />
        <span className="text-4xl font-semibold mt-4 text-center">BobaVerse Arcade</span>
      </div>
      {children}
    </div>
  );
}

export default Layout;
