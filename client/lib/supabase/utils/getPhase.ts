"use server";
import { createClient } from "../server";
import { PhaseInfo } from "@/types/phase";

export const getPhase = async (): Promise<PhaseInfo | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("current_info")
    .select("phase(level, phase_number, percentage), phase_started")
    .limit(1)
    .single();

  console.log("Fetched phase data:", data, error);

  const phaseInfo = data as PhaseInfo | null;

  if (error) {
    console.error("Error fetching phase:", error);
    return null;
  } else if (phaseInfo) {
    return phaseInfo;
  } else {
    return null;
  }
};
