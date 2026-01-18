"use client";

import { BiTrash, BiPencil } from "react-icons/bi";

export type PhaseInfo = {
  phase: {
    phase_number: number;
    rpm: number;
    level: string;
  };
  id: number;
  start_date: string;
  end_date: string;
  level: string;
};

const formateDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateString));
};

export default function Phase(phase: PhaseInfo) {
  return (
    <div className="flex w-full gap-3 pb-2">
      <div className="grow ">
        <h2 className="md:text-lg font-bold">
          Phase {phase.phase.phase_number} - {phase.phase.level}
        </h2>
        <div className="mt-1">
          <span>
            {formateDate(phase.start_date)} - {formateDate(phase.end_date)}
          </span>
        </div>
      </div>

      <div className="flex gap-4"></div>
    </div>
  );
}
