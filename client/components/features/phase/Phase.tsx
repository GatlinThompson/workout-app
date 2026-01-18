"use client";

import Button from "@/components/ui/Button";

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

export default function Phase({
  phase,
  index,
  onUpdate,
}: {
  phase: PhaseInfo;
  index: number;
  onUpdate: () => void;
}) {
  const extendWeek = async () => {
    const response = await fetch(`/api/phases/extend/${phase.id}`, {
      method: "PUT",
    });

    if (response.ok) {
      onUpdate();
    } else {
      const error = await response.json();
      alert(`Error: ${error.error || "Failed to extend phase week"}`);
    }
  };

  const reduceWeek = async () => {
    const response = await fetch(`/api/phases/reduce/${phase.id}`, {
      method: "PUT",
    });
    if (response.ok) {
      onUpdate();
    } else {
      const error = await response.json();
      alert(`Error: ${error.error || "Failed to reduce phase week"}`);
    }
  };

  const lessThanAWeekLeft = () => {
    const endDate = new Date(phase.end_date);
    const startDate = new Date(phase.start_date);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff > 7;
  };

  return (
    <div className="flex w-full gap-3 pb-2 items-center">
      <div className="grow">
        <h2 className="md:text-lg font-bold">
          Phase {phase.phase.phase_number} - {phase.phase.level}
        </h2>
        <div className="mt-1">
          <span>
            {formateDate(phase.start_date)} - {formateDate(phase.end_date)}
          </span>
        </div>
      </div>
      {index === 0 && (
        <div className="flex flex-col md:flex-row gap-4">
          {lessThanAWeekLeft() && (
            <Button
              bordered
              onClick={reduceWeek}
              className="order-2 md:order-1"
            >
              -1 Week
            </Button>
          )}
          <Button onClick={extendWeek} className="order-1 md:order-2">
            +1 Week
          </Button>
        </div>
      )}
    </div>
  );
}
