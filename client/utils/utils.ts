import { Lift, SuperSet } from "@/types/lifts";

export const titleCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const wsSender = (type: string, payload: object): string => {
  return JSON.stringify({ type: type, payload: payload });
};

export const getDates = (): { today: Date; tomorrow: Date } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return { today, tomorrow };
};

export const isSuperSet = (lift: Lift | SuperSet): lift is SuperSet => {
  return (lift as SuperSet).superset !== undefined;
};
