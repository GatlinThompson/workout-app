import { getTodayWorkout } from "@/lib/supabase/utils/lifts";
import { Lift, SuperSet } from "@/types/lifts";
import { get } from "http";
import React from "react";
import { isSuperSet } from "@/utils/utils";
import { LiftComponent } from "@/components/workout/Workout";
import { SuperSetComponent } from "@/components/workout/Workout";
import Button from "@/components/ui/Button";

export default async function TodaysLift() {
  const lifts = await getTodayWorkout();

  return (
    <section>
      <h2 className="text-3xl text-center">Today's Lift</h2>
      <div className="flex flex-start justify-end">
        <Button>Edit</Button>
      </div>
      <div>{lifts ? <WorkoutTable lifts={lifts} /> : <p>asd</p>}</div>
    </section>
  );
}

type WorkoutTableProps = {
  lifts: (Lift | SuperSet)[];
};

const WorkoutTable = ({ lifts }: WorkoutTableProps) => {
  return (
    <table className="table-fixed w-full border-spacing-2 border border-gray-400">
      <thead>
        <tr className="">
          <th className="p-1 border border-gray-400 text-left">Exercise</th>
          <th className="p-1 border border-gray-400">Reps</th>
          <th className="p-1 border border-gray-400">Tempo</th>
        </tr>
      </thead>
      <tbody></tbody>
      <tbody>
        {lifts.map((lift: Lift | SuperSet) => {
          if (isSuperSet(lift)) {
            return <SuperSetComponent key={lift.id} {...lift} />;
          } else {
            return <LiftComponent key={lift.id} {...lift} />;
          }
        })}
      </tbody>
    </table>
  );
};
