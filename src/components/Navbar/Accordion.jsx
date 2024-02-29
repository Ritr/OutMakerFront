import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa"; // 导入 react-icons 中的图标组件

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        {isOpen ? (
          <FaAngleUp className="ml-2" />
        ) : (
          <FaAngleDown className="ml-2" />
        )}{" "}
        {/* 根据 isOpen 切换图标 */}
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default Accordion;
