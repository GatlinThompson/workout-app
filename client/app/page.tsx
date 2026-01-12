import Main from "@/components/layout/Main";
import Workout from "@/components/features/workout/Workout";
import WorkoutHeader from "@/components/features/workout/WorkoutHeader";
import GlassContainer from "@/components/ui/glass_card/GlassContainer";
import { getWorkoutData } from "@/lib/supabase/utils/lifts";
import { Lift, SuperSet } from "@/types/lifts";

export default async function Home() {
  const date = new Date();

  const {
    lifts = [] as (Lift | SuperSet)[],
    workoutId = undefined as number | undefined,
  } = (await getWorkoutData(date.toFormattedString())) || {
    lifts: [],
    workoutId: undefined,
  };

  return (
    <Main>
      <GlassContainer>
        <WorkoutHeader className="mb-6" />
        {lifts.length > 0 ? (
          <Workout initialLifts={lifts} />
        ) : (
          <div className="p-6 h-90 lg:h-150 text-light-gray  text-xl text-center flex items-center justify-center">
            No workout scheduled for today.
          </div>
        )}
      </GlassContainer>
      <p>{date.toFormattedString()}</p>
    </Main>
  );
}
