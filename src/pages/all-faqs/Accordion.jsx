// Accordion.js
import React from "react";

const Accordion = ({ isOpen, title, content, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full text-left p-3 focus:outline-none"
      >
        <h3 className="text-sm md:text-base font-semibold">{title}</h3>
        <span className="">{isOpen ? "×" : "+"}</span>
      </button>
      {isOpen && (
        <div>
          <div className="text-xs md:text-sm  p-3 indent-4">{content}</div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
