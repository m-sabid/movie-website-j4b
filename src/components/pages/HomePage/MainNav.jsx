import Link from "next/link";
import React from "react";

const MainNav = () => {
  return (
    <>
      <div className="navbar bg-transparent text-white">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            {/* 9Dot */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <circle
                cx="5"
                cy="5"
                r="1.5"
                stroke="#fff"
                strokeWidth="2"
              ></circle>
              <circle
                cx="12"
                cy="5"
                r="1.5"
                stroke="#fff"
                strokeWidth="2"
              ></circle>
              <circle
                cx="19"
                cy="5"
                r="1.5"
                stroke="#fff"
                strokeWidth="2"
              ></circle>
              <circle
                cx="5"
                cy="12"
                r="1.5"
                stroke="#fff"
                strokeWidth="2"
              ></circle>
              <circle
                cx="12"
                cy="12"
                r="1.5"
                stroke="#fff"
                strokeWidth="2"
              ></circle>
              <circle
                cx="19"
                cy="12"
                r="1.5"
                stroke="#fff"
                strokeWidth="2"
              ></circle>
              <circle
                cx="5"
                cy="19"
                r="1.5"
                stroke="#fff"
                strokeWidth="2"
              ></circle>
              <circle
                cx="12"
                cy="19"
                r="1.5"
                stroke="#fff"
                strokeWidth="2"
              ></circle>
              <circle
                cx="19"
                cy="19"
                r="1.5"
                stroke="#fff"
                strokeWidth="2"
              ></circle>
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost normal-case text-xl">
            J4B MOVIES <sup className="badge badge-primary">Beta v0.1</sup>
          </Link>
        </div>
        <div className="flex-none">
          <Link href={"/dashboard/home"} className="btn btn-square btn-ghost">
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
    </>
  );
};

export default MainNav;
