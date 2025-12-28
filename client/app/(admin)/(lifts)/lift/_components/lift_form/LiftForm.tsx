"use client";

import Button from "@/components/ui/Button";
import LiftInput from "./LiftInput";
import { useState } from "react";
import LiftInputGroup from "./LiftInputGroup";
import LiftDateInput from "./LiftDateInput";
import { useRouter } from "next/navigation";

type LiftRow = { id: string };

const makeId = () => crypto.randomUUID();

type Props = {
  workoutId?: number;
  initialDate?: string;
  initialLifts?: any[];
};

export default function LiftForm({
  workoutId,
  initialDate,
  initialLifts,
}: Props) {
  const router = useRouter();
  const isEditing = !!workoutId;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const liftJsonStrings = formData.getAll("lift") as string[];

    const url = isEditing ? `/api/lifts/${workoutId}` : "/api/lifts";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: JSON.stringify({
        date: formData.get("date"),
        lifts: liftJsonStrings,
        removed_lifts: formData.get("removed_lifts"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const error = await res.json();
      console.error("Error saving workout:", error);
      alert(`Error: ${error.error || "Failed to save workout"}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto grid gap-6">
        <LiftDateInput initialDate={initialDate} />

        <LiftInputGroup initialLifts={initialLifts} />

        <Button type="submit">
          {isEditing ? "Update Workout" : "Save Lift"}
        </Button>
      </form>
    </div>
  );
}
