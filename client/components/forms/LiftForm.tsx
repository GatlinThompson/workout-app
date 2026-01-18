"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";
import LiftInputGroup from "./LiftInputGroup";
import LiftDateInput from "./LiftDateInput";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

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
  const [loading, setLoading] = useState(false);
  const isEditing = !!workoutId;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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
      setLoading(false);
    } else {
      const error = await res.json();
      alert(`Error: ${error.error || "Failed to save workout"}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto grid gap-6 px-3"
      >
        <LiftDateInput initialDate={initialDate} />

        <LiftInputGroup initialLifts={initialLifts} />

        <div className="mx-2 mb-10">
          <Button type="submit" disabled={loading} className="">
            {loading ? (
              <Spinner className="w-6 h-6" />
            ) : isEditing ? (
              "Update Workout"
            ) : (
              "Create Workout"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
