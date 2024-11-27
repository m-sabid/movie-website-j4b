import { AuthContext } from "@/providers/firebase/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import SearchBarOnHeroSection from "./SearchBarOnHeroSection";
import { ThemeContext } from "@/providers/colors/GlobalColors";
import Logo from "../../../../public/logo.png";
import { useLenis } from "@studio-freight/react-lenis";
import TypographyWrapper from "@/components/shared/TypographyWrapper";

const SecondaryNav = ({ onSearch }) => {
  const { user, logout } = useContext(AuthContext);
  const { colors, siteInfo } = useContext(ThemeContext);

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

  // scroll
  const lenis = useLenis();

  return (
    <TypographyWrapper>
      <div
        className={`navbar text-white py-2 transition-colors w-full ${
          isSticky
            ? "bg-gray-800 fixed top-0 z-50"
            : "bg-gray-800 bg-opacity-60"
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown md:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>{" "}
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-sm z-[999] mt-3 w-52 p-2 shadow"
              style={{ backgroundColor: colors.mo_secondary }}
            >
              <li
                onClick={() =>
                  lenis.scrollTo("#bollywood_movie", { lerp: 0.1 })
                }
              >
                <Link href="#bollywood_movie">bollywood</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <Image src={Logo} width={40} height={40} alt="j4b movie" />
            {siteInfo?.siteName || ""}
          </Link>
          {isSticky && (
            <div className="hidden md:flex">
              <SearchBarOnHeroSection onSearch={onSearch} isSticky={isSticky} />
            </div>
          )}
        </div>

        <div className="navbar-end">
          <ul className="hidden md:block uppercase menu">
            <li
              onClick={() => lenis.scrollTo("#bollywood_movie", { lerp: 0.1 })}
            >
              <Link href="#bollywood_movie">bollywood</Link>
            </li>
          </ul>

          {user?.email ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt="User Avatar"
                    src={user?.profilePicture}
                    width={100}
                    height={100}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu dropdown-content bg-gray-800 rounded-box w-52"
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
            <Link
              href="/login"
              className="btn"
              style={{
                backgroundColor: colors.mo_primary,
                transition: "background-color 0.5s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = colors.mo_quaternary)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = colors.mo_primary)
              }
            >
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
    </TypographyWrapper>
  );
};

export default SecondaryNav;
