import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type LiftInput = {
  sequence: number;
  lift: {
    exercise: string;
    reps: string;
    tempo?: string;
    superSet?: {
      exercise: string;
      reps: string;
      tempo?: string;
    } | null;
  };
};

function isValidDateString(value: unknown) {
  if (typeof value !== "string") return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime());
}

function asString(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function normalizeLifts(raw: unknown): LiftInput[] {
  if (!Array.isArray(raw)) return [];

  const parsed: LiftInput[] = raw.map((item) => {
    if (typeof item === "string") {
      try {
        return JSON.parse(item);
      } catch {
        return null;
      }
    }
    return item;
  });

  return parsed
    .filter(Boolean)
    .filter(
      (x) =>
        typeof x.sequence === "number" && x.lift && typeof x.lift === "object"
    )
    .map((x) => ({
      sequence: x.sequence,
      lift: {
        exercise: asString(x.lift.exercise),
        reps: asString(x.lift.reps),
        tempo: asString(x.lift.tempo ?? ""),
        superSet: x.lift.superSet
          ? {
              exercise: asString(x.lift.superSet.exercise),
              reps: asString(x.lift.superSet.reps),
              tempo: asString(x.lift.superSet.tempo ?? ""),
            }
          : null,
      },
    }));
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const date = body?.date;
    const liftsRaw = body?.lifts;
    const removedLiftsRaw = body?.removed_lifts;

    // Validate data
    if (!isValidDateString(date)) {
      return NextResponse.json(
        { error: "Invalid or missing date" },
        { status: 400 }
      );
    }

    const lifts = normalizeLifts(liftsRaw);

    if (lifts.length === 0) {
      return NextResponse.json(
        { error: "No valid lifts provided" },
        { status: 400 }
      );
    }

    const removedLifts = JSON.parse(removedLiftsRaw || "[]");

    console.log("Removed Lifts:", removedLifts);

    const seqSet = new Set(lifts.map((l) => l.sequence));
    if (seqSet.size !== lifts.length) {
      return NextResponse.json(
        { error: "Duplicate sequence values detected" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify workout exists
    const { data: existingWorkout, error: workoutCheckError } = await supabase
      .from("workouts")
      .select("id")
      .eq("id", id)
      .single();

    if (workoutCheckError || !existingWorkout) {
      return NextResponse.json({ error: "Workout not found" }, { status: 404 });
    }

    // Update the workout date
    const { error: updateWorkoutError } = await supabase
      .from("workouts")
      .update({ workout_date: date })
      .eq("id", id);

    if (updateWorkoutError) {
      console.error("Error updating workout:", updateWorkoutError);
      return NextResponse.json(
        { error: "Failed to update workout" },
        { status: 500 }
      );
    }

    // Get existing workout_lifts to find lift IDs to delete
    const { data: oldWorkoutLifts, error: fetchError } = await supabase
      .from("workout_lifts")
      .select("lift")
      .eq("workout", id);

    if (fetchError) {
      console.error("Error fetching old lifts:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch existing lifts" },
        { status: 500 }
      );
    }

    const oldLiftIds = (oldWorkoutLifts || []).map((wl: any) => wl.lift);

    // Delete old workout_lifts entries
    const { error: deleteJoinError } = await supabase
      .from("workout_lifts")
      .delete()
      .eq("workout", id);

    if (deleteJoinError) {
      console.error("Error deleting old workout_lifts:", deleteJoinError);
      return NextResponse.json(
        { error: "Failed to delete old workout lifts" },
        { status: 500 }
      );
    }

    // Delete old lift entries (and their associated supersets)
    if (oldLiftIds.length > 0) {
      // First get superset IDs from old lifts
      const { data: oldLifts } = await supabase
        .from("lifts")
        .select("id, superset")
        .in("id", oldLiftIds);

      const supersetIds = (oldLifts || [])
        .filter((l: any) => l.superset)
        .map((l: any) => l.superset);

      // Delete main lifts
      const { error: deleteLiftsError } = await supabase
        .from("lifts")
        .delete()
        .in("id", oldLiftIds);

      if (deleteLiftsError) {
        console.error("Error deleting old lifts:", deleteLiftsError);
      }

      // Delete superset lifts
      if (supersetIds.length > 0) {
        await supabase.from("lifts").delete().in("id", supersetIds);
      }
    }

    // Insert new lifts (same logic as POST)
    const normalLifts = lifts.filter((l) => !l.lift.superSet);
    const supersetMainLifts = lifts.filter((l) => !!l.lift.superSet);

    let workoutLiftRows: { workout: number; lift: number; sequence: number }[] =
      [];

    if (normalLifts.length > 0) {
      const { data: insertedNormals, error: normalsError } = await supabase
        .from("lifts")
        .insert(
          normalLifts.map((l) => ({
            exercise: l.lift.exercise,
            reps: l.lift.reps,
            tempo: l.lift.tempo ?? "",
          }))
        )
        .select("id");

      if (normalsError || !insertedNormals) {
        console.error("Normal lifts insert error:", normalsError);
        return NextResponse.json(
          { error: "Failed to insert lifts" },
          { status: 500 }
        );
      }

      workoutLiftRows.push(
        ...insertedNormals.map((row, i) => ({
          workout: parseInt(id),
          lift: row.id,
          sequence: normalLifts[i].sequence,
        }))
      );
    }

    for (const lift of supersetMainLifts) {
      const ss = lift.lift.superSet!;

      const { data: ssRow, error: ssError } = await supabase
        .from("lifts")
        .insert({
          exercise: ss.exercise,
          reps: ss.reps,
          tempo: ss.tempo ?? "",
        })
        .select("id")
        .single();

      if (ssError || !ssRow) {
        console.error("Superset secondary insert error:", ssError);
        return NextResponse.json(
          { error: "Failed to insert superset secondary lift" },
          { status: 500 }
        );
      }

      const { data: mainRow, error: mainError } = await supabase
        .from("lifts")
        .insert({
          exercise: lift.lift.exercise,
          reps: lift.lift.reps,
          tempo: lift.lift.tempo ?? "",
          superset: ssRow.id,
        })
        .select("id")
        .single();

      if (mainError || !mainRow) {
        console.error("Superset main insert error:", mainError);
        return NextResponse.json(
          { error: "Failed to insert superset main lift" },
          { status: 500 }
        );
      }

      workoutLiftRows.push({
        workout: parseInt(id),
        lift: mainRow.id,
        sequence: lift.sequence,
      });
    }

    const { error: joinError } = await supabase
      .from("workout_lifts")
      .insert(workoutLiftRows);

    if (joinError) {
      console.error("workout_lifts insert error:", joinError);
      return NextResponse.json(
        { error: "Failed to link lifts to workout" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Workout updated", workoutId: id },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /lifts/[id] unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to process PUT request" },
      { status: 500 }
    );
  }
}
