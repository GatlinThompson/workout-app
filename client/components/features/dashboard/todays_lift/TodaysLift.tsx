"use client";

import React, { useState, useEffect } from "react";
import styles from "./TodaysLift.module.css";
import GlassContainer from "@/components/ui/glass_card/GlassContainer";
import GlassTitle from "@/components/ui/glass_card/GlassTitle";
import GlassSubTitle from "@/components/ui/glass_card/GlassSubTitle";
import GrayGlassContainer from "@/components/ui/glass_card/GrayGlassContainer";
import { getWorkoutData } from "@/lib/supabase/utils/lifts";
import { Lift, SuperSet } from "@/types/lifts";
import Button from "@/components/ui/Button";
import TodaysWorkout from "./TodaysWorkout";
import { toShortLongString, toFormattedString } from "@/utils/utils";
import Loading from "@/components/ui/loading/Loading";
import Spinner from "@/components/ui/Spinner";

type TodaysLiftProps = {
  className?: string;
};

/**
 * Today's lift component for the admin dashboard
 *
 * @param className optional additional class names
 * @returns the today's lift component for the admin dashboard
 */
export default function TodaysLift({ className }: TodaysLiftProps) {
  const [lifts, setLifts] = useState<(Lift | SuperSet)[]>([]);
  const [workoutId, setWorkoutId] = useState<string | number | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();

  useEffect(() => {
    async function loadWorkout() {
      setIsLoading(true);
      const data = await getWorkoutData(toFormattedString(today));
      if (data) {
        setLifts(data.lifts || []);
        setWorkoutId(data.workoutId);
      }
      setIsLoading(false);
    }
    loadWorkout();
  }, []);

  return (
    <section className={`${className} ${styles.section} flex flex-col`}>
      <GlassContainer className={`${styles.container} grow`}>
        <GlassTitle weight="bold" size="4xl" position="center" className="mb-1">
          Today's Lift
        </GlassTitle>

        <GlassSubTitle
          weight="semibold"
          size="2xl"
          position="center"
          className="mb-8"
        >
          {toShortLongString(today)}
        </GlassSubTitle>

        <div className="flex flex-col flex-1">
          {today.getDay() !== 0 && (
            <Button
              to={`/lift/${workoutId ? workoutId + "/edit" : ""}`}
              className="text-right me-1 mb-1"
              roundedTop={true}
              bordered={true}
            >
              {!isLoading
                ? lifts.length > 0
                  ? "Edit Workout"
                  : "Create Workout"
                : "Loading..."}
            </Button>
          )}
          <GrayGlassContainer className="grow">
            {isLoading ? (
              <div className="w-full h-full justify-center items-center flex flex-col gap-2">
                <Spinner className="h-8 w-8" />
                <p>Loading workout...</p>
              </div>
            ) : (
              <TodaysWorkout lifts={lifts} />
            )}
          </GrayGlassContainer>
        </div>
      </GlassContainer>
    </section>
  );
}
