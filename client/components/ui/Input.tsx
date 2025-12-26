"use client";

import { titleCase } from "@/utils/utils";
import { error } from "console";

type InputProps = {
  title: string;
  type?: "text" | "number" | "email" | "password";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
};

export default function Input({
  title,
  onChange,
  value,
  type = "text",
  placeholder,
  error,
}: InputProps) {
  return (
    <div className="grid grid-row-2 gap-1">
      <label className="text-lg">{titleCase(title)}</label>
      <input
        type={type}
        name={title.toLocaleLowerCase()}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className="w-100 bg-zinc-800 rounded-lg py-1.5 px-2 text-white border border-white-600 text-md"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
