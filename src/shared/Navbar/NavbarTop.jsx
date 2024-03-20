import React, { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useLocation } from "react-router";
const NavbarTop = () => {
  const location = useLocation();
  const [hidden, setHidden] = useState();
  useEffect(() => {
    if (location.pathname == "/checkout-info") {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // todo
    document.querySelector("#root").scrollTo(0, 0);
  }, [location.pathname]);
  return hidden ? null : (
    <div className="bg-primary text-white py-3" id="tip">
      <div className="w-full">
        <div className="w-full flex justify-center items-center">
          <p className="text-xs md:text-sm lg:text-base underline w-full text-center flex justify-center items-center">
            30% discount. shipping Australia wide
            <AiOutlineArrowRight className="ml-2" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
