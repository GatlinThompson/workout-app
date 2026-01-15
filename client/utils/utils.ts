"use client";

import { Lift, SuperSet } from "@/types/lifts";

export const titleCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const wsSender = (type: string, payload: object): string => {
  return JSON.stringify({ type: type, payload: payload });
};

export const getDates = (): { today: Date; tomorrow: Date } => {
  const now = new Date();

  // Get today at 00:00:00 UTC
  const today = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );

  // Get tomorrow at 00:00:00 UTC
  const tomorrow = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0,
      0
    )
  );

  return { today, tomorrow };
};

export const isSuperSet = (lift: Lift | SuperSet): lift is SuperSet => {
  return (lift as SuperSet).superset !== undefined;
};

export const toShortLongString = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const toFormattedString = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
