import React, { useState } from "react";

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const categories = [
    "General",
    "Shipping & Delivery",
    "Materials & Construction",
    "Fire Tables",
    "Swatches",
    "Prices",
    "Customization",
    "Returns",
    "Warranty",
  ];
  const faqCategories = {
    "Fire Tables": [
      {
        question: "What should I know about placing a fire table in my space?",
        answer:
          "It is important to place your fire table in a well-ventilated space and keep it away from flammable materials.",
      },
      {
        question:
          "What type of propane tank is compatible with Yardbird Fire Table and can I connect my Fire Table to a natural gas line?",
        answer:
          "You'll need a standard 20-pound propane tank for the Yardbird Fire Table. Conversion kits are available for connecting to natural gas lines.",
      },
      {
        question: "Do the Fire Tables give off sufficient heat?",
        answer:
          "Yes, the Fire Tables are designed to give off a comfortable amount of heat, suitable for chilly evenings.",
      },
    ],
    Swatches: [
      {
        question:
          "Can I order a fabric or frame swatch and how long do they take to arrive?",
        answer:
          "Yes, you can order swatches through our customer service, and they typically arrive within 1-2 weeks.",
      },
    ],
  };

  const toggleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null); // Close the FAQ if it is already open
    } else {
      setOpenFAQ(index); // Set the FAQ as open
    }
  };

  return (
    <div className="w-full mx-auto px-4">
      <div className="w-full text-white">
        <div className="w-full mx-auto text-center">
          <div
            className="flex flex-col justify-center items-center h-40"
            style={{ backgroundColor: "#223552" }}
          >
            <h1 className="text-6xl font-bold">FAQs</h1>
            <p className="text-xl my-2">How can we help?</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-4 py-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="bg-white text-black border border-neutral-600 rounded-full px-6 py-2 font-medium transition duration-300 hover:bg-blue-200"
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {Object.entries(faqCategories).map(([category, faqs], categoryIndex) => (
        <div key={categoryIndex}>
          <h3 className="text-2xl font-bold mb-4">{category}</h3>
          <hr className="my-4" />
          <div className="space-y-4">
            {faqs.map((faq, faqIndex) => {
              const isOpen = openFAQ === `${categoryIndex}-${faqIndex}`;
              return (
                <div key={faqIndex}>
                  <details
                    className="group"
                    open={isOpen}
                    onToggle={() => toggleFAQ(`${categoryIndex}-${faqIndex}`)}
                  >
                    <summary className="text-lg font-medium cursor-pointer">
                      {faq.question}
                      <span className="float-right transform transition-transform duration-300">
                        {isOpen ? "-" : "+"}
                      </span>
                    </summary>
                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        isOpen ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <p className="mt-2 pl-4 pr-2 text-gray-700">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                  <hr className="my-4" />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
