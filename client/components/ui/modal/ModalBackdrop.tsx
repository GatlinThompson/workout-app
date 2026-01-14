"use client";

import React from "react";

export default function ModalBackdrop({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="z-49 fixed inset-0 bg-black opacity-50 z-40 cursor-pointer"
      onClick={onClick}
    ></div>
  );
}
