"use client";

import React, { useState } from "react";

type Props = {
  initialDate?: string;
};

export default function LiftDateInput({ initialDate }: Props) {
  const [date, setDate] = useState<Date>(
    initialDate ? new Date(initialDate) : new Date()
  );

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const changeDate = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const dateValue = date.toISOString().split("T")[0];

  return (
    <div className="flex items-center gap-4 mx-2 p-4 bg-secondary rounded-lg">
      <button
        type="button"
        onClick={() => changeDate(-1)}
        className="p-2 hover:bg-gray-700 rounded transition-colors"
        aria-label="Previous day"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="flex-1 text-center">
        <p className="text-lg font-semibold">{formatDate(date)}</p>
        <input
          type="date"
          name="date"
          value={dateValue}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="hidden"
        />
      </div>

      <button
        type="button"
        onClick={() => changeDate(1)}
        className="p-2 hover:bg-gray-700 rounded transition-colors"
        aria-label="Next day"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
