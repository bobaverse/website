import { classNames } from "@/utils/strings";
import Link from "next/link";

const tabs = [
  { name: 'This Season', href: '#', current: true },
  { name: 'Last Season', href: '#', current: false },
  { name: 'Lifetime', href: '#', current: false },
]


const SeasonTabs = () => {
  return (
    <nav className="isolate flex divide-x divide-boba-grey rounded-lg shadow w-full max-w-sm" aria-label="Tabs">
      {tabs.map((tab, tabIdx) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={classNames(
            tab.current ? 'bg-boba-green text-black' : 'hover:text-boba-green text-white',
            tabIdx === 0 ? 'rounded-l-xl' : '',
            tabIdx === tabs.length - 1 ? 'rounded-r-xl' : '',
            'group relative min-w-0 flex-1 overflow-hidden bg-[#4A4A4A] ]py-4 px-4 text-center text-xs py-2 focus:z-10'
          )}
          aria-current={tab.current ? 'page' : undefined}
        >
          <span>{tab.name}</span>
        </Link>
      ))}
    </nav>
  )
}

export default SeasonTabs;
