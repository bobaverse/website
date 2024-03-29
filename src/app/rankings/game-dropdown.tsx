'use client';
import { classNames } from "@/utils/strings";
import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { Menu, Transition } from '@headlessui/react'
import { VscTriangleDown } from "react-icons/vsc";

interface DropdownProps {
  options: { text: string, value: string, icon: ReactNode }[]
  query: Record<string, string>;
}

const GameDropdown = ({ options, query }: DropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#4A4A4A] px-3 py-2 text-sm font-semibold shadow-sm">
          {options.find(o => o.value === query.game)?.text}
          <VscTriangleDown className="-mr-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[#4A4A4A] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <Link
                    href={{ pathname: '/rankings', query: { ...query, game: option.value } }}
                    className={classNames(
                      active ? 'text-boba-green' : option.value === query.game ? 'text-black' : "text-white",
                      option.value === query.game ? 'pointer-events-none' : '',
                      'group flex items-center px-4 py-2 text-sm'
                    )}
                  >
                    <div className="mr-3 h-5 w-5">
                      {option.icon}
                    </div>
                    {option.text}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default GameDropdown;
