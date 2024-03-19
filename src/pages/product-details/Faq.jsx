// FAQ.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "./Accordion"; // Make sure you import the Accordion component

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Can you reconfigure this sectional if you change your mind?",
      answer:
        "Yes! This collection is completely modular so you can customize your furniture to your liking.",
    },
    {
      question: "How do the pieces secure to each other?",
      answer:
        "The pieces attach via a built-in locking mechanism on the sides.",
    },
    {
      question: "What is the weight limit per seat?",
      answer: "Each seat can support up to 250 lbs.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:px-64">
      <h2 className="text-2xl  text-center mb-6">
        We're here to answer anything
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            isOpen={openIndex === index}
            title={faq.question}
            content={faq.answer}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/FAQ">
          <button className="bg-primary text-white py-2 px-4 rounded-full">
            View all FAQs
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FAQ;
