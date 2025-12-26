"use client";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <div className={`text-center ${className}`}>
      <button
        onClick={onClick}
        type={type}
        className="bg-neutral-900  w-100 p-2 rounded-lg font-bold text-white"
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}
