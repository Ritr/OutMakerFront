import React, { useEffect, useRef, useState } from "react";

// 示例步骤数据
const stepsData = [
  {
    label: "Buyer completes payment",
    contentAbove: "2023-11-04 21:32:53",
    contentBelow: "The buyer has paid and is waiting for the seller to ship",
    details: [
      "If the seller fails to fulfill the agreement, you can apply for a refund and contact the seller for negotiation. The transaction will be closed after the refund is completed.",
      "Add a note",
    ],
  },
  {
    label: "Wait for the seller's delivery",
    contentAbove: "Seller preparing shipment",
    contentBelow: "Waiting for the seller to ship the item",
    details: [
      "The seller has received your payment and should ship your item soon. You will receive a notification once the item is shipped.",
      "Contact seller",
    ],
  },
  {
    label: "Wait for the buyer to confirm receipt",
    contentAbove: "Item in transit",
    contentBelow: "Waiting for the buyer to confirm receipt",
    details: [
      "Your item is on the way. Once you receive it, please confirm receipt so the seller can be paid.",
      "Track package",
    ],
  },
  {
    label: "Deals are done",
    contentAbove: "Transaction complete",
    contentBelow: "The deal is complete",
    details: [
      "Thank you for confirming receipt of your item. The transaction is now complete.",
      "Leave feedback",
    ],
  },
];

const CustomOrderInformation = () => {
  const tooltipBoxRef = useRef(); // Ref for the tooltip box
  const currentStepIndex = 1; // Assume this might change with your state

  // Define the left positions for the triangle for each step
  const triangleLeftPositions = {
    0: "0%", // Step 1
    1: "30%", // Step 2
    2: "70%", // Step 3
    3: "100%", // Step 4
  };

  // Get the current position based on the active step
  const currentTriangleLeft = triangleLeftPositions[currentStepIndex];

  // Inject the style for the triangle position
  useEffect(() => {
    const styleElem = document.createElement("style");
    document.head.appendChild(styleElem);
    styleElem.textContent = `
      .triangle-border::before {
        content: '';
        position: absolute;
        top: -10px;
        left: ${currentTriangleLeft}px !important;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #002b5b; /* The color should match the tooltip box background */
      }
    `;
    // Clean-up the style element when the component unmounts or the index changes
    return () => {
      document.head.removeChild(styleElem);
    };
  }, [currentTriangleLeft]);

  return (
    <section className="w-full">
      <div className="relative">
        <div className="step-container text-center h-[50vh]">
          <ul className="steps steps-vertical lg:steps-horizontal h-full items-center">
            {stepsData.map((step, index) => (
              <CustomStep
                key={index}
                label={step.label}
                contentAbove={step.contentAbove}
                contentBelow={step.contentBelow}
                completed={index <= currentStepIndex}
                active={index === currentStepIndex}
              />
            ))}
          </ul>
        </div>
        <div
          ref={tooltipBoxRef}
          className="border flex flex-col bg-[#E7F1FD] p-4 mt-4 bottom-0 left-1/2 rounded absolute triangle-border"
          style={{ transform: "translateX(-50%)" }}
        >
          <p className="font-medium">
            Current Order Status: {stepsData[currentStepIndex].contentBelow}
          </p>
          <ol className="list-decimal list-inside">
            {stepsData[currentStepIndex].details.map((detail, index) => (
              <li key={index} className="mt-1">
                {detail}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

const CustomStep = ({
  label,
  contentAbove,
  contentBelow,
  completed,
  active,
}) => {
  const stepClasses = completed ? "step-primary" : "";
  const activeClasses = active ? "font-bold text-blue-500" : "";
  return (
    <li className={`step ${stepClasses} relative`}>
      <div className="absolute -top-8 left-0 right-0 text-center">
        {contentAbove}
      </div>
      <div className={`text-center mt-2 ${activeClasses}`}>{label}</div>
      {/* <div className="absolute -bottom-10 left-0 right-0 text-center">
        {contentBelow}
      </div> */}
    </li>
  );
};

export default CustomOrderInformation;
