import React, { useContext, useEffect, useRef, useState } from "react";
import { FaAngleDown, FaTimes, FaUser } from "react-icons/fa";
import { BsBag } from "react-icons/bs";
import logo from "../../assets/Navbar/Frame.svg";
import ProductItems from "./ProductItems";
import "aos/dist/aos.css";
import AOS from "aos";
import { Link, useLocation } from "react-router-dom";
import CollectionItem from "./CollectionItem";
import LearnItem from "./LearnItem";
import Sidebar from "./Sidebar";
import useOutsideClick from "../../Hooks/useOutsideClick";
import { CartContext } from "../../Provider/CartProvider";
import toast from "react-hot-toast";

AOS.init();
const Navbar = () => {
  const { objectOnlyData } = useContext(CartContext);
  // states for toggle the buttons
  const [productItem, setProductItem] = useState(false);
  const [collectionItem, setCollectionItem] = useState(false);
  const [learnItem, setLearnItem] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    const User_Id = localStorage.getItem("User_Id");
    if (User_Id) {
      // 如果 User_Id 存在，切换用户下拉框的显示
      setIsUserDropdownOpen(!isUserDropdownOpen);
    } else {
      // 如果 User_Id 不存在，打开 Sidebar
      setIsSidebarOpen(!isSidebarOpen);
    }
  };
  const toggleUserDropdown = () => {
    const User_Id = localStorage.getItem("User_Id");
    console.log("User_Id", User_Id);
    if (User_Id) {
      setIsUserDropdownOpen(!isUserDropdownOpen);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  // to close the navbar if anyone click outside of the component
  const dropdownRef = useRef(null);
  const closeDropdown = () => {
    setProductItem(false);
    setLearnItem(false);
    setCollectionItem(false);
  };
  useOutsideClick(dropdownRef, closeDropdown);

  const location = useLocation(); // Get the current location
  useEffect(() => {
    // Close the navigation menu whenever the route changes
    setProductItem(false);
    setLearnItem(false);
    setCollectionItem(false);
  }, [location.pathname]);

  useEffect(() => {}, [objectOnlyData]);
  const toggleNavButton = (itemName) => {
    // Determine if any dropdown is currently active
    let isAnyDropdownActive = productItem || collectionItem || learnItem;

    // Close all dropdowns
    setProductItem(false);
    setCollectionItem(false);
    setLearnItem(false);

    // Toggle the clicked dropdown
    if (activeDropdown !== itemName) {
      setActiveDropdown(itemName);
      if (itemName === "productItem") {
        setProductItem(true);
      } else if (itemName === "collectionItem") {
        setCollectionItem(true);
      } else if (itemName === "learnItems") {
        setLearnItem(true);
      }
    } else {
      setActiveDropdown(null);
    }

    // Hide dropdownRef if no dropdowns are active
    if (isAnyDropdownActive && activeDropdown !== itemName) {
      if (dropdownRef && dropdownRef.current) {
        dropdownRef.current.style.display = "none";
      }
    }
  };

  const navItems = (
    <>
      <li onClick={() => toggleNavButton("collectionItem")}>
        <p>
          <span>Collection</span>
          <span>
            {activeDropdown === "collectionItem" && collectionItem === true ? (
              <FaTimes />
            ) : (
              <FaAngleDown />
            )}
          </span>
        </p>
      </li>
      <li onClick={() => toggleNavButton("productItem")}>
        <p>
          <span>Products</span>
          <span>
            {activeDropdown === "productItem" && productItem === true ? (
              <FaTimes />
            ) : (
              <FaAngleDown />
            )}
          </span>
        </p>
      </li>
      <li onClick={() => toggleNavButton("learnItems")}>
        <p>
          <span>Learn</span>

          <span>
            {activeDropdown === "learnItems" && learnItem === true ? (
              <FaTimes />
            ) : (
              <FaAngleDown />
            )}
          </span>
        </p>
      </li>
    </>
  );
  const isDropdownOpen = (dropdownName) => activeDropdown === dropdownName;

  const logout = () => {
    console.log("logout");
    localStorage.clear();
    toast.success("Logout!", "success");
    setIsUserDropdownOpen(false);
  };

  return (
    <>
      {/* <NavbarTop/> */}

      {/* navbar functonalities */}
      <div className="navbar nav-shadow lg:px-32 z-50">
        <div className="navbar-start w-full">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <ul className="menu menu-horizontal px-1 hidden lg:flex">
            {navItems}
          </ul>
        </div>
        <div className="navbar-center lg:flex">
          <Link to="/">
            <div className="rounded-full bg-white py-6 px-5  z-50 w-[120px] h-[120px] nav-shadow">
              <img
                src={logo}
                alt="our-company-logo"
                className="object-fill w-full h-full"
              />
            </div>
          </Link>
        </div>
        <div className="navbar-end w-full">
          <div className="flex gap-0 flex-row md:items-center">
            {/* <div className="relative w-full hidden md:flex">
              <input
                type="text"
                placeholder="Search Products"
                className="input input-bordered rounded-3xl w-full max-h-9 placeholder:text-sm"
              />
              <div className="absolute right-3 top-2">
                <PiMagnifyingGlassThin className="text-lg" />
              </div>
            </div> */}
            <div className="flex ml-5 md:ml-16">
              <div className="relative">
                <p className="absolute -top-3 right-3 text-black font-bold">
                  {objectOnlyData ? objectOnlyData?.length : 0}
                </p>
                <Link
                  to="/checkout"
                  className="btn btn-sm btn-circle btn-outline mr-4"
                >
                  <BsBag />
                </Link>
              </div>
              <div
                className={`dropdown ${
                  isMobile ? "dropdown-left dropdown-bottom" : ""
                } `}
              >
                <button
                  onClick={toggleUserDropdown}
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm btn-circle btn-outline"
                >
                  <FaUser className="text-xl" />
                </button>
                {isUserDropdownOpen && (
                  <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 ">
                    <button onClick={logout}>logout</button>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(false)}
      />
      {/* functionalities */}
      <div ref={dropdownRef}>
        {isDropdownOpen("productItem") && productItem === true && (
          <div className="bg-white w-full z-10 duration-700 transition-all ease-in-out">
            <ProductItems />
          </div>
        )}
        {isDropdownOpen("collectionItem") && collectionItem === true && (
          <div className="bg-white w-full z-10 duration-700 transition-all ease-in-out">
            <CollectionItem />
          </div>
        )}
        {isDropdownOpen("learnItems") && learnItem === true && (
          <div className="bg-white w-full z-10 duration-700 transition-all ease-in-out">
            <LearnItem />
          </div>
        )}
      </div>
    </>
  );
};
export default Navbar;
