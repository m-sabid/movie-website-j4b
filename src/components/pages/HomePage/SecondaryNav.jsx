import { AuthContext } from "@/providers/firebase/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import SearchBarOnHeroSection from "./SearchBarOnHeroSection";
import { ThemeContext } from "@/providers/colors/GlobalColors";
import { AllMoviesContext } from "@/providers/data/AllMoviesData";
import Logo from "../../../../public/logo.png"

const SecondaryNav = ({ onSearch }) => {
  const { recentMovies,industries } = useContext(AllMoviesContext);

  const { user, logout } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);

  const [isSticky, setIsSticky] = useState(false);

  // Extract unique values for movie filters
  // const releaseYear = Array.from(
  //   new Set(recentMovies.map((movie) => movie.releaseYear))
  // ).sort((a, b) => b - a);
  // const genres = Array.from(
  //   new Set(recentMovies.flatMap((movie) => movie.genre))
  // ).sort();
  // const movieIndustries = Array.from(
  //   new Set(industries.flatMap((movie) => movie.industryName))
  // ).sort();

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
    <div
      className={`navbar text-white py-2 transition-colors w-full ${
        isSticky ? "bg-gray-800 fixed top-0 z-50" : "bg-gray-800 bg-opacity-60"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
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
            </svg>
          </label>
          {/* <ul
            tabIndex={0}
            className="menu bg-gray-800 dropdown-content mt-3 z-[100] p-2 shadow w-52 h-[100vh] overflow-y-scroll"
          >
            <li>
              <details close>
                <summary>Industry</summary>
                <ul>
                  {movieIndustries.map((industry, index) => (
                    <li key={index} className="capitalize">
                      <a>{industry}</a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <details close>
                <summary>Release Year</summary>
                <ul>
                  {releaseYear.map((year, index) => (
                    <li key={index} className="capitalize">
                      <a>{year}</a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <details close>
                <summary>Genre</summary>
                <ul>
                  {genres.map((genre, index) => (
                    <li key={index} className="capitalize">
                      <a>{genre}</a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul> */}
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <Image src={Logo} width={40} height={40} alt="j4b movie" /> J4B Movies
        </Link>
        {isSticky && (
          <div className="hidden md:flex">
            <SearchBarOnHeroSection onSearch={onSearch} isSticky={isSticky} />
          </div>
        )}
      </div>

      <div className="navbar-end">
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
  );
};

export default SecondaryNav;
