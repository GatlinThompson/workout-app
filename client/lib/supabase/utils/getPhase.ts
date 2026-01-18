"use server";
import { createClient } from "../server";
import { PhaseInfo } from "@/types/phase";

export const getPhase = async (): Promise<PhaseInfo | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("phase_management")
    .select("phase(level, phase_number, percentage), start_date")
    .lt("start_date", new Date().toISOString())
    .limit(1)
    .single();

  const phaseInfo = data as PhaseInfo | null;

  if (error) {
    return null;
  } else if (phaseInfo) {
    return phaseInfo;
  } else {
    return null;
  }
};
