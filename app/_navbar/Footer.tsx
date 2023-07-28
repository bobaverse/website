'use client';

import { usePathname, useRouter } from 'next/navigation';
import Button from "@/components/buttons/Button";
import { BiChevronLeft } from "react-icons/bi";

const Footer = () => {
  const userPath = usePathname();
  const { back } = useRouter();
  return (
    <div className="flex h-[96px] w-full">
      <div className="flex my-4 mx-8 items-center">
        {userPath.split('/').filter(Boolean).length > 0 && (
          <Button text="Back" onClick={back}>
            <BiChevronLeft size={24} />
          </Button>
        )}
      </div>
    </div>
  )
}

export default Footer;