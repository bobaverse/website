"use client";
import { useDrawerStore } from "@/components/store/drawer";
import { classNames } from "@/utils/strings";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { MouseEvent } from "react";

interface SideBarItemProps {
  text: string,
  href?: string,
  icon?: IconType,
}

const SideBarItem = ({ text, href = "#", icon: Icon }: SideBarItemProps) => {
  const setOpen = useDrawerStore(state => state.setSideBar)
  const pathname = usePathname();
  const pathMatch = () => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  }

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (href !== "#") {
      setOpen(false);
    }
  }
  return (
    <li
      className={classNames((
        pathMatch() || href === "#"
      ) ? 'pointer-events-none' : '')}
      onClick={handleClick}
    >
      <Link
        href={href}
        target={href?.startsWith("/") ? "_self" : "_blank"}
        className={classNames(
          pathMatch()
            ? 'bg-white bg-opacity-30'
            : 'hover:bg-gradient-frosted-dimmed hover:rounded-xl',
          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
          href === "#" ? 'text-white/30' :
            "text-white",
        )}
      >
        {Icon && <Icon
          className={classNames(
            'h-6 w-6 shrink-0 fill-white stroke-white',
          )}
          aria-hidden="true"
        />}
        {text}
      </Link>
    </li>
  )
}

export default SideBarItem;
