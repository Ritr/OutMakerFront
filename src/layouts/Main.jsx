import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import NavbarTop from "../shared/Navbar/NavbarTop";
import Footer from "../shared/Footer/Footer";
import Top from "../components/toTop/index";

const Main = () => {
  return (
    <div>
      <NavbarTop />
      <Navbar />
      <div className="lg:pt-[108px] w-full relative lg:max-w-[1600px] mx-auto">
        {/* <Outlet /> */}
      </div>
      <Footer />
      <Top></Top>
    </div>
  );
};

export default Main;
