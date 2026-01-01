import Main from "@/components/layout/Main";
import loading from "./loading";
import WebSocketPage from "@/components/workout/WebSocket";
import Workout from "@/components/workout/Workout";
import { Suspense } from "react";
import Loading from "./loading";
import WorkoutHeader from "@/components/workout/WorkoutHeader";
import GlassContainer from "@/components/ui/GlassContainer";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Main>
        <WorkoutHeader />
        <Workout />
        <GlassContainer>a</GlassContainer>
      </Main>
    </Suspense>
  );
}
