import { SuperSet } from "@/types/lifts";
import styles from "./Workout.module.css";

export default function SuperSetRow({
  superset,
  last,
}: {
  superset: SuperSet;
  last: boolean;
}) {
  return (
    <tr className="relative">
      {/* Mobile/Tablet: Single column layout */}
      <td className="block lg:table-cell py-3 px-4 lg:ps-5 lg:py-">
        <div className="lg:hidden">
          <div className="flex items-start gap-2 mb-3">
            <span className="font-bold text-xl text-red-orange font-montserrat">
              SS
            </span>
            <div className="flex-1">
              {superset.superset.map((lift, index) => (
                <div key={lift.id} className="mb-3 last:mb-0">
                  <h3
                    className={`text-left font-semibold font-montserrat text-lg sm:text-xl mb-2 ${
                      index === superset.superset.length - 1
                        ? "text-red-300"
                        : ""
                    }`}
                  >
                    {lift.exercise}
                  </h3>
                  <div className="flex gap-6 text-base sm:text-lg items-center">
                    <div>
                      <span className="text-gray-400 font-montserrat mr-2">
                        Reps:
                      </span>
                      <span
                        className={`font-semibold font-montserrat ${
                          index === superset.superset.length - 1
                            ? "text-red-300"
                            : ""
                        }`}
                      >
                        {lift.reps}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-montserrat mr-2">
                        Tempo:
                      </span>
                      <span
                        className={`font-semibold font-montserrat ${
                          index === superset.superset.length - 1
                            ? "text-red-300"
                            : ""
                        }`}
                      >
                        {!lift.tempo ? (
                          <span className="text-2xl">-</span>
                        ) : (
                          lift.tempo
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Desktop: Keep original table layout */}
        <div className="hidden lg:flex flex-row text-left">
          <span className="font-bold text-2xl col text-red-orange font-montserrat">
            SS
          </span>
          <ul className="pt-3 pl-5">
            {superset.superset.map((lift, index) => (
              <li
                key={lift.id}
                className={`ml-1 text-left font-semibold font-montserrat text-2xl mb-1 
                    ${
                      index === superset.superset.length - 1 && "text-red-300"
                    } `}
              >
                {lift.exercise}
              </li>
            ))}
          </ul>
        </div>
      </td>
      <td className="hidden lg:table-cell p-1 font-semibold text-lg">
        <ul className="pt-3 flex flex-col">
          {superset.superset.map((lift, index) => (
            <li
              key={lift.id}
              className={`text-left font-semibold font-montserrat text-2xl mb-1 
                  ${index === superset.superset.length - 1 && "text-red-300"} `}
            >
              {lift.reps}
            </li>
          ))}
        </ul>
      </td>
      <td className="hidden lg:table-cell p-1  font-semibold text-lg">
        <ul className="pt-3 flex flex-col">
          {superset.superset.map((lift, index) => (
            <li
              key={lift.id}
              className={`text-left font-semibold font-montserrat text-2xl 
                  ${
                    index === superset.superset.length - 1 &&
                    "text-red-300 mb-2"
                  } `}
            >
              {!lift.tempo ? <span className="text-4xl">-</span> : lift.tempo}
            </li>
          ))}
        </ul>
      </td>
      {!last && (
        <div className="absolute bottom-0 left-0 w-full flex justify-center">
          <hr className={styles["lift-row-divider"]} />
        </div>
      )}
    </tr>
  );
}
