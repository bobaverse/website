import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface Props {
  text: string
  href: string
  icon?: ReactNode
  className?: string
}
const BigButton: FC<Props> = ({ href, text, icon, className = "" }) => {
  return (
    <Link href={href} className={`flex h-40 w-40 bg-button rounded-[40px] ${className}`}>
      <div className="m-auto">
        {icon ? icon : null}
        <span className="text-2xl">{text}</span>
      </div>
    </Link>
  );
}

export default BigButton;