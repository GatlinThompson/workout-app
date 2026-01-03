import { Lift } from "@/types/lifts";
import styles from "./Workout.module.css";

export default function LiftRow({ lift, last }: { lift: Lift; last: boolean }) {
  return (
    <tr className="relative hover:bg-gray-800/30">
      {/* Mobile/Tablet: Single column layout */}
      <td className="block lg:table-cell py-3 px-4 lg:px-5">
        <div className="lg:hidden">
          <h3 className="text-left font-semibold font-montserrat text-lg sm:text-xl mb-3">
            {lift.exercise}
          </h3>
          <div className="flex gap-6 text-base sm:text-lg justify-start items-center mb-3">
            <div>
              <span className="text-gray-400 font-montserrat mr-2">Reps:</span>
              <span className="font-semibold font-montserrat">{lift.reps}</span>
            </div>
            <div>
              <span className="text-gray-400 font-montserrat mr-2">Tempo:</span>
              <span className="font-semibold font-montserrat">
                {!lift.tempo ? <span className="text-2xl">-</span> : lift.tempo}
              </span>
            </div>
          </div>
        </div>
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
        <div className="absolute bottom-0 left-0 w-full flex justify-center ">
          <hr className={styles["lift-row-divider"]} />
        </div>
      )}
    </tr>
  );
}
