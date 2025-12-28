export type Lift = {
  id: number;
  exercise: string;
  reps: string;
  tempo: string;
};

export type SuperSet = {
  id: number;
  superset: Lift[];
};
