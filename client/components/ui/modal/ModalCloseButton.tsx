"use client";

import React from "react";
import { useModal } from "@/contexts/ModalContext";

export default function ModalCloseButton() {
  const { closeModal } = useModal();

  return (
    <button
      onClick={closeModal}
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      aria-label="Close modal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
