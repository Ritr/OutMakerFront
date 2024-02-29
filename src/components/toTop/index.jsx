import React from "react";
import { BiArrowToTop } from "react-icons/bi";


const Top = () => {
  const handle = () => {
    window.scrollTo(0, 0);
  };
  return <div className="fixed right-4 bottom-[50%] z-50">
    <BiArrowToTop onClick={handle} className="text-4xl cursor-pointer"></BiArrowToTop>
  </div>;
};

export default Top;
