import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const lifts = [
      { id: 1, name: "Bench Press", reps: "3x10", tempo: "2-0-1" },
      { id: 2, name: "Squats", reps: "4x8", tempo: "3-1-1" },
      { id: 3, name: "Deadlift", reps: "5x5", tempo: "2-0-2" },
    ];
    return NextResponse.json({ workout: lifts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching lifts:", error);
    return NextResponse.json(
      { error: "Failed to fetch lifts" },
      { status: 500 }
    );
  }
}
