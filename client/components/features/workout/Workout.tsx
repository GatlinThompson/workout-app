"use client";
import { Lift, SuperSet } from "@/types/lifts";
import { isSuperSet } from "@/utils/utils";
import LiftRow from "./LiftRow";
import SuperSetRow from "./SuperSetRow";
import { useRealtimeWorkout } from "@/hooks/useRealtimeWorkout";
import styles from "./Workout.module.css";
import Spinner from "@/components/ui/Spinner";

export default function Workout() {
  const { lifts, workoutId, loading } = useRealtimeWorkout();

  if (loading) {
    return (
      <div className="p-6 h-90 lg:h-150 text-light-gray text-xl text-center flex items-center justify-center flex-col gap-2">
        <Spinner className="h-8 w-8" />
        <p>Loading workout...</p>
      </div>
    );
  }

  if (lifts.length === 0) {
    return (
      <div className="p-6 h-90 lg:h-150 text-light-gray text-xl text-center flex items-center justify-center">
        No workout scheduled for today.
      </div>
    );
  }

  return (
    <div
      className={`${styles["workout-table-container"]} w-full overflow-x-auto shadow-2xl`}
    >
      <table className="w-full table-auto">
        <thead
          className={`text-white ${styles["workout-table-header"]} hidden lg:table-header-group`}
        >
          <tr className="">
            <th className="text-4xl text-left ps-5 py-4 font-montserrat w-full">
              Exercise
            </th>
            <th className="text-4xl text-left py-4 min-w-[150px] xl:min-w-[300px] font-montserrat">
              Reps
            </th>
            <th className="text-4xl text-left py-4 min-w-[150px] xl:min-w-[300px] font-montserrat">
              Tempo
            </th>
          </tr>
        </thead>
        <tbody className={`text-white ${styles["workout-table-body"]}`}>
          {lifts.map((lift: Lift | SuperSet, index: number) => {
            if (isSuperSet(lift)) {
              return (
                <SuperSetRow
                  key={lift.id}
                  superset={lift}
                  last={index === lifts.length - 1}
                />
              );
            } else {
              return (
                <LiftRow
                  key={lift.id}
                  lift={lift}
                  last={index === lifts.length - 1}
                />
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
