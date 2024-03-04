import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import NavbarTop from "../shared/Navbar/NavbarTop";
import Footer from "../shared/Footer/Footer";
import Loader from "../components/Loader/Loader";
import Top from "../components/toTop/index";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration purposes
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
        <>
          <NavbarTop />
          <Navbar />
          <div className="lg:pt-[108px] w-full relative lg:max-w-[1600px] mx-auto">
            <Outlet />
          </div>
          <Footer />
          <Top></Top>
        </>
      {/* )} */}
    </div>
  );
};

export default Main;
