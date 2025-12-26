import { createClient } from "../server";

export const getUser = async (): Promise<boolean> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data) return true;

  return false;
};
