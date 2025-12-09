import Lift from "./lift";

/**
 * @alias SuperSet model representing a superset of lifts
 */
export default class SuperSet {
  /**
   * @param {Lift[]} superset - Array of Lift instances included in the superset
   * @param {number} id - Unique identifier for the superset (optional)
   */
  constructor(public superset: Lift[], public id?: number) {
    this.superset = superset;
    this.id = id ?? Date.now();
  }

  /**
   * String representation of the SuperSet instance.
   */
  public toString(): string {
    const superSetDetails = this.superset
      .map(
        (lift, index) =>
          `  Lift ${index + 1}: ${lift.name}, Reps: ${lift.reps}, Tempo: ${
            lift.tempo
          }, ID: ${lift.id}`
      )
      .join("\n");

    return `SuperSet ID: ${this.id}\nLifts:\n${superSetDetails}`;
  }
}
