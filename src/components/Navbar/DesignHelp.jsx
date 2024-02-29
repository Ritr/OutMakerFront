import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { RiWechat2Line } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";

const DesignHelp = () => {
  return (
    <>
      <div className="lg:w-[450px] px-10 pb-20 mx-auto">
        <div className=" py-2 mt-4 flex justify-center items-center rounded-full bg-primary text-white text-xl gap-4">
          <TfiEmail />
          contact@theoutmaker.com
        </div>
        <div className=" py-2 mt-4 flex justify-center items-center rounded-full bg-primary text-white text-xl gap-4">
          <RiWechat2Line></RiWechat2Line> Online Chat
        </div>
        <div className=" py-2 mt-4 flex justify-center items-center rounded-full bg-primary text-white text-xl gap-4">
          <BsFillTelephoneFill></BsFillTelephoneFill> (+88)0160576503
        </div>
      </div>
    </>
  );
};

export default DesignHelp;
