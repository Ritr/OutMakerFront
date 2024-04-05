import React, { useEffect, useState } from "react";

import CartProvider from "../Provider/CartProvider";
import Discount from "../components/Discount/Discount.jsx";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import NavbarTop from "../shared/Navbar/NavbarTop";
import Footer from "../shared/Footer/Footer";
import Top from "../components/toTop/index";
import UserInitialization from '../components/UserInitialization/UserInitialization.jsx';
const Main = () => {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("sended")) {
      setVisible(false);
    } else {
      setVisible(true);

    }
  }, []);
  const cancel = () => {
    localStorage.setItem("sended", true);
    setVisible(false)
  }
  const onReady = () => {
    setReady(true)
  }
  return (
    <div>
      {ready ? <CartProvider><NavbarTop />
        <Navbar />
        <div className="w-full">
          <Outlet />
        </div>
        <Footer />
        <Top></Top>
        <Discount visible={visible} onCancel={cancel}></Discount></CartProvider> : null}
      <UserInitialization onReady={onReady} />
    </div>
  );
};

export default Main;
