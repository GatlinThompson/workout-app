import { SuperSet } from "@/types/lifts";

/**
 *
 * @param superset the superset to display
 * @param className optional additional class names
 * @returns the mobile view of a superset row
 */

export default function MobileSuperSetRow({
  superset,
  className,
}: {
  superset: SuperSet;
  className?: string;
}) {
  return (
    <article className={`flex items-start gap-2 ${className}`}>
      <span className="font-bold text-xl text-red-orange font-montserrat">
        SS
      </span>
      <ul className="flex-1 list-none p-0 m-0">
        {superset.superset.map((lift, index) => (
          <li key={lift.id} className="mb-3 last:mb-0">
            <h3
              className={`text-left font-semibold font-montserrat text-lg sm:text-xl mb-2 ${
                index === superset.superset.length - 1 ? "text-red-300" : ""
              }`}
            >
              {lift.exercise}
            </h3>
            <ul className="flex gap-6 text-base sm:text-lg items-center list-none p-0 m-0">
              <li>
                <span className="text-gray-400 font-montserrat mr-2">
                  Reps:
                </span>
                <span
                  className={`font-semibold font-montserrat ${
                    index === superset.superset.length - 1 ? "text-red-300" : ""
                  }`}
                >
                  {lift.reps}
                </span>
              </li>
              <li>
                <span className="text-gray-400 font-montserrat mr-2">
                  Tempo:
                </span>
                <span
                  className={`font-semibold font-montserrat ${
                    index === superset.superset.length - 1 ? "text-red-300" : ""
                  }`}
                >
                  {!lift.tempo ? (
                    <span className="text-2xl">-</span>
                  ) : (
                    lift.tempo
                  )}
                </span>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </article>
  );
}
