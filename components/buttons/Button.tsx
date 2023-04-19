'use client';
import {  FC, ReactNode } from "react";

interface Props {
  text?: string
  onClick?: () => void
  className?: string
  disabled?: boolean
  children?: ReactNode
}
const Button: FC<Props> = ({ onClick, text, disabled, children, className = "" }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`bg-teal-light rounded-[40px] flex justify-center uppercase ${className}`}
    >
      <div className="flex mx-4 my-2 text-black">
        {children}
        <span className="font-bold">{text}</span>
      </div>
    </button>
  );
}

export default Button;