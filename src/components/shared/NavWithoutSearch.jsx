import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/providers/firebase/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/providers/colors/GlobalColors";

const NavWithoutSearch = () => {
  const { user, logout } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);

  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);

  const handleLogout = () => {
    logout(); // Calls the logout function from AuthContext
    router.push("/login"); // Redirects to login page after logout
  };

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
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          J4B Movies
        </Link>
      </div>

      <div className="navbar-end">
        {user?.email ? (
          <div className="dropdown dropdown-end bg-gray-800">
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
                <button onClick={handleLogout}>Logout</button>
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
    </div>
  );
};

export default NavWithoutSearch;
