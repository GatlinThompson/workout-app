"use client";
import { Lift, SuperSet } from "@/types/lifts";
import { isSuperSet } from "@/utils/utils";
import LiftRow from "./LiftRow";
import SuperSetRow from "./SuperSetRow";
import { useRealtimeWorkout } from "@/hooks/useRealtimeWorkout";
import styles from "./Workout.module.css";
import { s } from "framer-motion/client";

type WorkoutProps = {
  initialLifts: (Lift | SuperSet)[];
};

export default function Workout({ initialLifts }: WorkoutProps) {
  const { lifts, workoutId, loading } = useRealtimeWorkout(initialLifts);
  return (
    <div
      className={`${styles["workout-table-container"]} w-full overflow-x-auto shadow-2xl`}
    >
      <table className="w-full table-auto">
        <thead className={`text-white ${styles["workout-table-header"]}`}>
          <tr className="">
            <th className="text-3xl text-left ps-5 py-4 font-montserrat w-full">
              Exercise
            </th>
            <th className="text-3xl text-left py-4 lg:min-w-[150px] xl:min-w-[300px] font-montserrat">
              Reps
            </th>
            <th className="text-3xl text-left py-4 lg:min-w-[150px] xl:min-w-[300px] font-montserrat">
              Tempo
            </th>
          </tr>
        </thead>
        <tbody>
          {lifts.map((lift: Lift | SuperSet) => {
            if (isSuperSet(lift)) {
              return <SuperSetRow key={lift.id} {...lift} />;
            } else {
              return <LiftRow key={lift.id} {...lift} />;
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
