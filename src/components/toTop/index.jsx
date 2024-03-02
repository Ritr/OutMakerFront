import React, { useState, useEffect } from "react";
import { BiArrowToTop } from "react-icons/bi";

const Top = () => {
  const handle = () => {
    window.scrollTo(0, 0);
  };
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

      if (distanceToBottom < 1200) {
        setShowDiv(true);
      } else {
        setShowDiv(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
