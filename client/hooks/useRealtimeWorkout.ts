"use client";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lift, SuperSet } from "@/types/lifts";

type UseRealtimeWorkoutReturn = {
  lifts: (Lift | SuperSet)[];
  workoutId: string | number | undefined;
  loading: boolean;
};

export function useRealtimeWorkout(): UseRealtimeWorkoutReturn {
  const [lifts, setLifts] = useState<(Lift | SuperSet)[]>([]);
  const [workoutId, setWorkoutId] = useState<string | number | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);
  const isInitialLoadRef = useRef(true);
  const currentLiftIdsRef = useRef<Set<number>>(new Set());

  const supabase = useMemo(() => createClient(), []);
  const isFetchingRef = useRef(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize the update function to prevent recreation on every render
  const updateWorkoutData = useCallback(async () => {
    if (isFetchingRef.current) {
      return;
    }

    // Clear any pending debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce the actual fetch to batch rapid changes
    debounceTimerRef.current = setTimeout(async () => {
      isFetchingRef.current = true;

      // Only set loading state on initial load
      if (isInitialLoadRef.current) {
        setLoading(true);
      }

      try {
        // Get today's date in YYYY-MM-DD format (client timezone)
        const now = new Date();
        const todayStr = `${now.getFullYear()}-${String(
          now.getMonth() + 1,
        ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

        const { data, error } = await supabase
          .from("workouts")
          .select("*, workout_lifts(sequence, lift(*, superset(*)))")
          .eq("workout_date", todayStr)
          .order("sequence", {
            foreignTable: "workout_lifts",
            ascending: true,
          });

        if (error) {
          setLoading(false);
          isFetchingRef.current = false;
          return;
        }

        if (data && data.length > 0) {
          const updatedLifts: (SuperSet | Lift)[] =
            data[0].workout_lifts?.map((item: any) => {
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
            }) || [];

          // Track all lift IDs in the current workout
          const liftIds = new Set<number>();
          data[0].workout_lifts?.forEach((item: any) => {
            liftIds.add(item.lift.id);
            if (item.lift.superset) {
              liftIds.add(item.lift.superset.id);
            }
          });
          currentLiftIdsRef.current = liftIds;

          setWorkoutId(data[0].id);
          setLifts(updatedLifts);
        } else {
          // No workout found for today
          setLifts([]);
          setWorkoutId(undefined);
          currentLiftIdsRef.current = new Set();
        }

        // Mark initial load as complete
        if (isInitialLoadRef.current) {
          isInitialLoadRef.current = false;
          setLoading(false);
        }
      } catch (error) {
        if (isInitialLoadRef.current) {
          isInitialLoadRef.current = false;
          setLoading(false);
        }
      } finally {
        isFetchingRef.current = false;
      }
    }, 300);
  }, [supabase]);

  // Initial data fetch on mount
  useEffect(() => {
    updateWorkoutData();
  }, [updateWorkoutData]);

  useEffect(() => {
    const channel = supabase
      .channel("workout-realtime-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lifts",
        },
        (payload) => {
          updateWorkoutData();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "workout_lifts",
          filter: `workout=eq.${workoutId}`,
        },
        (payload) => {
          updateWorkoutData();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "workouts",
          filter: `id=eq.${workoutId}`,
        },
        (payload) => {
          updateWorkoutData();
        },
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      supabase.removeChannel(channel);
    };
  }, [supabase, updateWorkoutData, workoutId]);

  return { lifts, workoutId, loading };
}
