import React from "react";
import styles from "./Workout.module.css";

export default function WorkoutHeader() {
  return (
    <section
      className={`w-full mb-4 grid grid-cols-2 gap-4 ${styles["workout-table-header"]} p-1 rounded-lg`}
    >
      <div>
        <h1>Phase 3</h1>
        <h2>Week 3 Day 2</h2>
      </div>
      <div className="text-right">
        <h1>Phase 3</h1>
        <h2>Level 2</h2>
      </div>
    </section>
  );
}
