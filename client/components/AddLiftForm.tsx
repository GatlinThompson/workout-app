"use client";

import Input from "./ui/Input";

export default function AddLiftForm() {
  const addLift = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add lift logic here
    const response = await fetch(`${process.env.API_PATH}/lift/addlift`);
  };
  return (
    <div className="">
      <form onSubmit={addLift}>
        <Input />
        <button type="submit">Add Lift</button>
      </form>
    </div>
  );
}
