import Link from "next/link";
import React from "react";
import { FaRegBell } from "react-icons/fa";

const TopNav = () => {
  return (
    <div className="bg-blue-300 px-8 flex items-center justify-between h-16 border-b-2 shadow-lg">
      <div>hello</div>

      <div className="indicator">
        <span className="indicator-item badge badge-secondary">99+</span>
        <FaRegBell className="text-3xl" />
      </div>
    </div>
  );
};

export default TopNav;
