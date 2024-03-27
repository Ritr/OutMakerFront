import React, { useEffect } from "react";
import PageNav from "./PageNav";
import Blogs from "./productblogs";
import Blogs1 from "./blogs1";
import Network from "../../shared/Network/Network";
import mic from "../../assets/images/mic.png";
import UserInitialization from "../../components/UserInitialization/UserInitialization";

const Collections = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isProduct = location?.pathname === "/categories" ? true : false;

  return (
    <main className="w-full  lg:max-w-[1600px] mx-auto">
      {/*<PageNav />*/}
      {isProduct ? <Blogs /> : <Blogs1 />}

      {/* <Network /> */}
      {/* <div className="absolute right-0 bottom-[0px]">
        <img src={mic} alt="" className="w-3/4 md:w-full" />
      </div> */}
      <UserInitialization />
    </main>
  );
};

export default Collections;
