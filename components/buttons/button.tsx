import { classNames } from "@/utils/strings";
import Link from "next/link";
import { IconType } from "react-icons";

interface Props {
  text?: string
  icon?: IconType
  className?: string
  iconClassName?: string
  href?: string
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ text, icon: Icon, className, iconClassName, href, onClick, disabled }: Props) => {
  const classes = classNames(
    "bg-boba-green rounded-lg flex items-center font-medium text-black w-full px-4 py-2",
    "space-x-4 lg:space-x-0 lg:space-y-1 lg:flex-col",
    className
  )
  return href ? (
    <Link href={href} className={classes}>
      {Icon && <Icon className={classNames("text-5xl lg:text-6xl", iconClassName)} />}
      {text && <span>{text}</span>}
    </Link>
  ) : (
    <button disabled={disabled} onClick={onClick} className={classes}>
      {Icon && <Icon className={classNames("text-5xl lg:text-6xl", iconClassName)} />}
      {text && <span>{text}</span>}
    </button>
  );
}

export default Button;
