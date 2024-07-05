import { AuthContext } from "@/providers/firebase/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import SearchBarOnHeroSection from "./SearchBarOnHeroSection";

const SecondaryNav = ({ onSearch, filmIndustries, releaseYear, genres }) => {
  const { user } = useContext(AuthContext);
  const [isSticky, setIsSticky] = useState(false);

  const { logout } = useContext(AuthContext);

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
            <label tabIndex={0} className="btn btn-ghost">
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
            {/* manus */}

            <ul
              tabIndex={0}
              className="block menu rounded-sm bg-gray-800 menu-sm dropdown-content mt-3 z-[100] p-2 shadow w-52 h-[80vh] overflow-y-scroll"
            >
              <li>
                <details close>
                  <summary>Industry</summary>
                  <ul>
                    {filmIndustries.map((dt, index) => (
                      <li key={index} className="capitalize">
                        <a>{dt.industryName}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
              <li>
              <details close>
                  <summary>Release Year</summary>
                  <ul>
                    {releaseYear.map((dt, index) => (
                      <li key={index} className="capitalize">
                        <a>{dt}</a>
                      </li>
                    ))}
                  </ul>
                </details>
                {/* 3 */}
              <details close>
                  <summary>Release Year</summary>
                  <ul>
                    {genres.map((dt, index) => (
                      <li key={index} className="capitalize">
                        <a>{dt}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
            {/* manus end */}
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            J4B Movies
          </Link>
          {isSticky && (
            <div className="hidden md:flex">
              <SearchBarOnHeroSection onSearch={onSearch} isSticky={isSticky} />
            </div>
          )}
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
            <div className="dropdown dropdown-end">
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
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 bg-gray-800"
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
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href={"/login"} className="btn bg-red-300">
              Login
            </Link>
          )}
        </div>
        {isSticky && (
          <div className="md:hidden fixed top-16">
            <SearchBarOnHeroSection onSearch={onSearch} isSticky={isSticky} />
          </div>
        )}
      </div>
    </>
  );
};

export default SecondaryNav;
