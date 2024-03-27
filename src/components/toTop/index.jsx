import React, { useState, useEffect } from "react";
import { BiArrowToTop } from "react-icons/bi";

const Top = () => {
  const handle = () => {
    document.querySelector("#root").scrollTo(0, 0);
  };
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const { scrollTop } = document.querySelector("#root");
      const { clientHeight } = document.querySelector("#root>div");
      if (clientHeight - scrollTop < 2400) {
        setShowDiv(true);
      } else {
        setShowDiv(false);
      }
    }

    document.querySelector("#root").addEventListener("scroll", handleScroll);
    return () => {
      // document.querySelector("#root").window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`fixed right-4 bottom-[50%] z-50 ${showDiv ? "" : "hidden"}`}
    >
      <BiArrowToTop
        onClick={handle}
        className="text-4xl cursor-pointer"
      ></BiArrowToTop>
    </div>
  );
};

export default Top;
