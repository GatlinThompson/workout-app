"use client";
import Phase, { PhaseInfo } from "./Phase";
import Divider from "@/components/ui/divider/Divider";
import { use, useMemo } from "react";

export default function PhaseContainer({ phases }: { phases: PhaseInfo[] }) {
  return (
    <>
      <ul className="flex flex-col gap-3">
        {phases?.map((phase: PhaseInfo, index: number) => (
          <li key={phase.id}>
            <Phase {...phase} />
            {index < phases.length - 1 && <Divider />}
          </li>
        ))}
      </ul>
    </>
  );
}
