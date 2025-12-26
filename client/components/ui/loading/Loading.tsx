import React from "react";
import Spinner from "../Spinner";

import LoadingDot from "./LoadingDot";

type LoadingProps = {};

export default function Loading() {
  return (
    <div>
      <Spinner className="w-36" />
      <div className="mt-4 flex justify-center items-end">
        <span className="text-3xl">loading</span>
        <LoadingDot />
        <LoadingDot delay={0.75} />
        <LoadingDot delay={1.5} />
      </div>
    </div>
  );
}
