import React, { useState, useEffect } from "react";
import { getApiBaseUrl } from "../../utils/api/index";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { Link } from "react-router-dom";

const AccountPage = () => {
  // 定义一个状态变量来跟踪当前选中的菜单项
  const [activeTab, setActiveTab] = useState("dashboard");
  const User = JSON.parse(localStorage.getItem("User"));
  const { user_name, user_email, user_lastname, user_firstname } = User;
  const baseUrl = getApiBaseUrl();
  const [filteredOrders, setFilteredOrders] = useState([]); // State for displaying orders
  const getStatusDescription = (statusCode) => {
    const statusDescriptions = {
      0: "Cancelled",
      1: "Completed",
      2: "To Ship",
      3: "Shipping",
      4: "Returned",
      5: "Failed",
      6: "Refunded",
      7: "Payment Pending",
      8: "Paid",
    };

    return statusDescriptions[statusCode] || "Unknown";
  };
  const fetchOrders = async () => {
    // let url = `${baseUrl}/user/all/order/a492754459@outlook.com`;
    let url = `${baseUrl}/user/all/order/${user_email}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const ordersByOrderNumber = {};

      Object.keys(data).forEach((orderNo) => {
        // console.log(orderNo);
        Object.keys(data[orderNo]).forEach((orderKey) => {
          const orderDetails = data[orderNo][orderKey];

          const formattedOrder = {
            id: orderDetails.order.order_id,
            date: orderDetails.order.created_at.split("T")[0],
            orderNumber: orderDetails.order.order_no,
            name: orderDetails.product?.p_name || "Unknown Product",
            color: "Unknown",
            price: orderDetails.item_cost.product_cost,
            quantity: orderDetails.order.quantity,
            total: orderDetails.total_order_cost.total_cost,
            status: orderDetails.order.status,
            image: ImgBaseUrl(orderDetails.product?.p_pic),
          };

          if (!ordersByOrderNumber[formattedOrder.orderNumber]) {
            ordersByOrderNumber[formattedOrder.orderNumber] = [];
          }
          ordersByOrderNumber[formattedOrder.orderNumber].push(formattedOrder);
        });
      });
      // console.log(ordersByOrderNumber);
      const groupedOrders = Object.values(ordersByOrderNumber);

      setFilteredOrders(groupedOrders);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    if (user_email) {
      fetchOrders();
    }
  }, []);
  return (
    <div className="container mx-auto mt-10 p-5 border w-full lg:w-3/4 xl:w-2/3 bg-white">
      <h2 className="text-2xl font-bold mb-5">MY ACCOUNT</h2>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <ul className="list-none">
            <li
              className={`text-gray-700 text-base px-4 py-2 ${
                activeTab === "dashboard" ? "border-l-4 border-green-500" : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </li>
            {/* <li
              className={`text-gray-700 text-base px-4 py-2 ${
                activeTab === "addresses" ? "border-l-4 border-green-500" : ""
              }`}
              onClick={() => setActiveTab("addresses")}
            >
              Addresses (0)
            </li>
            <li
              className="text-gray-700 text-base px-4 py-2"
              onClick={() => setActiveTab("wishlist")}
            >
              Wishlist (0)
            </li>
            <li
              className="text-gray-700 text-base px-4 py-2"
              onClick={() => setActiveTab("logout")}
            >
              Logout
            </li> */}
          </ul>
        </div>
        <div className="w-full md:w-2/3 px-3">
          {activeTab === "dashboard" && (
            <div className="p-5 border-l border-t border-b border-gray-300 bg-gray-100">
              {/* 仪表盘的内容 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 shadow rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Account Info</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="text-gray-900">{user_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="text-gray-900">{user_email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Membership:</span>
                      <span className="text-gray-900">Premium</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 shadow rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-auto">
                    {/* 这里可以循环渲染最近的订单信息 */}
                    {filteredOrders.map((item) => {
                      return (
                        <Link to={`/OrderInformation/${item[0].orderNumber}`}>
                          <div className="flex justify-between gap-2">
                            <div className="text-gray-600 flex-1 whitespace-nowrap overflow-hidden  overflow-ellipsis">
                              {item[0].orderNumber}
                            </div>
                            <div className="text-gray-900 flex-1 text-right">
                              {getStatusDescription(item[0].status)}
                            </div>
                          </div>{" "}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "addresses" && (
            <div className="mt-5">
              {/* 地址的内容 */}
              <h3 className="text-lg font-semibold mb-2">Addresses:</h3>
              {/* 这里应该展示地址列表 */}
            </div>
          )}
          {/* 你可以继续为wishlist和logout添加内容 */}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
