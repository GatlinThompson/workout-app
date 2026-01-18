import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Phase ID is required" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("phase_management")
    .select("id, start_date, end_date")
    .eq("id", id);
  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Phase not found" }, { status: 404 });
  }
  if (error) {
    return NextResponse.json(
      { error: "Failed to reduce phase" },
      { status: 500 },
    );
  }
  const phaseToReduce = data[0];
  const newEndDate = new Date(phaseToReduce.end_date);
  newEndDate.setDate(newEndDate.getDate() - 7); // Reduce by 7 days

  if (newEndDate <= new Date(phaseToReduce.start_date)) {
    return NextResponse.json(
      { error: "End date cannot be before or equal to start date" },
      { status: 400 },
    );
  }

  const { data: updatedData, error: updateError } = await supabase
    .from("phase_management")
    .update({ end_date: newEndDate.toISOString() })
    .eq("id", id);
  if (updateError) {
    return NextResponse.json(
      { error: "Failed to update phase" },
      { status: 500 },
    );
  }

  //update start dates of the rest of the phases
  const { data: subsequentPhases, error: subsequentError } = await supabase
    .from("phase_management")
    .select("id, start_date, end_date")
    .neq("id", id);
  if (!subsequentPhases || subsequentPhases.length === 0) {
    return NextResponse.json("No subsequent phases to update", { status: 200 });
  }
  const updatePromises = subsequentPhases.map(async (phase) => {
    const currentStartDate = new Date(phase.start_date);
    const currentEndDate = new Date(phase.end_date);
    const newStartDate = new Date(currentStartDate);
    newStartDate.setDate(newStartDate.getDate() - 7);
    const newEndDate = new Date(currentEndDate);
    newEndDate.setDate(newEndDate.getDate() - 7);
    return supabase
      .from("phase_management")
      .update({
        start_date: newStartDate.toISOString(),
        end_date: newEndDate.toISOString(),
      })
      .eq("id", phase.id);
  });
  await Promise.all(updatePromises);

  return NextResponse.json({ success: true }, { status: 200 });
};
