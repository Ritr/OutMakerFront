import React, { useState, useEffect } from "react";
import Header from "./header";
import Collection from "./collection";
import Stylish from "./stylish";
import Envoirment from "./envoirment";
import Meterials from "./meterials";
import Review from "./review";
import IconSection from "../../components/IconSection/IconSection";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import Network from "../../shared/Network/Network";
import { Link } from "react-router-dom";

import { getApiBaseUrl } from "../../utils/api/index";
import { useLocation } from "react-router-dom";
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);

  const baseUrl = getApiBaseUrl();
  const userCode = localStorage.getItem("usercode");

  useEffect(() => {
    getOrder();
    // Check if the user has visited before
    const visits = localStorage.getItem("visits") || 0;
    const showModalRandomly = Math.random() < 0.5;
    if (visits >= 1 && showModalRandomly && latestOrder) {
      setTimeout(() => {
        setShowModal(true); // Show the modal if it's the user's second visit
        setIsMinimized(false);
      }, 2000);
    } else {
      setShowModal(false);
      setIsMinimized(true); // Default to minimized if not showing modal
    }
    localStorage.setItem("visits", parseInt(visits) + 1);
  }, []);

  const openModal = () => {
    setShowModal(true);
    setIsMinimized(false);
  };

  const getOrder = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/user/all/order_code/${userCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Check if the response indicates no orders found
        if (data && data.Failed === "No orders found for this user code") {
          setLatestOrder(null);
          return;
        }

        // Assuming the first key in the response is the most recent order
        const orderNumbers = Object.keys(data);
        if (orderNumbers.length > 0) {
          const mostRecentOrderNumber = orderNumbers[0];
          const orderIds = Object.keys(data[mostRecentOrderNumber]);
          if (orderIds.length > 0) {
            const mostRecentOrderId = orderIds[0];
            const mostRecentOrder =
              data[mostRecentOrderNumber][mostRecentOrderId];
            setLatestOrder(mostRecentOrder);
          }
        }
      } else {
        console.error("Failed to fetch orders: Response not OK.");
        setLatestOrder(null);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLatestOrder(null);
    }
  };

  const closeModal = () => {
    setIsMinimized(true);
    setShowModal(false);
  };

  const modalClasses = `fixed ${
    isMinimized
      ? "bottom-5 left-5 h-20 overflow-hidden"
      : "inset-0 flex justify-center items-center"
  }`;

  return (
    <main className="relative  w-full lg:max-w-[1600px] mx-auto">
      <ScrollToTop />
      <Header />
      <Collection />
      <Stylish />
      <Envoirment />
      <Meterials />
      <Network />
      <Review />
      <IconSection />
      <UserInitialization />
      {isMinimized && (
        <button
          onClick={openModal}
          className="fixed bottom-5 left-5 z-50 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md"
        >
          Track Order
        </button>
      )}

      {showModal && (
        <div className={modalClasses}>
          <div
            className="bg-white p-6 rounded-lg w-full max-w-xl mx-auto"
            style={{ transition: "all 0.3s" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2>Welcome to theoutmaker</h2>
              <button
                onClick={closeModal}
                className="text-lg font-semibold hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="pt-4 border-t-2">
              {latestOrder ? (
                <>
                  <h3>Order Details:</h3>
                  <div className="overflow-x-auto sm:overflow-x-visible">
                    <div className="block sm:table w-full">
                      {/* Repeat this structure for each detail */}
                      <div className="flex flex-col sm:table-row">
                        <div className="flex sm:table-cell p-2 font-bold">
                          Order ID
                        </div>
                        <div className="flex sm:table-cell p-2">
                          {latestOrder.order?.order_id}
                        </div>
                      </div>
                      <div className="flex flex-col sm:table-row">
                        <div className="flex sm:table-cell p-2 font-bold">
                          Product Name
                        </div>
                        <div className="flex sm:table-cell p-2">
                          {latestOrder.product?.p_name}
                        </div>
                      </div>
                      {/* ... other details ... */}
                    </div>
                  </div>
                </>
              ) : (
                <p>No recent orders found.</p>
              )}

              <div className="mt-5">
                <Link
                  to="/OrderList"
                  className="btn btn-primary rounded-full w-full text-white"
                >
                  View Order List
                </Link>
                <Link
                  to="/categories"
                  className="btn btn-primary rounded-full w-full text-white mt-5"
                >
                  Go to Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
