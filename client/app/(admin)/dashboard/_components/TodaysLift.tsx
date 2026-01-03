"use client";

import { getWorkoutData } from "@/lib/supabase/utils/lifts";
import Workout from "@/components/workout/Workout";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { Lift, SuperSet } from "@/types/lifts";
import Loading from "@/components/ui/loading/Loading";
import GlassContainer from "@/components/ui/GlassContainer";

export default function TodaysLift() {
  const [lifts, setLifts] = useState<(Lift | SuperSet)[]>([]);
  const [workoutId, setWorkoutId] = useState<string | number | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      setLoading(true);
      // Get today's date in YYYY-MM-DD format (client timezone)
      const now = new Date();
      const todayStr = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

      console.log("Fetching workout for date:", todayStr);

      const data = await getWorkoutData(todayStr);
      if (data) {
        setLifts(data.lifts);
        setWorkoutId(data.workoutId);
      }
      setLoading(false);
    };

    fetchWorkout();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-grow ">
        <Loading />
      </div>
    );
  }

  return (
    <GlassContainer>
      <Button to={workoutId ? `/lift/${workoutId}/edit` : "#"}>
        Edit Workout
      </Button>
      <Workout initialLifts={lifts} />
    </GlassContainer>
  );
}
