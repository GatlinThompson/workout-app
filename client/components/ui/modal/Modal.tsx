"use client";

import React from "react";
import { useModal } from "@/contexts/ModalContext";
import ModalContainer from "./ModalContainer";
import ModalBackdrop from "./ModalBackdrop";

export default function Modal() {
  const { isOpen, modalContent, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg z-50 relative max-w-2xl w-full mx-4">
        {modalContent}
      </div>
      <ModalBackdrop onClick={closeModal} />
    </ModalContainer>
  );
}
