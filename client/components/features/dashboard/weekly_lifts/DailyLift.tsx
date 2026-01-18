import Button from "@/components/ui/Button";
import GlassContainer from "@/components/ui/glass_card/GlassContainer";

type DailyLiftProps = {
  day: {
    date: string;
    dayName: string;
    exerciseCount: number;
    hasWorkout: boolean;
    workoutId?: string | number;
    fullDate: string;
  };
  index?: number;
};

const liftDays = [
  {
    Mon: "Chest",
    Tue: "Leg",
    Wed: "Arms",
    Thu: "Chest",
    Fri: "Leg",
    Sat: "Shoulder",
  },
];

export default function DailyLift({ day, index = 0 }: DailyLiftProps) {
  const liftLink =
    day.hasWorkout && day.workoutId
      ? `/lift/${day.workoutId}/edit`
      : `/lift?date=${day.fullDate}`;

  return (
    <GlassContainer className={`p-4 flex items-center justify-center `}>
      <div className="text-center">
        <div className="text-3xl font-semibold text-white">{day.dayName}</div>
        <div className="text-xl text-white/60">{day.date}</div>
        <div className="my-3">
          <div className="text-2xl font-bold text-white">
            {day.exerciseCount + " Lifts" || "No Workout Made"}
          </div>
          <Button bordered to={liftLink} className="mt-3 px-5 py-2 text-lg">
            {day.hasWorkout ? "View Workout" : "Create Workout"}
          </Button>
        </div>
        <div className="text-lg text-light-gray">
          {liftDays[0][day.dayName as keyof (typeof liftDays)[0]] || "Rest"} Day
        </div>
      </div>
    </GlassContainer>
  );
}
