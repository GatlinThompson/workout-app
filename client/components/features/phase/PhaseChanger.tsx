"use client";

import Button from "@/components/ui/Button";
import { useModal } from "@/contexts/ModalContext";
import PhaseContainer from "./PhaseContainer";
import { p } from "framer-motion/client";

export default function PhaseChanger() {
  const { openModal } = useModal();

  const fetchPhases = async () => {
    const response = await fetch("/api/phases");
    const data = await response.json();
    return data.phases;
  };

  const handleOpenPhaseChanger = async () => {
    const phases = await fetchPhases();
    if (phases) {
      openModal("Manage Phases", <PhaseContainer phases={phases} />);
    }
  };
  return (
    <div className="-mt-0 flex justify-center max-w-[300px] mx-auto">
      <Button
        onClick={handleOpenPhaseChanger}
        roundedBottom
        borderedBottom={true}
        className=" w-full md:w-48"
      >
        Manage Phases
      </Button>
    </div>
  );
}
