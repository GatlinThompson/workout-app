import Loading from "@/components/ui/loading/Loading";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen overflow-hidden">
      <Loading />
    </div>
  );
}
