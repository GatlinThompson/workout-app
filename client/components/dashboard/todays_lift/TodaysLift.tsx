import React from "react";
import styles from "./TodaysLift.module.css";
import GlassContainer from "@/components/ui/glass_card/GlassContainer";
import GlassTitle from "@/components/ui/glass_card/GlassTitle";
import GlassSubTitle from "@/components/ui/glass_card/GlassSubTitle";
import GrayGlassContainer from "@/components/ui/glass_card/GrayGlassContainer";

export default function TodaysLift() {
  const date = new Date();

  const todaysDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section>
      <GlassContainer className={styles.container}>
        <GlassTitle weight="bold" size="4xl" position="center" className="mb-1">
          Today's Lift
        </GlassTitle>
        <GlassSubTitle weight="semibold" size="2xl" position="center">
          {todaysDate}
        </GlassSubTitle>
        <GrayGlassContainer>
          <p className="text-dark-gray text-center py-8">
            You have no lifts logged for today.
          </p>
        </GrayGlassContainer>
      </GlassContainer>
    </section>
  );
}
