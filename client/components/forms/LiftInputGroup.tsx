"use client";

import Button from "@/components/ui/Button";
import LiftInput from "./LiftInput";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LiftInput.module.css";
import { BsX as Cross } from "react-icons/bs";

type LiftRow = { id: string; data?: any };

const makeId = () => crypto.randomUUID();

type Props = {
  initialLifts?: any[];
};

export default function LiftInputGroup({ initialLifts }: Props) {
  const [removedLiftIds, setRemovedLiftIds] = useState<number[]>([]);
  const [lifts, setLifts] = useState<LiftRow[]>(() => {
    if (initialLifts && initialLifts.length > 0) {
      return initialLifts.map((lift) => ({ id: lift.lift.id, data: lift }));
    }
    return [{ id: makeId() }];
  });

  const removeLift = (id: string) => {
    if (initialLifts && initialLifts.length > 0) {
      setRemovedLiftIds([...removedLiftIds, parseInt(id)]);
    }
    setLifts((prev) => prev.filter((l) => l.id !== id));
  };

  const addLift = () => {
    setLifts((prev) => [...prev, { id: makeId() }]);
  };

  const moveLift = (fromIndex: number, toIndex: number) => {
    setLifts((prev) => {
      if (toIndex < 0 || toIndex >= prev.length) return prev;

      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  return (
    <div>
      {initialLifts && initialLifts.length > 0 && (
        <input
          type="hidden"
          name="removed_lifts"
          value={JSON.stringify(removedLiftIds)}
        />
      )}
      <AnimatePresence initial={false}>
        <motion.div layout transition={{ duration: 0.2, ease: "easeInOut" }}>
          {lifts.map((lift, index) => (
            <motion.div
              key={lift.id}
              layout
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`mb-10 p-3 md:p-6 rounded-lg shadow-lg ${styles["input-group"]}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-3xl font-semibold font-montserrat">
                    Lift {index + 1}
                  </h2>
                  <div>
                    {lifts.length > 1 && (
                      <button type="button" onClick={() => removeLift(lift.id)}>
                        <div>
                          <Cross className="w-12 h-12 text-red-orange hover:text-red-800" />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 my-4">
                  {index !== 0 && (
                    <Button
                      type="button"
                      onClick={() => moveLift(index, index - 1)}
                      disabled={index === 0}
                    >
                      Up
                    </Button>
                  )}
                  {index !== lifts.length - 1 && (
                    <Button
                      type="button"
                      onClick={() => moveLift(index, index + 1)}
                      disabled={index === lifts.length - 1}
                    >
                      Down
                    </Button>
                  )}
                </div>
                <LiftInput sequence={index + 1} initialData={lift.data} />
              </div>
            </motion.div>
          ))}
          <Button type="button" onClick={addLift} className="m-4">
            Add Another Lift
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
