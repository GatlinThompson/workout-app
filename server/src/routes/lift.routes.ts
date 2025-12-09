import { Router } from "express";
import Workout from "../models/workout";
import Lift from "../models/lift";
import SuperSet from "../models/superset";

const router = Router();

router.get("/", async (req, res) => {
  let workout = new Workout(new Date());
  const lift1 = new Lift("Ab Wheel", "30-45", "1-0-1");
  const lift2 = new Lift("Box Jumps", "20-30", "1-0-1");
  const lift3 = new Lift("Bench Press", "20-30", "1-0-1");
  const lift4 = new Lift("Front Raises", "20-30", "1-0-1");
  const lift5 = new Lift("Laterial Raises", "20-30", "1-0-1");
  const superSet1 = new SuperSet([lift4, lift5]);
  const lift6 = new Lift("T-bar Rows", "20-30", "1-0-1");

  workout.addLift(lift1);
  workout.addLift(lift2);
  workout.addLift(lift3);
  workout.addLift(superSet1);
  workout.addLift(lift6);

  res.status(200).json({
    message: "Lift route is working!",
    status: "success",
    workout: workout,
  });

  try {
    // Simulate async operation

    console.log("Lifts fetched:", []); // Replace [] with actual lift data
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lifts" });
  }
});

export default router;
