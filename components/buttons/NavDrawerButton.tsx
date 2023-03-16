'use client';

import "@rainbow-me/rainbowkit/styles.css";

import { DetailedHTMLProps, FC, HTMLAttributes, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NavDrawer from "@/components/navigation/NavDrawer";

const NavDrawerButton: FC<DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const onMenuClick = () => {
    setOpen(true);
  }

  const onMenuClose = () => {
    setOpen(false);
  }
  return (
    <>
      <button type="button" className={`${className}`} onClick={onMenuClick}>
        <GiHamburgerMenu size={40} />
      </button>
      <NavDrawer open={open} onClose={onMenuClose} />
    </>
  );
}

export default NavDrawerButton;
