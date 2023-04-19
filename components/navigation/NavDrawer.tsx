'use client';
import { FC, MouseEventHandler } from "react";
import CloseButton from "@/components/buttons/CloseButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface Props {
  open: boolean,
  onClose: () => void,
}

const NavDrawer: FC<Props> = ({ open, onClose }) => {
  const userPathName = usePathname();
  const siteMap: { [key: string]: { name: string, link?: string }[]} = {
    Site: [
      { name: 'Arcade' },
      { name: 'Profile' },
      { name: 'Leaderboards' }
    ],
    Information: [
      { name: 'Github', link: 'https://github.com/enyalabs' },
      { name: 'Enya', link: 'https://www.enya.ai/' },
      { name: 'Boba', link: 'https://boba.network/' }
    ],
    Legal: [
      { name: 'Terms of Service', link: '#' },
      { name: 'Privacy Policy', link: '#' },
      { name: 'Cookie Policy', link: '#' }
    ]
  }
  const catchClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  }
  return (
    <div
      className={`absolute top-0 left-0 h-full w-full z-[1000] ${open ? "backdrop-blur-xl" : "backdrop-blur-none pointer-events-none"} `}
      onClick={onClose}
    >
      <nav
        className={
          `transition-transform duration-300 ease-out w-64 absolute overflow-x-scroll ` +
          (open ? "translate-x-0" : "-translate-x-full sm:translate-x-full") +
          ` bg-taffy top-0 left-0 sm:right-0 sm:left-auto h-screen flex flex-col items-center`
        }
        onClick={catchClick}
      >

        <div className="flex pr-2 justify-end">
          <CloseButton onClick={onClose} />
        </div>
        {Object.entries(siteMap).map(([heading, links]) => (
          <div key={heading} className="w-full px-5">
            <div className="mt-8 border-b-2 border-opacity-40">
              <h1 className="text-3xl text-center font-boldpt-5 select-none">{heading}</h1>
            </div>
            <ul className="list-none text-white text-center space-y-2">
              {links.map((item, index) => (
                <li
                  className={
                  "mt-2 rounded-md hover:bg-white-hovered " +
                    (userPathName.startsWith(`/${item.name.toLowerCase()}`) ? "pointer-events-none bg-white-hovered" : "")
                  }
                  key={index}
                >
                  <Link href={item.link ?? `/${item.name.toLowerCase()}`} onClick={onClose}>
                    <span className="text-2xl">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default NavDrawer;
