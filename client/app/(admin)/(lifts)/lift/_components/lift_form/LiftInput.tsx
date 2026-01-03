import { useEffect, useState } from "react";
import LiftOptions from "./LiftOptions";
import { motion, AnimatePresence } from "framer-motion";
import Input from "@/components/ui/Input";
import ToggleButton from "./ToggleButton";

type LiftFields = {
  exercise: string;
  reps: string;
  tempo: string;
};

type LiftInputValue = LiftFields & {
  superSet: LiftFields | null;
};

const emptyLift: LiftFields = { exercise: "", reps: "", tempo: "" };

type Props = {
  sequence: number;
  initialData?: {
    lift: LiftInputValue;
  };
};

export default function LiftInput({ sequence, initialData }: Props) {
  const [liftObject, setLiftObject] = useState<LiftInputValue>(() => {
    if (initialData?.lift) {
      return {
        exercise: initialData.lift.exercise || "",
        reps: initialData.lift.reps || "",
        tempo: initialData.lift.tempo || "",
        superSet: initialData.lift.superSet
          ? {
              exercise: initialData.lift.superSet.exercise || "",
              reps: initialData.lift.superSet.reps || "",
              tempo: initialData.lift.superSet.tempo || "",
            }
          : null,
      };
    }
    return {
      ...emptyLift,
      superSet: null,
    };
  });

  const [superSetEnabled, setSuperSetEnabled] = useState(
    !!initialData?.lift?.superSet
  );

  // Keep liftObject.superSet in sync with the checkbox
  // Only set to empty when toggling ON from OFF (don't clear existing data)
  useEffect(() => {
    setLiftObject((prev) => ({
      ...prev,
      superSet: superSetEnabled
        ? prev.superSet || { ...emptyLift } // Keep existing or create new
        : null,
    }));
  }, [superSetEnabled]);

  const updateMain = (key: keyof LiftFields, value: string) => {
    setLiftObject((prev) => ({ ...prev, [key]: value }));
  };

  const updateSuper = (key: keyof LiftFields, value: string) => {
    setLiftObject((prev) => ({
      ...prev,
      superSet: prev.superSet
        ? { ...prev.superSet, [key]: value }
        : prev.superSet,
    }));
  };

  return (
    <motion.div layout transition={{ duration: 0.3, ease: "easeInOut" }}>
      {/* hidden inputs must be strings */}
      <input
        type="hidden"
        value={JSON.stringify({ lift: { ...liftObject }, sequence: sequence })}
        name={`lift`}
      />
      <div className="grid grid-cols-2 gap-x-10 gap-y-4 grid-rows-2">
        <Input
          title="Exercise"
          name={false}
          value={liftObject.exercise}
          onChange={(e) => updateMain("exercise", e.target.value)}
          placeholder="Exercise Name"
          className="col-start-1 col-end-3"
        />
        <Input
          title="Reps"
          name={false}
          value={liftObject.reps}
          onChange={(e) => updateMain("reps", e.target.value)}
          placeholder="Reps"
        />

        <Input
          title="Tempo"
          name={false}
          value={liftObject.tempo}
          onChange={(e) => updateMain("tempo", e.target.value)}
          placeholder="Tempo"
        />
      </div>

      <div className="mt-2 flex items-center gap-2 mt-4">
        <ToggleButton
          OnChange={() => setSuperSetEnabled((prev) => !prev)}
          toggled={superSetEnabled}
          title="Superset"
        />
      </div>

      <div className="overflow-hidden">
        <AnimatePresence initial={false}>
          {superSetEnabled && liftObject.superSet && (
            <motion.div
              key="superset"
              layout
              initial={{ opacity: 0, height: 0, y: -100 }}
              animate={{ opacity: 1, height: "stretch", y: 0 }}
              exit={{ opacity: 0, height: 1, y: -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="text-xl font-semibold my-3">Superset Lift</h3>
              <div className="grid grid-cols-2 gap-x-10 gap-y-4 grid-rows-2">
                <Input
                  title="Superset Exercise"
                  name={false}
                  value={liftObject.superSet.exercise}
                  onChange={(e) => updateSuper("exercise", e.target.value)}
                  placeholder="Exercise Name"
                  className="col-start-1 col-end-3"
                />
                <Input
                  title="Superset Reps"
                  name={false}
                  value={liftObject.superSet.reps}
                  onChange={(e) => updateSuper("reps", e.target.value)}
                  placeholder="Superset Reps"
                />

                <Input
                  title="Superset Tempo"
                  name={false}
                  value={liftObject.superSet.tempo}
                  onChange={(e) => updateSuper("tempo", e.target.value)}
                  placeholder="Superset Tempo"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
