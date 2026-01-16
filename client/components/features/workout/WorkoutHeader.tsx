import React from "react";
import styles from "./Workout.module.css";
import Logo from "@/public/roman-logo.png";
import Image from "next/image";
import { getPhase } from "@/lib/supabase/utils/getPhase";
import { PhaseInfo } from "@/types/phase";
import { calculateWeekAndDay } from "@/utils/phase";
import Button from "@/components/ui/Button";
import { div } from "framer-motion/client";
import PhaseChanger from "@/components/features/phase/PhaseChanger";
import WorkoutWeekDay from "./WorkoutWeekDay";
import Link from "next/dist/client/link";

type WorkoutHeaderProps = {
  className?: string;
  showChangePhase?: boolean;
  location?: string;
};

/**
 * WorkoutHeader component displays the header information for a workout session.
 * @param {string} className Optional additional CSS classes to apply to the container.
 * @returns The rendered WorkoutHeader component.
 */
export default async function WorkoutHeader({
  className,
  showChangePhase,
  location,
}: WorkoutHeaderProps) {
  const phase: PhaseInfo | null = await getPhase();

  const pathname = location || "/";
  return (
    <section className={`${className} flex flex-col`}>
      <div
        className={` relative flex flex-col md:flex-row gap-4 justify-between ${styles["workout-table-header"]} p-3  md:p-4 rounded-lg`}
      >
        <div className="flex flex-col ">
          <h1 className="font-bold font-montserrat text-lg lg:text-3xl">
            Phase {phase?.phase.phase_number || 1}
          </h1>
          <WorkoutWeekDay phaseDate={phase?.phase_started || null} />
        </div>
        <div className="grow flex justify-center hidden md:flex lg:hidden xl:flex  absolute left-0 right-0 mx-auto">
          <Link href={pathname}>
            <Image
              src={Logo}
              alt="Roman Fitness"
              width={200}
              height={58}
              className="aspect-[187/58] object-contain"
            />
          </Link>
        </div>
        <div className="md:text-right flex flex-col">
          <h1 className="font-bold font-montserrat text-lg lg:text-3xl">
            {phase?.phase.percentage || 60}%{" "}
            <span className="text-red-orange">1RPM</span>
          </h1>
          <h2 className="font-semibold text-lg lg:text-lg text-light-gray">
            Level {phase?.phase.phase_number || 1} -{" "}
            {phase?.phase.level || "Stabilization"}
          </h2>
        </div>
      </div>
      {/* Change Phase Button */}
      {showChangePhase && <PhaseChanger />}
    </section>
  );
}
