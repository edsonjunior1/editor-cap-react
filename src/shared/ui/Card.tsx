import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={twMerge("bg-white rounded-lg shadow-sm p-4", className)}>
      {children}
    </div>
  );
}