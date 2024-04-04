import React, { useEffect, useState } from "react";

import Discount from "../components/Discount/Discount.jsx";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import NavbarTop from "../shared/Navbar/NavbarTop";
import Footer from "../shared/Footer/Footer";
import Top from "../components/toTop/index";

const Main = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <div>
      <NavbarTop />
      <Navbar />
      <div className="w-full">
        <Outlet />
      </div>
      <Footer />
      <Top></Top>
      <Discount visible={visible} onCancel={() => setVisible(false)}></Discount>
    </div>
  );
};

export default Main;
