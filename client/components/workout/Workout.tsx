import { Lift, SuperSet } from "@/types/lifts";
import { getTodayWorkout } from "@/lib/supabase/utils/lifts";
import { isSuperSet } from "@/utils/utils";
import Loading from "../ui/loading/Loading";

export default async function Workout() {
  const lifts = await getTodayWorkout();

  if (!lifts) {
    return <p>No lifts available</p>;
  }

  return (
    <>
      <div className="bg-secondary rounded-lg  shadow-md  overflow-hidden">
        <table className="table-fixed w-full">
          <col className="w-full" />
          <col className="w-[250px]" />
          <col className="w-[250px]" />
          <thead className="bg-primary text-white">
            <tr className="bg-primary py-3">
              <th className="text-3xl text-left ps-3 py-2">Exercise</th>
              <th className="text-3xl text-left py-2">Reps</th>
              <th className="text-3xl text-left py-2 ">Tempo</th>
            </tr>
          </thead>
          <tbody>
            {lifts.map((lift: Lift | SuperSet, i) => {
              if (isSuperSet(lift)) {
                return <SuperSetComponent key={lift.id} {...lift} />;
              } else {
                return <LiftComponent key={lift.id} {...lift} />;
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function SuperSetComponent(superset: SuperSet) {
  return (
    <tr className={`border-t border-dark-gray`}>
      <td className="flex flex-row text-left ps-3">
        <span className="font-bold text-xl col text-red-orange">SS</span>
        <ul className="pt-3 pl-3">
          {superset.superset.map((lift) => (
            <li key={lift.id} className="ml-1 font-semibold text-lg">
              {lift.exercise}
            </li>
          ))}
        </ul>
      </td>
      <td className=" p-1 font-semibold text-lg">
        <ul className="pt-3 ">
          {superset.superset.map((lift) => (
            <li key={lift.id} className="ml-1 font-semibold text-lg">
              {lift.reps}
            </li>
          ))}
        </ul>
      </td>
      <td className=" p-1 font-semibold text-lg">
        <ul className="pt-3 ">
          {superset.superset.map((lift) => (
            <li key={lift.id} className="ml-1 font-semibold text-lg">
              {lift.tempo}
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

type LiftComponentProps = {
  lift: Lift;
  isLast?: boolean;
};

export function LiftComponent(lift: Lift) {
  return (
    <tr className="border-t border-dark-gray">
      <td className="py-2 px-3">
        <h3 className="text-left font-semibold text-lg">{lift.exercise}</h3>
      </td>
      <td className=" p-1 font-semibold text-lg">
        <p>{lift.reps}</p>
      </td>
      <td className=" p-1 font-semibold text-lg">
        <p>{lift.tempo}</p>
      </td>
    </tr>
  );
}
