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
  // Accept YYYY-MM-DD (recommended) or ISO; tighten if you want only YYYY-MM-DD
  const d = new Date(value);
  return !Number.isNaN(d.getTime());
}

function normalizeDateToUTC(value: string): string {
  const d = new Date(value);
  // Convert to UTC midnight
  const utcDate = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0),
  );
  return utcDate.toISOString();
}

function asString(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function normalizeLifts(raw: unknown): LiftInput[] {
  if (!Array.isArray(raw)) return [];

  const parsed: LiftInput[] = raw.map((item) => {
    // Support either objects OR JSON strings coming from the client
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
        typeof x.sequence === "number" && x.lift && typeof x.lift === "object",
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
  // .filter(
  //   (x) =>
  //     x.lift.exercise &&
  //     x.lift.reps &&
  //     x.lift.tempo !== "" &&
  //     (!x.lift.superSet ||
  //       (x.lift.superSet.exercise &&
  //         x.lift.superSet.reps &&
  //         x.lift.superSet.tempo !== ""))
  // );
}

export async function GET() {
  // Keep GET simple for testing
  const lifts = [
    { id: 1, name: "Bench Press", reps: "3x10", tempo: "2-0-1" },
    { id: 2, name: "Squats", reps: "4x8", tempo: "3-1-1" },
    { id: 3, name: "Deadlift", reps: "5x5", tempo: "2-0-2" },
  ];

  return NextResponse.json({ workout: lifts }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dateRaw = body?.date;
    const liftsRaw = body?.lifts;

    //Validate Data before proceeding
    if (!isValidDateString(dateRaw)) {
      return NextResponse.json(
        { error: "Invalid or missing date" },
        { status: 400 },
      );
    }

    // Normalize date to UTC midnight
    const date = normalizeDateToUTC(dateRaw);

    const lifts = normalizeLifts(liftsRaw);

    if (lifts.length === 0) {
      return NextResponse.json(
        { error: "No valid lifts provided" },
        { status: 400 },
      );
    }

    const seqSet = new Set(lifts.map((l) => l.sequence));
    if (seqSet.size !== lifts.length) {
      return NextResponse.json(
        { error: "Duplicate sequence values detected" },
        { status: 400 },
      );
    }

    // Proceed with database operations
    const supabase = await createClient();

    //Check if workout for date already exists
    const { data: existingWorkout, error: existingError } = await supabase
      .from("workouts")
      .select("id")
      .eq("workout_date", date);

    if (existingError) {
      return NextResponse.json(
        { error: "Failed to check existing workout" },
        { status: 500 },
      );
    } else if (existingWorkout && existingWorkout.length > 0) {
      return NextResponse.json(
        { error: "Workout for this date already exists" },
        { status: 400 },
      );
    }

    // Insert workout
    const { data: workout, error: workoutError } = await supabase
      .from("workouts")
      .insert({ workout_date: date })
      .select("id")
      .single();

    if (workoutError || !workout) {
      return NextResponse.json(
        { error: "Failed to create workout" },
        { status: 500 },
      );
    }

    // Separate lifts into normal and supersets
    const normalLifts = lifts.filter((l) => !l.lift.superSet);
    const supersetMainLifts = lifts.filter((l) => !!l.lift.superSet);

    // Set up to collect workout_lifts entries
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
          })),
        )
        .select("id");

      if (normalsError || !insertedNormals) {
        return NextResponse.json(
          { error: "Failed to insert lifts" },
          { status: 500 },
        );
      }

      workoutLiftRows.push(
        ...insertedNormals.map((row, i) => ({
          workout: workout.id,
          lift: row.id,
          sequence: normalLifts[i].sequence,
        })),
      );
    }

    // Set up superset lifts
    for (const lift of supersetMainLifts) {
      const ss = lift.lift.superSet!;

      //insert superset lift first
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
        return NextResponse.json(
          { error: "Failed to insert superset secondary lift" },
          { status: 500 },
        );
      }

      // insert main lift pointing to superset
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
        return NextResponse.json(
          { error: "Failed to insert superset main lift" },
          { status: 500 },
        );
      }

      workoutLiftRows.push({
        workout: workout.id,
        lift: mainRow.id,
        sequence: lift.sequence,
      });
    }

    const { error: joinError } = await supabase
      .from("workout_lifts")
      .insert(workoutLiftRows);

    if (joinError) {
      return NextResponse.json(
        { error: "Failed to link lifts to workout" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Workout created", workoutId: workout.id },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process POST request" },
      { status: 500 },
    );
  }
}
