import React from "react";
import { FaInbox } from "react-icons/fa";

function NoData({ message = "No data found" }) {
  return (
    <div className="flex flex-col items-center justify-center w-full text-gray-400 py-5">
      <FaInbox className="text-6xl text-blue-200 mb-4" />
      <h1 className="text-2xl md:text-3xl font-bold">{message}</h1>
    </div>
  );
}

export default NoData;
