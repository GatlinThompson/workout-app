import React from "react";
import LiftForm from "@/components/forms/LiftForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditLiftPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch the workout and its lifts
  const { data: workout, error: workoutError } = await supabase
    .from("workouts")
    .select("id, workout_date")
    .eq("id", id)
    .single();

  if (workoutError || !workout) {
    notFound();
  }

  // Fetch all lifts for this workout
  const { data: workoutLifts, error: liftsError } = await supabase
    .from("workout_lifts")
    .select(
      `
      sequence,
      lift:lifts(id, exercise, reps, tempo, superset)
    `
    )
    .eq("workout", id)
    .order("sequence");

  if (liftsError) {
    console.error("Error fetching lifts:", liftsError);
    notFound();
  }

  const liftsData = await Promise.all(
    (workoutLifts || []).map(async (wl: any) => {
      const lift = wl.lift;
      let superSetData = null;

      if (lift.superset) {
        const { data: supersetLift } = await supabase
          .from("lifts")
          .select("exercise, reps, tempo, id, superset(*)")
          .eq("id", lift.superset)
          .single();

        if (supersetLift) {
          superSetData = {
            exercise: supersetLift.exercise,
            reps: supersetLift.reps,
            tempo: supersetLift.tempo || "",
            id: supersetLift.id,
          };
        }
      }

      return {
        sequence: wl.sequence,
        lift: {
          id: lift.id,
          exercise: lift.exercise,
          reps: lift.reps,
          tempo: lift.tempo || "",
          superSet: superSetData,
        },
      };
    })
  );

  return (
    <div>
      <h1 className="text-center font-bold my-6 font-montserrat text-4xl">
        Edit Workout
      </h1>
      <LiftForm
        workoutId={workout.id}
        initialDate={workout.workout_date}
        initialLifts={liftsData}
      />
    </div>
  );
}
