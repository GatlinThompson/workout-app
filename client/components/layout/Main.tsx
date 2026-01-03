type MainProps = { children: React.ReactNode; centered?: boolean };

export default function Main({ children, centered }: MainProps) {
  return (
    <main
      className={`flex flex-col gap-4 md:p-6 p-2 rounded-lg justify-items-center min-h-screen items-center ${
        centered ? "justify-center" : ""
      } `}
    >
      {children}
    </main>
  );
}
