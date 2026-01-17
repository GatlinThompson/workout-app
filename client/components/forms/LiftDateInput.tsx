"use client";

import React, { useState } from "react";
import styles from "./LiftInput.module.css";
import { toShortLongString } from "@/utils/utils";

export default function LiftDateInput({
  initialDate,
}: {
  initialDate?: string;
}) {
  // Initialize with UTC date
  const [date, setDate] = useState<Date>(() => {
    if (initialDate) {
      console.log("Initial Date:", initialDate);
      const date = new Date(initialDate);
      date.setDate(date.getDate() + 1);

      return date;
    }

    const now = new Date();
    console.log("Hello " + now.toLocaleDateString());
    return now;
  });

  let dateValue = date.toLocaleDateString().split("T")[0];
  let stringDate = date;

  if (initialDate) {
    stringDate = new Date(initialDate);
    stringDate.setDate(stringDate.getDate() + 1);
  }

  return (
    <div
      className={`flex items-center gap-4 mx-2 p-4 glass-black ${styles["input-border"]} rounded-lg`}
    >
      <div className="flex-1 text-center">
        <p className="text-lg font-semibold">{toShortLongString(stringDate)}</p>
        <input
          type="date"
          name="date"
          value={dateValue}
          onChange={(e) => {
            const inputDate = new Date(e.target.value + "T00:00:00Z");
            setDate(inputDate);
          }}
          className="hidden"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
