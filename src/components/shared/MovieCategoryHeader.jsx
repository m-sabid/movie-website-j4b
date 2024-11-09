import React from "react";
import { FaFilter } from "react-icons/fa";

const MovieCategoryHeader = ({ title }) => {
  return (
    <div>
      <div className="flex mt-10 mb-5 px-10 justify-between items-center">
        <h1 className="text-white uppercase text-3xl font-bold">{title}</h1>

        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost text-white uppercase text-3xl font-bold"
          >
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
          <div className="dropdown dropdown-end">
            <ul
              tabIndex={0}
              className="block menu rounded-sm bg-gray-800 menu-sm dropdown-content dropdown-end mt-3 z-[100] p-2 shadow w-52 h-[80vh] overflow-y-scroll"
            >
              <li>
                <details close>
                  <summary>Industry</summary>
                  {/* <ul>
                    {movieIndustries.map((dt, index) => (
                      <li key={index} className="capitalize">
                      <a>{dt}</a>
                      </li>
                      ))}
                  </ul> */}
                </details>
              </li>
              <li>
                <details close>
                  <summary>Release Year</summary>
                  {/* <ul>
                    {releaseYear.map((dt, index) => (
                      <li key={index} className="capitalize">
                      <a>{dt}</a>
                      </li>
                      ))}
                      </ul> */}
                </details>
                {/* 3 */}
                <details close>
                  <summary>Genre</summary>
                  <ul>
                    {/* {genres.map((dt, index) => (
                      <li key={index} className="capitalize">
                      <a>{dt}</a>
                      </li>
                      ))} */}
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default MovieCategoryHeader;
