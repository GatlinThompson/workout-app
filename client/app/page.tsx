"use client";
import Main from "@/components/layout/Main";
import Workout from "@/components/workout/Workout";
import WorkoutHeader from "@/components/workout/WorkoutHeader";
import GlassContainer from "@/components/ui/glass_card/GlassContainer";
import { getWorkoutData } from "@/lib/supabase/utils/lifts";
import { Lift, SuperSet } from "@/types/lifts";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading/Loading";

export default function Home() {
  const [lifts, setLifts] = useState<(Lift | SuperSet)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      setLoading(true);
      // Get today's date in YYYY-MM-DD format (client timezone)
      const now = new Date();
      const todayStr = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

      const data = await getWorkoutData(todayStr);

      if (data) {
        setLifts(data.lifts);
      }
      setLoading(false);
    };

    fetchWorkout();
  }, []);

  if (loading) {
    return (
      <Main centered>
        <Loading />
      </Main>
    );
  }

  return (
    <Main>
      <GlassContainer>
        <WorkoutHeader />
        <Workout initialLifts={lifts} />
      </GlassContainer>
    </Main>
  );
}
