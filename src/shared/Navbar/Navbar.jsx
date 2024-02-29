/* eslint-disable react/no-unescaped-entities */
import React from "react";
import NavbarTop from "./NavbarTop";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/navIcon.png";
import { GoPeople } from "react-icons/go";
import { PiHandbag } from "react-icons/pi";

const Navbar = () => {
  return (
    <>
      <NavbarTop />

      {/* main menu */}
      <div
        className="relative z-10"
        style={{ boxShadow: "rgb(237 235 235 / 69%) 0px 6px 20px 0px" }}
      >
        <div className="container mx-auto px-2 md:px-10 py-6 md:py-0 navbar relative flex  justify-between items-center">
          <div className="navbar-start hidden lg:flex">
            <div className="text-[#363434] text-sm order-3 w-full md:w-auto md:order-2">
              <ul className="flex font-normal justify-between">
                <li className="md:px-4 md:py-2 hover:text-primary">
                  <Link to="/">Home</Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-primary">
                  <Link to="/category">Category</Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-primary">
                  <Link to="/contact">Contact us</Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-primary">
                  <Link to="/new">What's New</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="navbar-center">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost  lg:hidden">
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="md:px-4 md:py-2 hover:text-primary">
                  <Link to="/">Home</Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-primary">
                  <Link to="/category">Category</Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-primary">
                  <Link to="/contact">Contact us</Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-primary">
                  <Link to="/new">What's New</Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="hidden lg:absolute top-[5%] left-1/2 -translate-x-1/2  bg-white w-[100px] h-[100px] lg:flex justify-center items-center rounded-full"
            style={{ boxShadow: "0px 6px 20px 0px #faf9f9cf" }}
          >
            <div className="">
              <img src={logo} alt="" className="" />
            </div>
          </div>

          <div className="pe-0 md:pe-5">
            <div className="relative text-[#AAA9AA] me-2 md:me-6">
              <input
                type="search"
                name="serch"
                placeholder="Search"
                className="bg-[#F8F6F8] h-8 px-5 pr-10 rounded-full text-xs focus:outline-none w-[150px] md:w-full"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-4"
              >
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style={{ enableBackground: "new 0 0 56.966 56.966" }}
                  xmlSpace="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>

            <div className="border border-gray-400 rounded-full p-1 me-2 md:me-6">
              <PiHandbag />
            </div>
            <div className=" border border-gray-400 rounded-full p-1 ">
              <GoPeople />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
