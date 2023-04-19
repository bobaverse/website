import { FC, ReactNode } from "react";
import Link from "next/link";
import { MdOutlineInsertPhoto } from "react-icons/md";

interface Props {
  title?: string
  href: string
  image?: ReactNode
  className?: string
}
const ImgCardButton: FC<Props> = ({ href, title, image, className = "" }) => {
  return (
    <Link href={href} className={`group flex bg-taffy rounded-sm text-center ${className} shadow-3xl`}>
      <div className="m-auto">
        <div className="flex h-[200px] w-[200px] justify-center items-center">
          {image ? image : <MdOutlineInsertPhoto className="" size={48} />}
        </div>
        <div className="bg-white-unhovered group-hover:bg-white-hovered">
          <div className="py-4">
            <span className="text-2xl">{title}</span>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default ImgCardButton;