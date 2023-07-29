import { classNames } from "@/utils/strings";
import Link from "next/link";

interface TabProps {
  options: { text: string, value: string }[];
  query: Record<string, string>;
}

const SeasonTabs = ({ options, query }: TabProps) => {
  return (
    <nav className="isolate flex divide-x divide-boba-grey rounded-lg shadow w-full max-w-sm" aria-label="Tabs">
      {options.map((option, i) => (
        <Link
          key={i}
          href={{ pathname: "/rankings", query: { ...query, period: option.value } }}
          className={classNames(
            query.period === option.value
              ? "bg-boba-green text-black pointer-events-none"
              : "hover:text-boba-green text-white",
            i === 0 ? "rounded-l-xl" : "",
            i === options.length - 1 ? "rounded-r-xl" : "",
            "group relative min-w-0 flex-1 overflow-hidden bg-[#4A4A4A] ]py-4 px-4 text-center text-xs py-2 focus:z-10",
          )}
          aria-current={query.period === option.value ? "page" : undefined}
        >
          <span>{option.text}</span>
        </Link>
      ))}
    </nav>
  );
};

export default SeasonTabs;
