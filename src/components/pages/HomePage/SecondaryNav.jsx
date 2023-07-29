import Link from "next/link";
import React, { useState, useEffect } from "react";
import SearchBarOnHeroSection from "./SearchBarOnHeroSection";

const SecondaryNav = ({ onSearch, handleSearch }) => {
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
            <ul
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
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            J4B Movies
          </Link>
          {isSticky ? (
            <div className="hidden md:flex">
              <SearchBarOnHeroSection
                onSearch={handleSearch}
                isSticky={isSticky}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
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
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-red-300">Login</a>
        </div>
        {isSticky ? (
          <div className="md:hidden fixed top-16">
            <SearchBarOnHeroSection
              onSearch={handleSearch}
              isSticky={isSticky}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SecondaryNav;

// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import SearchBarOnHeroSection from "./SearchBarOnHeroSection";

// const SecondaryNav = ({ onSearch }) => {
//   const [isSticky, setIsSticky] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticky(window.pageYOffset >= window.innerHeight);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div
//       className={`px-4 py-2 transition-colors w-full ${
//         isSticky ? "bg-gray-800 fixed top-0 z-50" : "bg-gray-800 bg-opacity-60"
//       }`}
//     >
//       <ul
//         className={`flex gap-3 text-white items-center overflow-x-auto ${
//           isSticky ? "overflow-x-scroll" : "" // Apply overflow-x-scroll class on mobile only
//         } sm:overflow-x-auto`} // Use overflow-x-auto on small screens for scrollable behavior
//       >
//         <li className="px-2 py-1 rounded-sm hover:bg-gray-200 hover:bg-opacity-40 hover:text-black">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </li>
//         <li className="px-2 py-1 rounded-sm hover:bg-gray-200 hover:bg-opacity-40 hover:text-black">
//           Link1
//         </li>
//         <li className="px-2 py-1 rounded-sm hover:bg-gray-200 hover:bg-opacity-40 hover:text-black">
//           Link2
//         </li>
//         <li className="px-2 py-1 rounded-sm hover:bg-gray-200 hover:bg-opacity-40 hover:text-black">
//           Link3
//         </li>
//         <li className="px-2 py-1 rounded-sm hover:bg-gray-200 hover:bg-opacity-40 hover:text-black">
//           Link4
//         </li>
//         <li className="px-2 py-1 rounded-sm hover:bg-gray-200 hover:bg-opacity-40 hover:text-black">
//           Link5
//         </li>
//         {isSticky && (
//           <div className="flex justify-between w-full">
//             <SearchBarOnHeroSection isSticky={isSticky} onSearch={onSearch} />
//             <Link href={"/"} className="btn btn-ghost normal-case text-xl">
//               <span className="bg-gray-600 hover:bg-gray-700 relative rounded-md px-2 py-1">
//                 J4B MOVIES
//               </span>
//               <sup className="badge badge-primary">Beta v0.1</sup>
//             </Link>
//           </div>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default SecondaryNav;
