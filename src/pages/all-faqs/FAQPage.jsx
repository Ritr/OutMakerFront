// FAQPage.js
import React, { useState, useEffect } from "react";
import Accordion from "./Accordion";

const FAQPage = () => {
  const [openFAQs, setOpenFAQs] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      category: "Product Information",
      items: [
        {
          title:
            "Which material should I choose for a sofa made of rattan, aluminum alloy, or teak wood?",
          content:
            "Vine, aluminum alloy, and teak sofas are common outdoor furniture materials. The choice of material mainly depends on your personal preferences, furniture usage, and environmental conditions. Vine furniture is lightweight and breathable; Aluminum alloy furniture is corrosion-resistant and easy to clean; Teak furniture is sturdy, durable, and has natural weather resistance.",
        },
        {
          title: "Where are your outdoor furniture produced? ",
          content:
            "Our outdoor furniture is produced globally, with materials sourced from around the world and our main production locations located in China and Southeast Asia.",
        },
        {
          title: "How is the quality of your outdoor furniture?",
          content:
            "Our outdoor furniture is of high quality and has undergone strict quality testing and certification, meeting international standards.",
        },
        {
          title: "What styles of outdoor furniture do you have?",
          content:
            "Our outdoor furniture has a variety of styles, including lounge chairs, coffee tables, sofas, dining tables, dining chairs, etc., which can meet the needs of different customers.",
        },
        {
          title: "What is the price of your outdoor furniture?",
          content:
            "The prices of outdoor furniture vary depending on the style, material, and function, and the specific prices can be found on our website. We sell directly to customers without any intermediaries, so the price is very cost-effective.",
        },
        {
          title: "How to maintain and upkeep your outdoor furniture?",
          content:
            "Maintenance and upkeep of our outdoor furniture requires regular cleaning to avoid prolonged exposure to sunlight and humid environments. Maintenance and upkeep are relatively simple, and all furniture can be cleaned with soap and water",
        },
        {
          title:
            "Do your furniture comply with local regulations and standards?",
          content:
            "Our furniture fully complies with local regulations and standards, and can be purchased and used with confidence.",
        },
        {
          title: "How long can your outdoor furniture last?",
          content:
            "The service life of outdoor furniture is influenced by various factors such as materials, craftsmanship, and usage environment. Our teak and aluminum alloy furniture can generally be used for more than ten years.",
        },
        {
          title: "Can I customize furniture? ",
          content:
            "Yes, you can customize our outdoor furniture. You can contact our customer service team on the website or send us an email, and we will arrange for the design team to provide you with specific customized services.",
        },
        {
          title:
            "Do I currently have any outdoor furniture that interests me in stock?",
          content:
            "For outdoor furniture that you are interested in, you can check the inventory status on our website. We have detailed instructions, and you can also consult our customer service team online.",
        },
      ],
    },
    {
      category: "Delivery and Logistics",
      items: [
        {
          title: "Where is my order shipped from?",
          content:
            "The order is shipped from our Australian warehouse. Our Australian warehouse is located at 139 Keys Road, Moorabbin, VIC",
        },
        {
          title: "Do you deliver goods across Australia?",
          content: "Yes, we deliver goods throughout Australia.",
        },
        {
          title: "Do you provide installation services?",
          content:
            "Most of our furniture does not require installation, but some furniture is heavier. We will provide installation services for orders that meet the requirements of white glove services.",
        },
        {
          title:
            "How long will it take you to deliver the furniture to my shipping address?",
          content:
            " Normally, it takes 3-5 working days to deliver furniture to your shipping address in most parts of Australia. The specific time is subject to the logistics company.",
        },
        {
          title: "What transportation methods do you provide?",
          content:
            "Currently in Australia, we have chosen Large as our logistics transportation method for large furniture",
        },
        {
          title: "What is your delivery fee?",
          content:
            "The delivery cost depends on factors such as furniture size, weight, and transportation distance. The specific price can be checked by entering the detailed address and product you need on our website.",
        },
        {
          title: "How do I track my orders?",
          content:
            "You can check the delivery status of orders on our website.Can I still change the shipping address after placing an order? Yes, you can also change the shipping address after placing an order.",
        },
      ],
    },
    {
      category: "Purchase and checkout",
      items: [
        {
          title: "How can I place an order to purchase your outdoor furniture?",
          content:
            "Browse and select the outdoor furniture you need on our website.",
        },
        {
          title: "Do you have any promotions or discounts?",
          content:
            "Yes, we often hold promotional activities. You can subscribe to our email and accept the promotional information we send you. At the same time, you can also view the latest promotional information on our website.",
        },
      ],
    },
    {
      category: "Payment and Security",
      items: [
        {
          title: "What payment methods does your website support?",
          content:
            "Our website supports multiple payment methods, including credit card, debit card, PayPal, afterpay, etc.",
        },
        {
          title:
            "How do you ensure the security of my information during the payment process?",
          content:
            "During the payment process, we use SSL encryption technology to protect your information security and ensure that your transaction information is not leaked.",
        },
        {
          title: "How do you protect my privacy?",
          content:
            "Your privacy is very important to us, and we will strictly comply with relevant privacy protection policies and lawsand regulations.",
        },
      ],
    },
    {
      category: "After sales service",
      items: [
        {
          title: "How long does your outdoor furniture provide a warranty?",
          content:
            "Our outdoor furniture provides a 5-10 year warranty for the frame part, and sunbrella fabric provides a 5-year warranty. If there are any quality issues with the furniture during this period, you can contact our customer service team for repair or replacement.",
        },
        {
          title:
            "If there is a problem with the furniture, how should I contact you for repair?",
          content:
            " If there is a problem with the furniture, you can contact our customer service team for maintenance consultationand handling. We will solve the problem for you as soon as possible to ensure that your furniture can be usednormally.",
        },
        {
          title: "What should I do if I need to return or exchange goods?",
          content:
            "If you need to return or exchange goods, you can contact our customer service team for processing within 30 daysafter purchase. We will provide you with corresponding solutions to ensure that your shopping experience is guaranteed.",
        },
      ],
    },
    {
      category: "Installation and Use",
      items: [
        {
          title: "How to install your outdoor furniture?",
          content:
            "Most of our furniture doesn't require assembly, it's just some simple installation.",
        },
        {
          title:
            "What precautions should be taken when using your outdoor furniture?",
          content:
            "When using our outdoor furniture, it is necessary to pay attention to regular cleaning and maintenance to avoid prolonged exposure to sunlight and humid environments.We suggest that you regularly use a clean damp cloth to wipe the surface of the furniture and avoid using cleaning agents containing chemicals to maintain its luster and extend its lifespan.",
        },
        {
          title: "Can outdoor furniture be placed outdoors all year round?",
          content:
            "Yes, our outdoor furniture can be placed outdoors all year round. Our furniture has been specially designed and treated to adapt to various climatic conditions, including wind and rain, exposure to sunlight, and cold weather. However, it should be noted that if furniture is exposed to extreme weather conditions for a long time, it may have a certain impact on the material. Therefore, we recommend regular maintenance and upkeep.",
        },
      ],
    },
    {
      category: "Customer Support",
      items: [
        {
          title: "Does your website provide online customer service support?",
          content:
            "Our website provides online customer service support. If you have any questions or concerns, you can contact our customer service team at any time. You can contact us through chat windows, emails, or phone calls, and we will reply to your questions or provide you with solutions as soon as possible.",
        },
        {
          title:
            "If I have any questions, how should I contact customer support? ",
          content:
            "Our website also provides a detailed help center and FAQpage, where you can find answers and solutions to common problems. We are committed to providing you with high-quality service and assistance to ensure a smooth and enjoyable shopping experience.",
        },
        {
          title: "How long do you work for customer service?",
          content:
            "Our customer service hours are from 9am to 6pm every day from Monday to Saturday, except for Sundays and holidays. We will always provide you with help and support.",
        },
      ],
    },
    {
      category: "Privacy and Security",
      items: [
        {
          title: "How does your website ensure user privacy and data security?",
          content:
            "We attach great importance to user privacy and data security, and we use the latest security technologies to protect user information and data. Our website complies with relevant privacy policies and laws and regulations, ensuring that your personal information is protected and kept confidential.",
        },
      ],
    },
    {
      category: "Legal and Compliance",
      items: [
        {
          title:
            "What taxes do I need to pay when purchasing your outdoor furniture?",
          content: "The price includes tax",
        },
        {
          title:
            "What laws and regulations do your website and business comply with?",
          content:
            "Our website and business comply with all applicable national and regional laws and regulations, as well as international regulations, allowing us to purchase with confidence",
        },
      ],
    },
  ];

  const toggleFAQ = (index, category) => {
    const key = `${category}-${index}`;
    setOpenFAQs((prevOpenFAQs) => ({
      ...prevOpenFAQs,
      [key]: !prevOpenFAQs[key],
    }));
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      {faqs.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className={`${categoryIndex !== 0 ? "mt-5" : ""}`}
        >
          <h2 className="text-xl md:text-xl font-bold text-left">
            {categoryIndex + 1}. {category.category}
          </h2>

          <div className="space-y-2">
            {category.items.map((faq, index) => (
              <Accordion
                key={index}
                isOpen={!!openFAQs[`${category.category}-${index}`]}
                title={faq.title}
                content={faq.content}
                onClick={() => toggleFAQ(index, category.category)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
