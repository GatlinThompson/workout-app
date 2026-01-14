"use client";

import { useModal } from "@/contexts/ModalContext";
import ModalCloseButton from "./ModalCloseButton";

// Example usage component - this shows how to open the modal from a client component
export function ExampleModalTrigger() {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <div className="relative">
        <ModalCloseButton />
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p className="text-gray-700 dark:text-gray-300">
          This is the modal content. You can put any React component here.
        </p>
      </div>
    );
  };

  return (
    <button
      onClick={handleOpenModal}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Open Modal
    </button>
  );
}

// For server components, you'll need to wrap the trigger in a client component like this:
export function ServerComponentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openModal } = useModal();

  return (
    <div onClick={() => openModal(children)} className="cursor-pointer">
      Click to open modal
    </div>
  );
}
