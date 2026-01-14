"use client";

import Button from "@/components/ui/Button";
import { useModal } from "@/contexts/ModalContext";

export default function PhaseChanger() {
  const { openModal } = useModal();

  const handleOpenPhaseChanger = () => {
    openModal(
      <div className="relative">
        <h2 className="text-xl font-bold mb-4">Change Phase</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Phase changing functionality goes here.
        </p>
      </div>
    );
  };
  return (
    <div className="-mt-0 flex justify-center max-w-[300px] mx-auto">
      <Button
        onClick={handleOpenPhaseChanger}
        roundedBottom
        borderedBottom={true}
        className=" w-full md:w-48"
      >
        Change Phase
      </Button>
    </div>
  );
}
