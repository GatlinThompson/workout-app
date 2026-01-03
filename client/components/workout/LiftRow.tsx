import { Lift } from "@/types/lifts";
import styles from "./Workout.module.css";

export default function LiftRow({ lift, last }: { lift: Lift; last: boolean }) {
  return (
    <tr className="relative">
      {/* Mobile/Tablet: Single column layout */}
      <td className="block lg:table-cell py-3 px-4 lg:px-5">
        <section className="lg:hidden">
          <h3 className="text-left font-semibold font-montserrat text-lg sm:text-xl mb-3">
            {lift.exercise}
          </h3>
          <ul className="flex gap-6 text-base sm:text-lg justify-start items-center mb-3 list-none p-0 m-0">
            <li>
              <span className="text-gray-400 font-montserrat mr-2">Reps:</span>
              <span className="font-semibold font-montserrat">{lift.reps}</span>
            </li>
            <li>
              <span className="text-gray-400 font-montserrat mr-2">Tempo:</span>
              <span className="font-semibold font-montserrat">
                {!lift.tempo ? <span className="text-2xl">-</span> : lift.tempo}
              </span>
            </li>
          </ul>
        </section>
        {/* Desktop: Keep original table layout */}
        <h3 className="hidden lg:block text-left font-semibold font-montserrat text-2xl mb-2">
          {lift.exercise}
        </h3>
      </td>
      <td className="hidden lg:table-cell text-left font-semibold font-montserrat text-2xl mb-2">
        {lift.reps}
      </td>
      <td className="hidden lg:table-cell text-left font-semibold font-montserrat text-2xl mb-2">
        {!lift.tempo ? <span className="text-4xl">-</span> : lift.tempo}
      </td>

      {!last && (
        <td className="absolute bottom-[-8px] left-0 w-full flex justify-center pointer-events-none">
          <hr className={styles["lift-row-divider"]} />
        </td>
      )}
    </tr>
  );
}
