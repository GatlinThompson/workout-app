import { PhaseInfo } from "@/types/phase";

/**
 * Calculates the current week and day number based on the phase start date,
 * excluding Sundays. Week cycles are Mon-Sat (6 days per week).
 * @param startDate The start date of the current phase (YYYY-MM-DD format)
 * @returns An object with week and day numbers
 */
export function calculateWeekAndDay(startDate: string): {
  week: number;
  day: number;
} {
  const start = new Date(startDate + "T00:00:00Z");
  const today = new Date();
  const todayUTC = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );

  // Count only non-Sunday days between start and today
  let workingDays = 0;
  const currentDay = new Date(start);

  while (currentDay <= todayUTC) {
    const dayOfWeek = currentDay.getUTCDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    if (dayOfWeek !== 0) {
      // Exclude Sundays
      workingDays++;
    }
    currentDay.setUTCDate(currentDay.getUTCDate() + 1);
  }

  const week = Math.floor((workingDays - 1) / 6) + 1;
  const day = ((workingDays - 1) % 6) + 1;

  return { week: Math.max(1, week), day: Math.max(1, day) };
}

/**
 * Gets the level name based on the phase number.
 * @param phase The phase number
 * @returns The level name and description
 */
export function getLevelInfo(phase: number): {
  level: number;
  name: string;
} {
  const levels = [
    { level: 1, name: "Stabilization Endurance" },
    { level: 2, name: "Strength Endurance" },
    { level: 3, name: "Muscular Development" },
    { level: 4, name: "Maximal Strength" },
    { level: 5, name: "Power" },
  ];

  // Assuming each phase corresponds to a level in order
  const index = (phase - 1) % levels.length;
  return levels[index];
}
