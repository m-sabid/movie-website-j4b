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
          {/* Page content here */}
          <div className="p-8">{children}</div>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
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
