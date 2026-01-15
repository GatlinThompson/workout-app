import Main from "@/components/layout/Main";
import Workout from "@/components/features/workout/Workout";
import WorkoutHeader from "@/components/features/workout/WorkoutHeader";
import GlassContainer from "@/components/ui/glass_card/GlassContainer";

export default function Home() {
  return (
    <Main>
      <GlassContainer>
        <WorkoutHeader className="mb-6" />
        <Workout />
      </GlassContainer>
    </Main>
  );
}
