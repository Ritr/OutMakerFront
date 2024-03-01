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
import DesignHelp from "./DesignHelp";
import Sidebar from "./Sidebar";
import SidebarCart from "./SidebarCart";
import useOutsideClick from "../../Hooks/useOutsideClick";
import { CartContext } from "../../Provider/CartProvider";
import toast from "react-hot-toast";
import { FiMenu, FiX } from "react-icons/fi";
import Accordion from "./Accordion";
import { throttle } from "lodash";

AOS.init();
const Navbar = () => {
  const { objectOnlyData } = useContext(CartContext);
  // states for toggle the buttons
  const [productItem, setProductItem] = useState(false);
  const [collectionItem, setCollectionItem] = useState(false);
  const [learnItem, setLearnItem] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCartOpen, setIsSidebarCartOpen] = useState(false);

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [navVisible, setNavVisible] = useState(window.innerWidth > 768);
  const [topPos, setTopPos] = useState(48);
  useEffect(() => {
    let top = document.querySelector("#tip").clientHeight;
    setTopPos(top);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setNavVisible(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    // const handleScroll = () => {
    //   // const h = Math.min(0, window.scrollY);
    //   const y = window.scrollY;
    //   let h = top + 50 - y;
    //   if(h<0){
    //     h = 0;
    //   }
    //   console.log(window.scrollY);
    //   setTopPos(h);
    // };
    const handleScroll = throttle(() => {
      let h = top - window.scrollY;
      if (h < 0) {
        h = 0;
      }
      setTopPos(h);
    }, 100); // 控制节流的时间间隔

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
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
  const cancelList = () => {
    setActiveDropdown(null);
  };
  const toggleNavButton = (itemName) => {
    // Determine if any dropdown is currently active
    // let isAnyDropdownActive = productItem || collectionItem || learnItem;

    // // Close all dropdowns
    // setProductItem(false);
    // setCollectionItem(false);
    // setLearnItem(false);

    // Toggle the clicked dropdown
    if (activeDropdown === itemName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(itemName);
    }
    // if (activeDropdown !== itemName) {
    //   setActiveDropdown(itemName);
    //   if (itemName === "productItem") {
    //     setProductItem(true);
    //   } else if (itemName === "collectionItem") {
    //     setCollectionItem(true);
    //   } else if (itemName === "learnItems") {
    //     setLearnItem(true);
    //   }
    // } else {
    //   setActiveDropdown(null);
    // }

    // // Hide dropdownRef if no dropdowns are active
    // if (isAnyDropdownActive && activeDropdown !== itemName) {
    //   if (dropdownRef && dropdownRef.current) {
    //     dropdownRef.current.style.display = "none";
    //   }
    // }
  };

  const navItems = (
    <>
      <li onClick={() => toggleNavButton("collectionItem")}>
        <p>
          <span>Collection</span>
          <span className="flex w-full justify-end md:justify-start">
            {activeDropdown === "collectionItem" ? (
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
          <span className="flex w-full justify-end md:justify-start">
            {activeDropdown === "productItem" ? <FaTimes /> : <FaAngleDown />}
          </span>
        </p>
      </li>
      <li onClick={() => toggleNavButton("learnItems")}>
        <p>
          <span>Learn</span>

          <span className="flex w-full justify-end md:justify-start">
            {activeDropdown === "learnItems" ? <FaTimes /> : <FaAngleDown />}
          </span>
        </p>
      </li>
      <li onClick={() => toggleNavButton("designHelp")}>
        <p>
          <span>Design Help</span>
          <span className="flex w-full justify-end md:justify-start">
            {activeDropdown === "designHelp" ? <FaTimes /> : <FaAngleDown />}
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
      <div
        className="w-full z-50 fixed bg-white"
        style={{ top: topPos + "px", zIndex: 999 }}
      >
        <div className="navbar nav-shadow lg:h-[108px] lg:w-[1600px] mx-auto">
          <div className="navbar-start w-full">
            <details className="dropdown lg:hidden">
              <summary className="btn btn-ghost lg:hidden">
                {!navVisible && (
                  <FiMenu
                    className="h-5 w-5"
                    onClick={() => {
                      setNavVisible(!navVisible);
                    }}
                  />
                )}
                {navVisible && (
                  <FiX
                    className="h-5 w-5"
                    onClick={() => {
                      setNavVisible(!navVisible);
                    }}
                  />
                )}
              </summary>

              <ul
                className="menu menu-sm dropdown-content left-0 right-0  mt-3 z-[1] md:p-2 shadow bg-base-100 md:rounded-box lg:w-52 w-[100vw]"
                style={{ position: "fixed" }}
              >
                {navItems}
              </ul>
            </details>
            <ul className="menu menu-horizontal  hidden lg:flex">{navItems}</ul>
          </div>
          <div className="navbar-center lg:flex">
            <Link to="/">
              <div className="rounded-full bg-white py-6 px-5  z-50  nav-shadow">
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
                <div className="relative mr-3">
                  <p className="absolute -top-3 right-0 text-black font-bold">
                    {objectOnlyData ? objectOnlyData?.length : 0}
                  </p>
                  <button
                    onClick={() => setIsSidebarCartOpen(true)}
                    role="button"
                    className="btn btn-sm btn-circle btn-outline"
                  >
                    <BsBag />
                  </button>
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
                    <ul className="dropdown-content z-[1] menu text-center p-1 shadow bg-base-100 rounded-box w-40 ">
                      <Link to={"/Account"}>
                        <button className="p-1">Dashboard</button>
                      </Link>
                      <button className="p-1" onClick={logout}>
                        logout
                      </button>
                    </ul>
                  )}
                </div>
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
      {/* SidebarCart */}
      <SidebarCart
        isOpen={isSidebarCartOpen}
        toggleSidebar={() => setIsSidebarCartOpen(false)}
      />
      {/* functionalities */}

      <div ref={dropdownRef}>
        {isDropdownOpen("productItem") && navVisible && (
          <div
            className={`bg-white w-full z-10 duration-700 transition-all ease-in-out  lg:pt-[138px] ${
              navVisible ? "pt-52" : "pt-28"
            }`}
            onClick={() => {
              cancelList();
            }}
          >
            <ProductItems />
          </div>
        )}
        {isDropdownOpen("collectionItem") && navVisible && (
          <div
            className={`bg-white w-full z-10 duration-700 transition-all ease-in-out lg:pt-[138px]  ${
              navVisible ? "pt-52" : "pt-28"
            }`}
            onClick={() => {
              cancelList();
            }}
          >
            <CollectionItem />
          </div>
        )}
        {isDropdownOpen("learnItems") && navVisible && (
          <div
            className={`bg-white w-full z-10 duration-700 transition-all ease-in-out  lg:pt-[138px] ${
              navVisible ? "pt-40" : "pt-16"
            }`}
            onClick={() => {
              cancelList();
            }}
          >
            <LearnItem />
          </div>
        )}
        {isDropdownOpen("designHelp") && navVisible && (
          <div
            className={`bg-white w-full z-10 duration-700 transition-all ease-in-out  lg:pt-[138px] ${
              navVisible ? "pt-56" : "pt-32"
            }`}
            onClick={() => {
              cancelList();
            }}
          >
            <DesignHelp />
          </div>
        )}
      </div>

      {/* <div
        className="w-full flex flex-col overflow-auto top-36 bg-white fixed z-10 left-0"
        style={{
          height: "calc(var(--vh, 1vh) * 100 - 5rem)",
          transform: "translate(0, 0)",
        }}
      >
        {/* Content here */}
      {/* <Accordion title="ProductItems">
          <div className="bg-white w-full z-10 duration-700 transition-all ease-in-out">
            <ProductItems />
          </div>
        </Accordion>
        <Accordion title="CollectionItem">
          <div className="bg-white w-full z-10 duration-700 transition-all ease-in-out">
            <CollectionItem />
          </div>
        </Accordion>
        <Accordion title="LearnItem">
          <div className="bg-white w-full z-10 duration-700 transition-all ease-in-out">
            <LearnItem />
          </div>
        </Accordion>
        <div className="space-y-3 text-center">
          <h3 className="tracki font-semibold text-base">Quick Link</h3>
          <ul className="space-y-1 text-sm font-light  leading-loose">
            <li>
              <Link to="/AboutUs">About us</Link>
            </li>
            <li>
              <Link to="/ContactUs">Contact us</Link>
            </li>
            <li>
              <Link to="/all-blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/care-guide">Care & Maintenance</Link>
            </li>
          </ul>
        </div> </div> */}
    </>
  );
};
export default Navbar;
