import React from "react";
import styles from "./Workout.module.css";

export default function WorkoutHeader() {
  return (
    <section
      className={`w-full mb-4 grid grid-cols-2 gap-4 ${styles["workout-table-header"]} p-3 md:p-2 rounded-lg`}
    >
      <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
        <h1 className="font-bold font-montserrat md:text-4xl text-3xl">
          Phase 1
        </h1>
        <h2 className="font-semibold md:text-2xl text-xl text-light-gray ">
          Week 3 Day 6
        </h2>
      </div>
      <div className="md:text-right flex flex-col gap-1 col-span-2 md:col-span-1">
        <h1 className="font-bold font-montserrat md:text-4xl text-3xl">
          60% <span className="text-red-orange">1RPM</span>
        </h1>
        <h2 className="font-semibold md:text-2xl text-xl text-light-gray">
          Level 1 - Stablization Endurance
        </h2>
      </div>
    </section>
  );
}
