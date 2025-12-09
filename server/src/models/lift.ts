/**
 * @alias Lift model representing a workout lift
 */
export default class Lift {
  /**
   * Creates an instance of Lift.
   * @param {string} name - Name of the lift
   * @param {string} reps - Reps and sets of the lift
   * @param {string} tempo - Tempo of the lift
   * @param {number} id - Unique identifier for the lift (optional)
   */
  constructor(
    public name: string,
    public reps: string,
    public tempo: string,
    public id?: number
  ) {
    this.id = id ?? Date.now() + Math.floor(Math.random() * 1000);
  }

  /**
   * Returns a string representation of the Lift instance.
   */
  public toString(): string {
    return `Lift: ${this.name}, Reps: ${this.reps}, Tempo: ${this.tempo}, ID: ${this.id}`;
  }
}
