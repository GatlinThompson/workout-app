import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(_req: NextRequest) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("phase_management")
    .select("phase(level, phase_number, percentage), start_date, end_date, id")
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Error fetching phases:", error);
    return NextResponse.json(
      { error: "Failed to fetch phases" },
      { status: 500 },
    );
  }

  return NextResponse.json({ phases: data ?? [] }, { status: 200 });
}
