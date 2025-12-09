import Workout from "@/components/workout/Workout";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Workout />
      </main>
    </div>
  );
}
