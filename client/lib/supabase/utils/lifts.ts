"use server";

import { createClient } from "../server";
import { Lift, SuperSet } from "@/types/lifts";

export const getWorkoutData = async (
  dateStr?: string
): Promise<{
  lifts: (Lift | SuperSet)[];
  workoutId?: string | number;
} | null> => {
  // Use provided date or default to today in YYYY-MM-DD format
  const todayStr = dateStr || new Date().toISOString().split("T")[0];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workouts")
    .select("*, workout_lifts(sequence, lift(*, superset(*)))")
    .eq("workout_date", `${todayStr}`)
    .order("sequence", { foreignTable: "workout_lifts", ascending: true });

  console.log("Fetched workout data for date:", todayStr, data, error);

  if (error) {
    console.error("Error fetching lifts:", error);
    return null;
  } else if (data && data.length > 0) {
    const lifts: (SuperSet | Lift)[] = data[0].workout_lifts?.map(
      (item: any) => {
        if (item.lift.superset) {
          return {
            id: item.lift.id,
            superset: [
              {
                id: item.lift.id,
                exercise: item.lift.exercise,
                reps: item.lift.reps,
                tempo: item.lift.tempo,
              },
              {
                id: item.lift.superset.id,
                exercise: item.lift.superset.exercise,
                reps: item.lift.superset.reps,
                tempo: item.lift.superset.tempo,
              },
            ],
          };
        } else {
          return {
            id: item.lift.id,
            exercise: item.lift.exercise,
            reps: item.lift.reps,
            tempo: item.lift.tempo,
          };
        }
      }
    );

    //Return workout
    return { lifts: lifts, workoutId: data[0].id };
  }

  return null;
};
