import { AuthContext } from "@/providers/firebase/AuthProvider";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import SearchBarOnHeroSection from "../pages/HomePage/SearchBarOnHeroSection";
import Image from "next/image";

const NavWithoutSearch = () => {
  const { user } = useContext(AuthContext);
  console.log(user, "user");

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.pageYOffset >= window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`navbar text-white py-2 transition-colors w-full ${
          isSticky
            ? "bg-gray-800 fixed top-0 z-50"
            : "bg-gray-800 bg-opacity-60"
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {/* <ul
              tabIndex={0}
              className="menu bg-gray-800 menu-sm dropdown-content mt-3 z-[100] p-2 shadow rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul> */}
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            J4B Movies
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {/* <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul> */}
        </div>
        <div className="navbar-end">
           {user?.email ? (
              <div className="dropdown dropdown-end bg-gray-800">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt="Tailwind CSS Navbar component"
                    src={user?.profilePicture}
                    width={100}
                    height={100}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-gray-800"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link href={"/login"} className="btn bg-red-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavWithoutSearch;
