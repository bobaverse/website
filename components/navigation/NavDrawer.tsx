'use client';
import { FC, MouseEventHandler } from "react";
import CloseButton from "@/components/buttons/CloseButton";
import Link from "next/link";

interface Props {
  open: boolean,
  onClose: () => void,
}

const NavDrawer: FC<Props> = ({ open, onClose }) => {

  const catchClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  }
  return (
    <div
      className={`absolute top-0 left-0 h-full w-full ${open ? "backdrop-blur-xl" : "backdrop-blur-none pointer-events-none"} `}
      onClick={onClose}
    >
      <nav
        className={`transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-full"} w-64 absolute overflow-x-scroll bg-modal-bg top-0 left-0 sm:right-0 sm:left-auto h-screen`}
        onClick={catchClick}
      >

        <div className="flex pr-2 justify-end">
          <CloseButton onClick={onClose} />
        </div>
        <h1 className="text-xl text-center font-bold underline underline-offset-8 pt-5">Menu</h1>
        <ul className="list-none text-white text-center">
          <li className="my-8">
            <Link href="/arcade">
              Arcade
            </Link>
          </li>
          <li className="my-8">
            <Link href="#">
              Profile
            </Link>
          </li>
          <li className="my-8">
            <Link href="#">
              Leaderboards
            </Link>
          </li>
          <li className="my-8">
            <Link href="#">
              About Us
            </Link>
          </li>
          <li className="my-8">
            <Link href="#">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavDrawer;
