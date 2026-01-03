import { getWorkoutData } from "@/lib/supabase/utils/lifts";
import Workout from "@/components/workout/Workout";
import { div } from "framer-motion/client";
import Button from "@/components/ui/Button";

export default async function TodaysLift() {
  const { lifts, workoutId } = (await getWorkoutData()) || {
    lifts: [],
    workoutId: "",
  };

  return (
    <div>
      <Button to={workoutId ? `/lift/${workoutId}/edit` : "#"}>
        Edit Workout
      </Button>
      <Workout initialLifts={lifts} />
    </div>
  );
}
