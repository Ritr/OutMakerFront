import React, { useState, useEffect } from "react";
import { getApiBaseUrl } from "../../utils/api/index";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { Link } from "react-router-dom";
import { RxHome } from "react-icons/rx";

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
    <div className="mx-auto w-full lg:max-w-[1600px] mb-4">
      <h2 className="text-2xl font-bold mb-5 px-4 md:mx-0">MY ACCOUNT</h2>
      <div className="container mx-auto mt-10 w-full lg:max-w-[1600px] bg-white md:flex gap-4">
        <div className="md:min-h-16 border border-[#E6E6E6]">
          <div className="bg-[#D8EDF5] bg-opacity-50 px-6 py-3 text-primary md:w-[300px] flex gap-2 items-center">
            <RxHome className="text-xl"></RxHome> Dashboard
          </div>
        </div>
        <div className="flex-1 bg-[#F3F4F6] p-4">
          <h3 className="text-lg font-medium mb-2">Account Info</h3>
          <div className="bg-white px-4 border rounded-sm mb-4 md:min-h-[200px]">
            <div className="py-2">
              <div className="py-2 flex gap-4  border-b border-[#e6e6e6e]">
                <span className="md:w-32 text-right font-medium">Name</span>
                <span className="">{user_name}</span>
              </div>
              <div className="py-2 flex gap-4 border-b border-[#e6e6e6e]">
                <span className="md:w-32 text-right font-medium">Email</span>
                <span className="">{user_email}</span>
              </div>
              <div className="py-2 flex gap-4 border-b border-[#e6e6e6e]">
                <span className="md:w-32 text-right font-medium">
                  Membership
                </span>
                <span className="">Premium</span>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">Recent Orders</h3>
          <div className="bg-white p-4 border rounded-sm  ">
            <div className="grid grid-cols-1 gap-2 max-h-96 overflow-auto">
              {/* 这里可以循环渲染最近的订单信息 */}
              {filteredOrders.map((item) => {
                return (
                  <Link to={`/OrderInformation/${item[0].orderNumber}`}>
                    <div className="flex justify-around items-center gap-2 border-b">
                      <div className=" flex-1 whitespace-nowrap overflow-hidden  overflow-ellipsis">
                        {item[0].orderNumber}
                        <div className="flex items-center">
                          <img
                            className="w-20 h-20 object-contain rounded-md mr-4"
                            src={item[0].image}
                            alt=""
                          />
                          <div className="font-medium  hidden md:block">
                            {item[0].name}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 hidden md:block">
                        {getStatusDescription(item[0].status)}
                      </div>
                      <div className="text-right pr-4 md:pr-8">
                        <div class="bg-primary rounded-full text-white text-xs px-4 py-2 md:text-base md:px-8">
                          Detail
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
