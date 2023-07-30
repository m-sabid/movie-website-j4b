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

const SidebarNav = () => {
  return (
    <div>
      <ul>
        {menus.map((menu, index) => (
          <li key={index}>{menu.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarNav;
