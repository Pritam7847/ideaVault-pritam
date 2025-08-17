import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

    const navItem = (
    <>
      <li><a href='/'>Home</a></li>
      <li><Link to="/submit">Submit Idea</Link></li>
      <li><Link to="/explore">Explore</Link></li>
      {/* <li><a>About</a></li>
      <li><a>Contact</a></li> */}
    </>
  );

  return (
    <div className="bg-white text-black">
      <div className="navbar">
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItem}
            </ul>
          </div>
          <a className="text-base md:text-2xl font-bold cursor-pointer">ideaVault</a>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
           {navItem}
          </ul>
        </div>

        <div className="navbar-end">
          <a className="btn">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
