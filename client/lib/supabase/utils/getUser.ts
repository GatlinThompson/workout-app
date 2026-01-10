import { createClient } from "../client";

export const getUser = async (): Promise<boolean> => {
  const supabase = createClient();
  const { data } = await supabase.auth.getClaims();

  if (data) return true;

  return false;
};
