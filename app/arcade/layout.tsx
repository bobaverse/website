import { FC } from "react";
import { PageProps } from "@/interfaces";

const Layout: FC<PageProps> = ({ children }) => {
  return (
    <div className="flex flex-col pt-4 h-full items-center">{children}</div>
  );
}

export default Layout;
