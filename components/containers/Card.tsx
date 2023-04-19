import { FC, ReactNode } from "react";

interface CardProps {
  className?: string;
  children?: ReactNode;
}
const Card: FC<CardProps> = ({ className, children }) => {
  return (
    <div className={`flex flex-col w-full rounded-xl shadow-3xl ${className}`}>
      <div className="w-full p-3">
        {children}
      </div>
    </div>
  );
}

export default Card;