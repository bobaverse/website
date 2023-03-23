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
    <button type="button" onClick={onBack} className={`absolute inset-y-0 mt-3 left-5 flex`}>
      <IoIosArrowBack size={30} />
      <span className="mt-1">Back</span>
    </button>
  );
}

export default BackButton;