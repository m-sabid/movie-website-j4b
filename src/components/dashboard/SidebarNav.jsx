"use client";
import { ThemeContext } from "@/providers/colors/GlobalColors";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import {
  FaFileMedical,
  FaFilm,
  FaFolderPlus,
  FaHome,
  FaHospital,
  FaIcons,
  FaWhmcs,
} from "react-icons/fa";

const menus = [
  {
    name: "Home",
    path: "/dashboard/home",
    icon: <FaHome className="text-white" />,
  },
  {
    name: "Add cinemas",
    path: "/dashboard/add_cinemas",
    icon: <FaFolderPlus className="text-white" />,
  },
  {
    name: "All cinemas",
    path: "/dashboard/all_cinemas",
    icon: <FaFilm className="text-white" />,
  },
  {
    name: "Add genre",
    path: "/dashboard/add_genre",
    icon: <FaIcons className="text-white" />,
  },
  {
    name: "Add industry",
    path: "/dashboard/add_industry",
    icon: <FaHospital className="text-white" />,
  },
  {
    name: "Add language",
    path: "/dashboard/add_language",
    icon: <FaFileMedical className="text-white" />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <FaWhmcs className="text-white" />,
  },
];

const SidebarNav = ({ children }) => {
  const { colors } = useContext(ThemeContext);
  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/*  */}
          {/*  */}
          <div className="lg:hidden">
            <div
              className="navbar text-white"
              style={{ backgroundColor: colors.mo_primary }}
            >
              <div className="flex-none">
                <button className="btn  btn-square btn-ghost">
                  <label
                    htmlFor="my-drawer-2"
                    className="btn text-white drawer-button lg:hidden"
                    style={{ backgroundColor: colors.mo_primary }}
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
          </div>
          {/* Page content here */}
          <div className="p-1 lg:p-8">{children}</div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul
            className="menu p-4 md:w-80 w-fit h-full text-white"
            style={{ backgroundColor: colors.mo_db_primary }}
          >
            <Link
              href={"/"}
              className="text-2xl hidden lg:flex justify-center items-center"
            >
              J4B Movies
            </Link>
            <div className="divider hidden lg:flex"></div>
            {/* Sidebar content here */}
            {menus.map((menu, index) => (
              <li
                key={index}
                className="border-b-2 border-gray-700 rounded-lg my-2 shadow-lg"
              >
                <Link href={menu.path}>
                  <span className="text-xl">{menu.icon}</span>
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
