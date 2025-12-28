"use server";

import { createClient } from "../server";
import { getDates } from "@/utils/utils";
import { Lift, SuperSet } from "@/types/lifts";

export const getTodayWorkout = async (): Promise<
  (Lift | SuperSet)[] | null
> => {
  //GET Date for start at 00 hours
  const { today, tomorrow } = getDates();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workouts")
    .select("*, workout_lifts(sequence, lift(*, superset(*)))")
    .lte("workout_date", new Date(tomorrow).toISOString())
    .gte("workout_date", new Date(today).toISOString())
    .order("sequence", { foreignTable: "workout_lifts", ascending: true });

  console.log("TODAY WORKOUT DATA:", data);
  if (error) {
    console.error("Error fetching lifts:", error);
    return null;
  } else if (data && data.length > 0) {
    const lifts: (SuperSet | Lift)[] = data[0].workout_lifts?.map(
      (item: any) => {
        console.log(item);
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
    return lifts;
  }
  console.info("Data fetched from Supabase:", data);
  return null;
};
