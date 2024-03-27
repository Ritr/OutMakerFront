import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";

const OrderStatusSteps = ({ step }) => {
  if (step == 1) {
    step == 3;
  }

  // Step information including titles and timestamps
  const stepsInfo = [
    {
      title: "Buyer completes payment",
      timestamp: "2023-11-04 21:32:53",
    },
    {
      title: "Wait for the seller's delivery",
      timestamp: "2023-11-05 10:15:00", // Actual timestamp when the seller's delivery is initiated
    },
    {
      title: "Wait for the buyer to confirm receipt",
      timestamp: "2023-11-04 21:32:53", // Placeholder timestamp
    },
    {
      title: "Deal is done",
      timestamp: "2023-11-04 21:32:53", // Placeholder timestamp
    },
  ];

  return (
    <div className="bg-white py-4 mb-8 text-center">
      {/* Steps Component */}
      <div className="mb-4">
        <div className="steps steps-vertical" data-active-step={step}>
          {stepsInfo.map((info, index) => (
            <div
              key={index}
              className={`step ${index <= step ? "step-primary" : ""}`}
            >
              <div className="flex flex-col items-start">
                <span className="text-black text-left font-medium">
                  {info.title}
                </span>
                <span
                  className={`text-sm ${
                    index <= step ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {info.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Status Description */}
      <div className="border-t border-gray-300 px-10 py-4 text-left">
        {/* Status Descriptions */}
        <p className="text-sm text-gray-700">
          1. If you do not receive your goods within the normal delivery time,
          or if you encounter any issues after receiving your order, you can
          contact us at any time.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          2. If we fail to fulfill the agreement, you are free to apply for a
          refund, which we will process promptly. Once the refund is completed,
          the transaction will be closed.
        </p>
        <p className="text-sm text-blue-600 mt-2 cursor-pointer">
          3. Add a note
        </p>
      </div>
    </div>
  );
};
const OrderInformation = ({ orders }) => {
  const calculateTotalCost = () => {
    let totalCost = 0;
    let totalShippingCost = 0;

    for (const order of orders) {
      totalCost += order.total_order_cost.total_cost;
      totalShippingCost += order.total_order_cost.total_shipping_cost;
    }

    const freight = totalShippingCost; // Freight is the total shipping cost
    const actualPayment = totalCost; // Actual Payment is the total cost

    return { freight, actualPayment };
  };

  const { freight, actualPayment } = calculateTotalCost();

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div className="relative mx-auto bg-white rounded-sm">
      {/* Order Information Heading with rounded corners */}
      <div className="inline-flex h-[60px] bg-[#002B5B] rounded-tl-md rounded-br-md">
        <h2 className="text-[22px] font-medium text-white pt-4 pb-4 pl-[30px] pr-[30px] ">
          Order Information
        </h2>
      </div>

      {/* Goods Receiving and Seller Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10 pb-0">
        <div>
          <h3 className="text-xl text-[#002B5B] font-bold mb-7">
            Goods Receiving Information
          </h3>
          <p className="mb-7 text-lg text-[#707070]">
            Order Number: {orders[0]?.order?.order_no}
          </p>
          <p className="mb-7 text-lg text-[#707070]">
            Order Creation time: {formatDate(orders[0]?.order?.created_at)}
          </p>
          <p className="mb-7 text-lg text-[#707070]">
            Consignee: {orders[0]?.order?.receiver_name}
          </p>
          <p className="mb-7 text-lg text-[#707070]">
            Delivery Address: {orders[0]?.order?.address}
          </p>
          <p className="mb-7 text-lg text-[#707070]">
            Contact: {orders[0]?.order?.phone}
          </p>
          <p className="mb-7 text-lg text-[#707070]">
            Delivery Period: It is expected to be delivered before 24:00,
            November 09, 2023
          </p>
        </div>
        <div>
          <h3 className="text-xl text-[#002B5B] font-bold mb-7">
            Seller Information
          </h3>
          <p className="mb-7 text-lg text-[#707070]">
            Supplier: HEDON INTERNATIONAL TRADING CO.
          </p>
          <p className="mb-7 text-lg text-[#707070]">
            Address: 139 Keys Road, Moorabbin, VIC
          </p>
          <p className="mb-7 text-lg text-[#707070]">
            Email: contact @theoutmaker.com
          </p>
        </div>
      </div>

      <OrderDetails orders={orders} />

      <TotalCost freight={freight} actualPayment={actualPayment} />
      <ActionButtons step={orders[0]?.order.status} />
    </div>
  );
};

const OrderDetails = ({ orders }) => {
  return (
    <div className="mb-8">
      {orders.map((order, index) => (
        <div key={index} className="bg-white shadow rounded-lg mb-4 p-4">
          {/* Product Image and Details */}
          <div className="flex items-start">
            <img
              src={ImgBaseUrl(order.product.p_pic)}
              alt={order.product.p_name}
              className="w-24 h-24 object-contain rounded-md mr-4"
            />
            <div className="flex flex-col justify-between">
              <div>
                <div className="text-gray-800 font-medium text-lg">
                  {order.product.p_name}
                </div>
                <div className="text-gray-600">Commodity name</div>
                <div className="text-gray-500 mt-2">
                  ${order.item_cost.product_cost}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                x{order.order.quantity}
              </div>
            </div>
          </div>
          {/* Price and Shipping */}
          <div className="flex justify-between items-center mt-4 border-t pt-4">
            <div className="text-gray-600">Freight</div>
            <div className="text-gray-800">
              {order.item_cost.shipping_cost === 0
                ? "Free shipping"
                : `$${order.item_cost.shipping_cost}`}
            </div>
          </div>
          {/* Total Amount */}
          <div className="flex justify-between items-center mt-2">
            <div className="text-gray-600">Total 1 pc amount:</div>
            <div className="text-gray-800">${order.item_cost.total_cost}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TotalCost = ({ freight, actualPayment }) => {
  return (
    <div className="p-10 mb-8">
      <div className="flex justify-end mb-4">
        {/* <p className="text-lg font-bold text-black pr-1">
          30 days no reason to return
        </p> */}
        <Link to="/ShippingPolicy">
          <p className="text-lg font-bold text-[#002B5B]">shipping delivey </p>
        </Link>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold text-[#002B5B]">Total Cost</p>
        <p className="text-lg font-bold text-[#002B5B]">${actualPayment}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-base text-[#002B5B]">Freight</p>
        <p className="text-lg font-bold text-[#002B5B]">${freight}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-base text-[#002B5B]"> Actual Payment</p>
        <p className="text-lg font-bold text-[#002B5B]">${actualPayment}</p>
      </div>
    </div>
  );
};

const ActionButtons = ({ step }) => {
  // 2  to ship 是代发货，3  shipping是已发货 发货中   1 Completed  0 Cancelled

  // 待出货：取消订单，申请发票，确认订单
  // 已发货：申请售后,申请发票，确认收货
  // 已完成（从发货之后30天，订单状态改为已完成）：申请发票
  // 已取消：什么按钮都没有。
  let buttons = null;

  switch (step) {
    case 2: // 待发货
    case 8:
      buttons = (
        <div className="flex justify-between space-x-2 p-10">
          <button className="btn normal-case bg-white border-[#002B5B] text-[#002B5B]">
            Cancellation Of Order
          </button>
          <div>
            <button className="btn normal-case btn-primary">
              Apply for invoice
            </button>
            <button className="ml-7 btn normal-case btn-primary">
              Confirm An Order
            </button>
          </div>
        </div>
      );
      break;

    case 3: // 已发货
      buttons = (
        <div className="flex justify-between space-x-2 p-10">
          <button className="btn normal-case btn-primary">
            Apply for After-Sales
          </button>
          <button className="btn normal-case btn-primary">
            Apply for invoice
          </button>
          <button className="btn normal-case btn-primary">
            Confirm Receipt
          </button>
        </div>
      );
      break;

    case 1: // 已完成
      buttons = (
        <div className="flex justify-between space-x-2 p-10">
          <button className="btn normal-case btn-primary">
            Apply for invoice
          </button>
        </div>
      );
      break;

    case 0: // 已取消
      buttons = null; // 什么按钮都没有
      break;

    default:
      buttons = null; // 处理未知状态
      break;
  }

  return buttons;
};

const CustomOrderInformationMobile = () => {
  const { number } = useParams();
  const [filteredData, setFilteredData] = useState([]);

  // Function to fetch orders based on the email
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `https://theoutmaker.com/public/api/user/single/order/${number}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const a = Object.values(data).filter((order) => {
        return order.order.order_no === number;
      });
      setFilteredData(a);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="container  mx-auto bg-[#EAEAEA]  shadow-lg rounded-lg">
      <OrderStatusSteps step={filteredData[0]?.order.status} />

      <OrderInformation orders={filteredData} />
    </div>
  );
};

export default CustomOrderInformationMobile;
