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
      <div className="w-full relative ">
        <Outlet />
      </div>
      <Footer />
      <Top></Top>
    </div>
  );
};

export default Main;
