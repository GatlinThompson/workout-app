"use client";
import { useState } from "react";
import styles from "./Loading.module.css";

type LoadingDotProps = {
  delay?: number;
};

export default function LoadingDot({ delay = 0 }: LoadingDotProps) {
  return (
    <div className="pb-2">
      <div
        className={`${styles.bounce} ${styles.dot} ml-1`}
        style={{ animationDelay: `${delay}s` }}
      ></div>
    </div>
  );
}
