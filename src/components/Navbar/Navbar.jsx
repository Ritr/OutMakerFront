import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
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
import { throttle } from "lodash";
import navb from "../../assets/navb.webp";

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
  // const [navVisible, setNavVisible] = useState(window.innerWidth > 768);
  const [topPos, setTopPos] = useState(48);
  const location = useLocation(); // Get the current location
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useRef(0);
  //判断页面滚动方向

  useEffect(() => {
    let top = document.querySelector("#tip").clientHeight;
    // 如果是购物车页面，则top = 0

    // const location = useLocation(); // Get the current location
    // alert(location.pathname);
    if (location.pathname == "/checkout-info") {
      top = 0;
    }
    setTopPos(top);
    // const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
    // setNavVisible(window.innerWidth > 768);
    // };

    // window.addEventListener("resize", handleResize);

    const handleScroll = throttle(() => {
      let body =  document.querySelector("body");
      
      // console.log(scrollY.current);
      let h = top - body.scrollTop;
      let direction = body.scrollTop - scrollY.current > 0 ? true : false;
      if (direction) {
        h = -body.scrollTop;
      } else {
        if (h < 0) {
          h = 0;
        }
      }
      setTopPos(h);
      scrollY.current = body.scrollTop;
    }, 50); // 控制节流的时间间隔
    document.querySelector("body").addEventListener("scroll", handleScroll);
    return () => {
      document
        .querySelector("body")
        .removeEventListener("scroll", handleScroll);
      // window.removeEventListener("resize", handleResize);
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

  useEffect(() => {
    // Close the navigation menu whenever the route changes
    setProductItem(false);
    setLearnItem(false);
    setCollectionItem(false);
  }, [location.pathname]);
  useEffect(() => {
    cancelList();
  }, [location]);
  useEffect(() => {}, [objectOnlyData]);
  const cancelList = () => {
    setIsOpen(false);
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
      <div>
        <div
          className="flex w-full items-center h-8"
          onClick={() => toggleNavButton("collectionItem")}
        >
          <span>Collection</span>
          <span className="flex w-full justify-end md:justify-start">
            {activeDropdown === "collectionItem" ? (
              <FaTimes />
            ) : (
              <FaAngleDown />
            )}
          </span>
        </div>
        <div className="w-full">
          {activeDropdown === "collectionItem" && <CollectionItem />}
        </div>
      </div>
      <div>
        <div
          className="flex w-full items-center h-8"
          onClick={() => toggleNavButton("productItem")}
        >
          <span>Products</span>
          <span className="flex w-full justify-end md:justify-start">
            {activeDropdown === "productItem" ? <FaTimes /> : <FaAngleDown />}
          </span>
        </div>
        <div className=" w-full duration-700 transition-all ease-in-out">
          {activeDropdown === "productItem" && <ProductItems />}
        </div>
      </div>
      <div>
        <div
          className="flex w-full items-center h-8"
          onClick={() => toggleNavButton("learnItems")}
        >
          <span>Learn</span>
          <span className="flex w-full justify-end md:justify-start">
            {activeDropdown === "learnItems" ? <FaTimes /> : <FaAngleDown />}
          </span>
        </div>
        <div className=" w-full duration-700 transition-all ease-in-out">
          {activeDropdown === "learnItems" && <LearnItem />}
        </div>
      </div>
      <div>
        <div
          className="flex w-full items-center whitespace-nowrap h-8"
          onClick={() => toggleNavButton("designHelp")}
        >
          <span>Design Help</span>
          <span className="flex w-full justify-end md:justify-start">
            {activeDropdown === "designHelp" ? <FaTimes /> : <FaAngleDown />}
          </span>
        </div>
        <div className="w-full duration-700 transition-all ease-in-out justify-center">
          {activeDropdown === "designHelp" && <DesignHelp />}
        </div>
      </div>
    </>
  );
  const pcItems = (
    <>
      <div
        className="group h-full cursor-pointer"
        onMouseOver={() => {
          setActiveDropdown("collectionItem");
        }}
      >
        <div className="flex items-center h-full">
          <span>Collection</span>
          <span className="flex w-full justify-end md:justify-start">
            <FaTimes className="group-hover:block hidden" />
            <FaAngleDown className="group-hover:hidden block" />
          </span>
        </div>
        <div className="absolute top-[90px] pt-2 left-0 px-4 bg-white w-full z-10 duration-700 transition-all ease-in-out group-hover:block hidden">
          {activeDropdown === "collectionItem" && <CollectionItem />}
        </div>
      </div>
      <div
        className="group h-full cursor-pointer"
        onMouseOver={() => {
          setActiveDropdown("productItem");
        }}
      >
        <div className="flex items-center h-full">
          <span>Products</span>
          <span className="flex w-full justify-end md:justify-start">
            <FaTimes className="group-hover:block hidden" />
            <FaAngleDown className="group-hover:hidden block" />
          </span>
          <div
            onClick={cancelList}
            className="absolute top-[90px] pt-2  left-0 px-4 bg-white w-full z-10 duration-700 transition-all ease-in-out group-hover:block hidden"
          >
            {activeDropdown === "productItem" && <ProductItems></ProductItems>}
          </div>
        </div>
      </div>
      <div
        className="group h-full cursor-pointer"
        onMouseOver={() => {
          setActiveDropdown("learnItems");
        }}
      >
        <div className="flex items-center h-full">
          <span>Learn</span>
          <span className="flex w-full justify-end md:justify-start">
            <FaTimes className="group-hover:block hidden" />
            <FaAngleDown className="group-hover:hidden block" />
          </span>
          <div className="absolute top-[90px] pt-2  left-0 px-4 bg-white w-full z-10 duration-700 transition-all ease-in-out group-hover:block hidden">
            {activeDropdown === "learnItems" && <LearnItem></LearnItem>}
          </div>
        </div>
      </div>
      <div
        className="group h-full cursor-pointer"
        onMouseOver={() => {
          setActiveDropdown("designHelp");
        }}
      >
        <div className="flex items-center  h-full whitespace-nowrap">
          <span>Design Help</span>
          <span className="flex w-full justify-end md:justify-start">
            <FaTimes className="group-hover:block hidden" />
            <FaAngleDown className="group-hover:hidden block" />
          </span>
          <div className="absolute  top-[90px] pt-2  px-4 left-0 bg-white w-full z-10 duration-700 transition-all ease-in-out group-hover:block hidden">
            {activeDropdown === "designHelp" && <DesignHelp></DesignHelp>}
          </div>
        </div>
      </div>
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
        className="w-full h-[108px] z-50 fixed bg-white transition-all  duration-300 ease-in-out "
        style={{ top: topPos + "px", zIndex: 99 }}
      >
        <div className="relative navbar lg:h-[108px] w-full lg:max-w-[1600px] mx-auto">
          <div className="navbar-start w-full h-full z-10">
            <label className="p-1 md:p-0 swap swap-rotate md:hidden">
              <input
                type="checkbox"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                checked={isOpen}
              />

              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
            <div
              className={` overflow-auto px-4 z-[1] md:p-2 shadow bg-base-100 md:rounded-box lg:w-52 w-[100vw] fixed bottom-0  left-0 right-0 mt-20 ${
                isOpen ? "" : " hidden"
              }`}
              style={{ top: topPos + "px", overscrollBehavior: "contain" }}
            >
              {navItems}
              <img src={navb} alt="" className="my-10" />
            </div>
            <div className="hidden lg:flex gap-4 h-full items-center">
              {pcItems}
            </div>
          </div>
          <div className="navbar-center lg:flex">
            <Link to="/">
              <div className="rounded-full bg-white py-6 px-5  z-50 ">
                <img
                  src={logo}
                  alt="our-company-logo"
                  className="object-fill w-full h-full"
                />
              </div>
            </Link>
          </div>
          <div className="navbar-end w-full">
            <div className="flex gap-0 flex-row md:items-center z-20 relative">
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

      {/* <div ref={dropdownRef} className="block md:hidden">
        {isDropdownOpen("productItem") && (
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
        {isDropdownOpen("collectionItem") && (
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
        {isDropdownOpen("learnItems") && (
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
        {isDropdownOpen("designHelp") && (
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
      </div> */}

      {/* <div
        className="w-full flex flex-col overflow-auto top-36 bg-white fixed z-10 left-0"
        style={{
          height: "calc(let(--vh, 1vh) * 100 - 5rem)",
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
