import React from "react";
import styles from "./GlassContainer.module.css";

type GlassContainerProps = {
  children: React.ReactNode;
};

export default function GlassContainer({ children }: GlassContainerProps) {
  return (
    <div className={`${styles["glass-card"]} w-full h-200  rounded-lg `}>
      {children}
    </div>
  );
}
