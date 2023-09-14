'use client';
import SideBarItem from "@/app/_navbar/side-bar-item";
import { useDrawerStore } from "@/components/store/drawer";
import { classNames } from "@/utils/strings";
import Image from "next/image";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconType } from "react-icons";
import { HiX } from "react-icons/hi";
import GameControllerPNG from "@/assets/game-controller.png";

const SideBar = () => {
  const { sideBar: open, setSideBar: setOpen } = useDrawerStore();
  const siteMap: Record<string, { text: string, href?: string, icon?: IconType }[]> = {
    Site: [
      { text: 'Home', href: '/' },
      { text: 'Arcade', href: '/arcade' },
      { text: 'Profile', href: '/profile' },
      { text: 'Rankings', href: '/rankings' }
    ],
    Information: [
      { text: 'Github', href: 'https://github.com/enyalabs' },
      { text: 'Enya', href: 'https://www.enya.ai/' },
      { text: 'Boba', href: 'https://boba.network/' }
    ],
    Legal: [
      { text: 'Terms of Service', href: '#' },
      { text: 'Privacy Policy', href: '#' },
      { text: 'Cookie Policy', href: '#' }
    ]
  }

  return (
    <Transition.Root show={open} as='div'>
      <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>
        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-16 flex h-full w-full max-w-xs">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" className="-m-2.5 p-2.5" onClick={() => setOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <HiX className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 bg-boba-grey">
                <div className="flex h-16 items-center justify-center fill-white">
                  <div className="flex h-8">
                    <Image src={GameControllerPNG} height={24} alt="logo" />
                  </div>
                </div>
                <nav className="flex flex-1 flex-col text-white select-none">
                  <ul role="list" className="flex flex-1 flex-col">
                    {Object.entries(siteMap).map(([category, links], i) => (
                      <Fragment key={i}>
                        <h6
                          className={classNames(
                            "font-bold leading-6 text-boba-green border-boba-light-gray border-b-2 mb-1",
                            i === 0 ? "mt-0" : "mt-5"
                          )}
                        >
                          {category}
                        </h6>
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {links.map((item, j) => <SideBarItem key={j} {...item} />)}
                          </ul>
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SideBar;
