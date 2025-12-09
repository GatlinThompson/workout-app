import Lift from "./lift";
import SuperSet from "./superset";

/**
 * @alias Workout model representing a workout
 */
export default class Workout {
  private workout: (Lift | SuperSet)[] = [];
  /**
   * Creates an instance of Workout.
   * @param {Date} date Date of the workout
   * @param {number} id Unique identifier for the workout - optional
   */
  constructor(public date: Date, public id?: number) {
    if (!id) {
      this.id = Math.floor(Date.now());
    } else {
      this.id = id;
    }
    this.date = date;
  }

  /**
   * Adds a lift or superset to the workout.
   * @param {Lift | SuperSet} lift Lift or SuperSet instance to add
   */
  public addLift(lift: Lift | SuperSet): void {
    this.workout.push(lift);
  }

  /**
   * Removes a lift or superset from the workout by its ID.
   * @param {number} liftId ID of the lift or superset to remove
   */
  public removeLift(liftId: number): void {
    this.workout = this.workout.filter((lift) => lift.id !== liftId);
  }
}
