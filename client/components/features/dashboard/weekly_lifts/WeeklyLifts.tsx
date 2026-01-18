"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Button from "@/components/ui/Button";
import DailyLift from "./DailyLift";
import { getWorkoutData } from "@/lib/supabase/utils/lifts";
import Spinner from "@/components/ui/Spinner";
import GlassContainer from "@/components/ui/glass_card/GlassContainer";

type WeeklyLiftsProps = {
  className?: string;
};

type DayLift = {
  date: string;
  dayName: string;
  exerciseCount: number;
  hasWorkout: boolean;
  workoutId?: string | number;
  fullDate: string; // For querying
};

export default function WeeklyLifts({ className }: WeeklyLiftsProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getWeekStart(new Date()),
  );
  const [weekDays, setWeekDays] = useState<DayLift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeekData() {
      setLoading(true);

      // Generate dates for 6 days (Monday to Saturday)
      const datePromises = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);
        const fullDate = date.toISOString().split("T")[0];

        return {
          date,
          fullDate,
          dateStr: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        };
      });

      // Fetch all workout data in parallel
      const workoutPromises = datePromises.map(({ fullDate }) =>
        getWorkoutData(fullDate),
      );

      const workoutResults = await Promise.all(workoutPromises);

      // Combine date info with workout data
      const days: DayLift[] = datePromises.map((dateInfo, index) => ({
        date: dateInfo.dateStr,
        dayName: dateInfo.dayName,
        exerciseCount: workoutResults[index]?.lifts?.length || 0,
        hasWorkout: !!workoutResults[index],
        workoutId: workoutResults[index]?.workoutId,
        fullDate: dateInfo.fullDate,
      }));

      setWeekDays(days);
      setLoading(false);
    }

    fetchWeekData();
  }, [currentWeekStart]);

  const goToPreviousWeek = useCallback(() => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  }, [currentWeekStart]);

  const goToNextWeek = useCallback(() => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  }, [currentWeekStart]);

  const weekRange = useMemo(() => {
    const endDate = new Date(currentWeekStart);
    endDate.setDate(currentWeekStart.getDate() + 6);

    const startMonth = currentWeekStart.toLocaleDateString("en-US", {
      month: "short",
    });
    const startDay = currentWeekStart.getDate();
    const endDay = endDate.getDate();

    return `${startMonth} ${startDay}-${endDay}`;
  }, [currentWeekStart]);

  const skeletonCards = useMemo(
    () =>
      Array.from({ length: 6 }, (_, index) => (
        <GlassContainer
          key={index}
          className="p-4 flex items-center justify-center h-64"
        >
          <div className="text-center space-y-4 w-full">
            <div className="h-8 w-16 bg-white/10 rounded mx-auto animate-pulse"></div>
            <div className="h-6 w-20 bg-white/10 rounded mx-auto animate-pulse"></div>
            <Spinner className="w-8 h-8" />
            <div className="h-10 w-32 bg-white/10 rounded mx-auto animate-pulse"></div>
            <div className="h-6 w-24 bg-white/10 rounded mx-auto animate-pulse"></div>
          </div>
        </GlassContainer>
      )),
    [],
  );

  return (
    <section className={`${className} mt-6`}>
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={goToPreviousWeek}
          className="!w-auto px-4 lg:text-2xl"
          disabled={loading}
        >
          ← Prev
        </Button>

        <h1 className="text-2xl lg:text-4xl font-bold text-white">
          {weekRange}
        </h1>

        <Button
          onClick={goToNextWeek}
          className="!w-auto px-4 lg:text-2xl"
          disabled={loading}
        >
          Next →
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-6">
          {skeletonCards}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-6  ">
          {weekDays.map((day, index) => (
            <DailyLift key={day.fullDate} day={day} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}

// Helper function to get Monday of the current week
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}
