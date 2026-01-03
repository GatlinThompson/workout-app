import React from "react";
import styles from "./GlassContainer.module.css";

type GlassContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function GlassContainer({
  children,
  className,
}: GlassContainerProps) {
  return (
    <div
      className={`${styles["glass-card"]} w-full rounded-lg md:p-8 p-3 ${className}`}
    >
      {children}
    </div>
  );
}
