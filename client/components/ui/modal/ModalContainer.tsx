import React from "react";

export default function ModalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="z-50 w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
      {children}
    </div>
  );
}
