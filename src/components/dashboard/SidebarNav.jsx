"use client";

import Link from "next/link";
import React from "react";
import { FaBell, FaChartBar, FaHome } from "react-icons/fa";

const menus = [
  {
    name: "Dashboard",
    path: "",
    icon: <FaHome width={18} className="text-blue-500" />,
    isActive: true,
  },
  {
    name: "Analytics",
    path: "/home",
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
  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/*  */}
          {/*  */}
          <div className="lg:hidden">
            <div className="navbar bg-gray-500 text-white">
              <div className="flex-none">
                <button className="btn  btn-square btn-ghost">
                  <label
                    htmlFor="my-drawer-2"
                    className="btn bg-gray-500 text-white drawer-button lg:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-5 h-5 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </button>
              </div>
              <div className="flex-1">
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">
                  J4B Movies
                </Link>
              </div>
              <div className="flex-none"></div>
            </div>

            {/*  */}
            {/*  */}

            {/* Page content here */}
            <div className="p-8">{children}</div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-gray-600 text-white">
            {/* Sidebar content here */}
            {menus.map((menu, index) => (
              <li key={index}>
                <Link href={menu.path}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
