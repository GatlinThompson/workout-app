type MainProps = { children: React.ReactNode };

export default function Main({ children }: MainProps) {
  return (
    <main className="flex flex-col gap-4 p-6 rounded-lg justify-items-center min-h-screen items-center ">
      {children}
    </main>
  );
}
