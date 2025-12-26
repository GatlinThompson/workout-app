import { Router } from "express";
import authRouter from "./auth.routes";
import liftRouter from "./lift.routes";
import Lift from "../models/lift";
import SuperSet from "../models/superset";
import Workout from "../models/workout";

const router = Router();

router.get("/", (req, res) => {
  const workout = new Workout(new Date());
  const lift = new Lift("Squat", "5x5", "2020");
  const lift2 = new Lift("Bench Press", "5x5", "2020", 342);

  const superSet = new SuperSet([lift, lift2]);
  workout.addLift(lift);
  workout.addLift(lift2);
  workout.addLift(superSet);
  console.log(workout);

  res.send(workout);
});

router.get("/time", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
});

router.use("/auth", authRouter);
router.use("/lift", liftRouter);
export default router;
