import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { getApiBaseUrl } from "../../utils/api/index";

const OrderList = () => {
  const [filteredOrders, setFilteredOrders] = useState([]); // State for displaying orders
  const [searchEmail, setSearchEmail] = useState("");
  const [searchType, setSearchType] = useState("email");

  // const userCode = localStorage.getItem("usercode");
  const [userCode, setUserCode] = useState("");

  const baseUrl = getApiBaseUrl();

  useEffect(() => {
    // Fetch user code from localStorage when the component mounts
    // const storedUserCode = localStorage.getItem("usercode");

    // if (storedUserCode) {
    //   setUserCode(storedUserCode);
    //   fetchOrders(storedUserCode);
    // }
  }, []);

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    if (searchType === "email") {
      setSearchEmail(e.target.value);
    } else {
      setUserCode(e.target.value);
    }
  };
  // Function to fetch orders based on the email
  const fetchOrders = async (storedUserCode) => {
    let url = "";
    if (searchType === "email") {
      url = `${baseUrl}/user/all/order/${storedUserCode}`;
    } else {
      url = `${baseUrl}/user/all/order_code/${storedUserCode}`;
    }
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

  // Function to handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchData = searchType === "email" ? searchEmail : userCode;
    fetchOrders(searchData);
  };

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

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="btn-group">
        <button
          className="btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`btn ${page === currentPage ? "btn-active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };
  return (
    <>
      <div className="container mx-auto p-4 bg-white shadow rounded">
        <form onSubmit={handleSearchSubmit} className="flex items-center m-4">
          <input
            type="text"
            value={searchType === "email" ? searchEmail : userCode}
            onChange={handleSearchChange}
            placeholder={`Search by ${
              searchType === "email" ? "Email" : "Order Code"
            }`}
            className="p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-grow m-3"
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent m-3"
          >
            <option value="email">Email</option>
            <option value="code">Order Code</option>
          </select>
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded-r-mdtransition-colors"
          >
            Search
          </button>
        </form>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Commodity
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Unit price
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Actual payment
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    status
                  </th>
                </tr>
              </thead>
              <tbody className="mt-16">
                {filteredOrders.map((group) => (
                  <React.Fragment key={group[0].orderNumber}>
                    <tr className="bg-gray-100">
                      <td colSpan="5" className="px-5 py-2 text-sm">
                        <div className="flex justify-between items-center">
                          <div className="text-gray-900">
                            {group[0].date} Order number: {group[0].orderNumber}
                          </div>
                          <div className="bg-primary text-white flex px-3 py-1 text-center items-center justify-center font-medium leading-tight rounded-full w-32 h-8">
                            <Link
                              to={`/OrderInformation/${group[0].orderNumber}`}
                            >
                              Order Details
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {group.map((order) => (
                      <tr className="bg-white" key={order.id}>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <a href="#" className="block relative">
                                <img
                                  alt="Product"
                                  src={order.image}
                                  className="mx-auto object-cover rounded-full h-10 w-10 "
                                />
                              </a>
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {order.name}
                              </p>
                              <p className="text-gray-600 whitespace-no-wrap">
                                Color: {order.color}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {order.price}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {order.quantity}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {order.total}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <span className="relative">
                            {getStatusDescription(order.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {/* <div className="flex justify-center my-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

const OrderListMB = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState({}); // To store the orders
  const [filteredCommodities, setFilteredCommodities] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const baseUrl = getApiBaseUrl();

  const statusMap = {
    0: "Canceled",
    1: "Completed",
    2: "To be shipped",
    3: "Shipping",
    4: "Returned",
    5: "Failed",
    6: "Refunded",
    7: "Payment Pending",
    8: "Paid",
  };
  // Function to format order
  const formatOrder = (orderItem) => {
    return {
      id: orderItem.order.order_id,
      order_no: orderItem.order.order_no,
      status: statusMap[orderItem.order.status],
      productName: orderItem.product?.p_name,
      color: "Beige",
      price: `$${orderItem.item_cost.product_cost.toFixed(2)}`,
      quantity: orderItem.order.quantity,
      image: ImgBaseUrl(orderItem.product?.p_pic), // Update with correct image path
      totalAmount: `$${orderItem.total_order_cost.total_cost.toFixed(2)}`,
      date: orderItem.order.created_at.split("T")[0],
    };
  };

  const CommodityCard = ({ group }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg mb-4">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Order Number: {group[0].order_no}
              </h2>
              <p className="text-sm text-gray-600">Date: {group[0].date}</p>
            </div>
            <div className="px-3 py-1 text-xs text-[#F7C34B] font-bold rounded-full">
              {group[0].status}
            </div>
          </div>
          {group.map((product, index) => (
            <div
              key={index}
              className="flex items-center border-t border-gray-200 pt-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 mr-4 mx-auto object-fit "
              />
              <div className="flex flex-col justify-between flex-grow">
                <h3 className="text-md font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">Color: {product.color}</p>
                <div className="text-sm text-gray-800 flex justify-between">
                  <p>Price: {product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 text-right">
          <p className="text-sm text-gray-600">
            Total Order Amount: {group[0].total}
          </p>
        </div>
        <div className="p-4 flex justify-around border-t border-gray-200">
          <button className="btn text-white h-8 rounded-full w-1/3 m-1 text-xs normal-case btn-primary">
            Payment
          </button>
          <button className="btn text-white h-8 rounded-full w-1/3 m-1 text-xs normal-case btn-primary">
            Logistics
          </button>
          <button className="btn text-white h-8 rounded-full w-1/3 m-1 text-xs normal-case btn-primary">
            Detail
          </button>
        </div>
      </div>
    );
  };

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        // `https://api.theoutmaker.com/api/user/all/order/${searchTerm}`
        `${baseUrl}/user/all/order/${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const ordersByOrderNumber = {};
      Object.keys(data).forEach((orderNo) => {
        Object.keys(data[orderNo]).forEach((orderKey) => {
          const orderDetails = data[orderNo][orderKey];
          console.log("-----------");
          console.log(orderDetails);
          const formattedOrder = formatOrder(orderDetails);

          if (!ordersByOrderNumber[formattedOrder.order_no]) {
            ordersByOrderNumber[formattedOrder.order_no] = [];
          }
          ordersByOrderNumber[formattedOrder.order_no].push(formattedOrder);
        });
      });
      setOrders(ordersByOrderNumber);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    let filtered = Object.values(orders).flat();
    if (activeTab !== "all") {
      filtered = filtered.filter((order) => order.status === activeTab);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.order_no.includes(searchTerm) ||
          order.productName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredOrders(filtered);
  }, [orders, activeTab, searchTerm]);

  return (
    <div className="container mx-auto p-4 pt-16 md:pt-0">
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex justify-between items-center mt-4 p-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search orders"
            className="input input-bordered flex-grow mr-4"
          />
          <button onClick={fetchOrders} className="btn btn-primary">
            Search
          </button>
        </div>
      </div>
      <div className="mt-4">
        {Object.entries(orders).map(([orderNo, group], index) => (
          <CommodityCard key={index} group={group} />
        ))}
      </div>
    </div>
  );
};

const ResponsiveOrderList = ({ commodities }) => {
  // You can also use window.innerWidth or a state with useEffect to handle resize events
  // but for simplicity we are using CSS to handle the responsiveness
  return (
    <>
      <div className="hidden sm:block">
        <OrderList commodities={commodities} />
      </div>
      <div className="block sm:hidden">
        <OrderListMB commodities={commodities} />
      </div>
    </>
  );
};

export default ResponsiveOrderList;
