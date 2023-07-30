"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBell, FaChartBar, FaHome, FaRegBell } from "react-icons/fa";
import TopNav from "./TopNAv";

const menus = [
  {
    name: "Dashboard",
    path: "",
    icon: <FaHome width={18} className="text-blue-500" />,
    isActive: true,
  },
  {
    name: "Analytics",
    path: "home",
    isActive: true,
    icon: <FaChartBar width={18} className="text-gray-600" />,
  },
  {
    name: "Notification",
    path: "home",
    isActive: false,
    icon: <FaBell width={18} className="text-gray-600" />,
  },
];

const SidebarNav = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className={`drawer ${isDrawerOpen ? "" : "lg:drawer-open"}`}>
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          defaultChecked={isDrawerOpen}
        />
        <div className="drawer-content flex flex-col w-full">
          <div className="navbar w-full bg-gray-800 text-white h-16 lg:hidden">
            <div className="navbar-start">
              {/* Attach the onClick event to toggle the drawer */}
              <label
                htmlFor="my-drawer-2"
                className="w-full"
                onClick={toggleDrawer}
              >
                <a tabIndex={0} className="btn btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </a>
              </label>
            </div>

            <div className="navbar-center">
              <Link href={"/"} className="btn btn-ghost normal-case text-xl">
                J4B Movies
              </Link>
            </div>
            <div className="navbar-end">
              <button className="btn btn-ghost btn-circle mr-5">
                <div className="indicator">
                  <span className="indicator-item badge badge-secondary">
                    99+
                  </span>
                  <FaRegBell className="text-3xl" />
                </div>
              </button>
            </div>
          </div>

          <div className="w-full hidden lg:block">
            <TopNav />
          </div>

          <div className="p-2 lg:p-10">{children}</div>
        </div>
        <div className="drawer-side">
          {/* Attach the onClick event to toggle the drawer */}
          <label
            htmlFor="my-drawer-2"
            className="drawer-overlay"
            onClick={toggleDrawer}
          ></label>
          <ul className="menu p-4 w-80 h-full mt-16 lg:mt-0 bg-gray-600 text-white shadow-lg">
            {/* Sidebar content here */}
            <li>J4B Movies</li>

            {menus.map((menu, index) => {
              return (
                <li key={index}>
                  <Link
                    href={`/dashboard/${menu.path}`}
                    onClick={window.innerWidth < 768 ? toggleDrawer : undefined}
                  >
                    {menu.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarNav;
