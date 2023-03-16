import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { AiOutlineClose } from "react-icons/ai";

const CloseButton: FC<DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({ className, onClick }) => {
  return (
    <button type="button" className={`${className} absolute right-4 top-4`} onClick={onClick}>
      <AiOutlineClose size={30} />
    </button>
  );
}

export default CloseButton;