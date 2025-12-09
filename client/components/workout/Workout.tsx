import React from "react";

type Lift = {
  id: number;
  name: string;
  reps: string;
  tempo: string;
};

type SuperSet = {
  id: number;
  superset: Lift[];
};

const isSuperSet = (lift: Lift | SuperSet): lift is SuperSet => {
  return (lift as SuperSet).superset !== undefined;
};

export default async function Workout() {
  let workoutData;
  try {
    const res = await fetch("http://localhost:3000/api/lifts", {
      cache: "no-store", // so you always see fresh data in dev
    });

    if (!res.ok) {
      throw new Error("Failed to fetch lifts");
    }
    const data = await res.json();
    console.info("Fetched lifts data:", data);
    workoutData = data.workout;
    console.log("Workout data:", workoutData);
  } catch (error) {
    console.error("Error fetching lifts:", error);
  }

  return (
    <>
      <table className="table-fixed w-full border-spacing-2 border border-gray-400">
        <thead>
          <tr className="">
            <th className="p-1 border border-gray-400 text-left">Exercise</th>
            <th className="p-1 border border-gray-400">Reps</th>
            <th className="p-1 border border-gray-400">Tempo</th>
          </tr>
        </thead>
        <tbody>
          {workoutData.map((lift: Lift | SuperSet) => {
            if (isSuperSet(lift)) {
              return <SuperSetComponent key={lift.id} {...lift} />;
            } else {
              return <LiftComponent key={lift.id} {...lift} />;
            }
          })}
        </tbody>
      </table>
    </>
  );
}

function SuperSetComponent(superset: SuperSet) {
  return (
    <tr>
      <td className="flex flex-row text-left">
        <span className="font-bold">SS</span>
        <ul className="pt-3 pl-3">
          {superset.superset.map((lift) => (
            <li key={lift.id} className="ml-1">
              {lift.name}
            </li>
          ))}
        </ul>
      </td>
      <td className="border p-1">
        <ul className="pt-3 pl-3">
          {superset.superset.map((lift) => (
            <li key={lift.id} className="ml-1">
              {lift.reps}
            </li>
          ))}
        </ul>
      </td>
      <td className="border p-1">
        <ul className="pt-3 pl-3">
          {superset.superset.map((lift) => (
            <li key={lift.id} className="ml-1">
              {lift.tempo}
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

function LiftComponent(lift: Lift) {
  return (
    <tr>
      <td className="border p-1">
        <h3 className="text-left">{lift.name}</h3>
      </td>
      <td className="border p-1">
        <p>{lift.reps}</p>
      </td>
      <td className="border p-1">
        <p>{lift.tempo}</p>
      </td>
    </tr>
  );
}
