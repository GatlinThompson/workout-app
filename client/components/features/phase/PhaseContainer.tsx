"use client";
import Phase, { PhaseInfo } from "./Phase";
import Divider from "@/components/ui/divider/Divider";
import { useState } from "react";
import { fetchPhases } from "./PhaseChanger";

export default function PhaseContainer({ phases }: { phases: PhaseInfo[] }) {
  const [phaseList, setPhases] = useState<PhaseInfo[]>(phases);

  const updatePhases = async () => {
    const updatedPhases = await fetchPhases();
    setPhases(updatedPhases);
  };
  return (
    <>
      <ul className="flex flex-col gap-3">
        {phaseList?.map((phase: PhaseInfo, index: number) => (
          <li key={phase.id}>
            <Phase phase={phase} index={index} onUpdate={updatePhases} />
            {index < phaseList.length - 1 && <Divider />}
          </li>
        ))}
      </ul>
    </>
  );
}
