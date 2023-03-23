'use client';
import { FC } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";



const BackButton: FC = () => {
  const router = useRouter();
  const onBack = () => {
    router.back();
  }
  return (
    <button type="button" onClick={onBack} className={`bg-button rounded-full pr-1 py-0.5`}>
      <IoIosArrowBack size={30} />
    </button>
  );
}

export default BackButton;