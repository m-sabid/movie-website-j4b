import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../../../../public/logo.png";
import Image from "next/image";
import Cookies from "js-cookie";

const MainNav = () => {
  const [linkPath, setLinkPath] = useState("/login");

  useEffect(() => {
    const userRole = Cookies.get("userRole");

    if (userRole === "user") {
      setLinkPath("/profile");
    } else if (userRole === "admin") {
      setLinkPath("/dashboard/home");
    } else {
      setLinkPath("/login");
    }
  }, []);

  return (
    <div className="navbar bg-transparent text-white">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost normal-case text-xl">
          <Image src={Logo} alt="logo" width={40} /> J4B MOVIES
          <sup className="badge badge-primary">Beta v0.2.0</sup>
        </Link>
      </div>
      <div className="flex-none">
        <Link href={linkPath} className="btn btn-square btn-ghost">
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
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default MainNav;
