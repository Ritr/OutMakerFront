import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { getApiBaseUrl } from "../../utils/api/index";
import toast from "react-hot-toast";
import ProductQuantity from "./productQuantity";
import Refund from "./Refund";
const CustomOrderInformationPC = () => {
  const { number } = useParams();
  const [filteredData, setFilteredData] = useState([]);
  const [payerActionLink, setPayerActionLink] = useState("");
  const baseUrl = getApiBaseUrl();
  const [refundVisible, setRefundVisible] = useState(false);
  const getOrderDetails_paypal = () => {
    fetch(`${baseUrl}/paypal/order/${number}/details`)
      .then((response) => response.json())
      .then((result) => {
        const links = result.orderDetails.links;
        // 查找 rel 为 "payer-action" 的链接
        const payerActionLink = links.find(
          (link) => link.rel === "payer-action"
        );
        if (payerActionLink) {
          setPayerActionLink(payerActionLink.href);
        }
        if (result.error) {
          toast.error(result.error);
        }
        return result;
      })
      .catch((error) => console.log("error", error));
  };
  const getOrderDetails_lianlian = () => {
    fetch(`${baseUrl}/lianlian/pay_query/${number}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.order.payment_data.payment_status === "WP") {
          setPayerActionLink(result.order.payment_url);
        }
        if (result.error) {
          toast.error(result.error);
        }

        return result;
      })
      .catch((error) => console.log("error", error));
  };

  // Function to fetch orders based on the email
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/single/order/${number}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const CancellOrder = (order_no) => {
    const url = `${baseUrl}/user/order/payment/cancell/${order_no}`;

    // 发送GET请求到后端路由
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          // 请求成功，处理响应
          return response.json();
        } else {
          // 请求失败，处理错误
          toast.error(response);
          throw new Error("Failed to cancel order");
        }
      })
      .then((data) => {
        // 成功响应处理
        toast.success(data.message);
        console.log(data.message); // 打印成功消息
        location.reload();

        // 在这里可以执行其他操作，例如更新页面等
      })
      .catch((error) => {
        // 错误处理
        console.error(error.message); // 打印错误消息
        // 在这里可以执行其他错误处理操作
      });
  };

  useEffect(() => {
    // 定义一个异步函数来获取订单
    const getOrders = async () => {
      try {
        const orders = await fetchOrders();
        console.log("Orders:", orders);
        const ordersArray = Object.values(orders);
        setFilteredData(ordersArray);
        // 在这里，您可以使用 orders 变量来执行其他操作，如设置状态等
        // 假设您不知道订单的具体键（如"138"）
        // const orderKeys = Object.keys(orders);
        // orderKeys.forEach((key) => {
        //   const order = orders[key].order;
        //   // 获取paypal_order_no
        //   const paypalOrderNo = order.paypal_order_no;

        //   // 获取payment_method
        //   const paymentMethod = order.payment_method;
        //   if (paymentMethod == "0") {
        //     getOrderDetails_paypal(paypalOrderNo);
        //   } else {
        //     getOrderDetails_lianlian(order.order_no);
        //   }
        // });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // 调用异步函数
    getOrders();
  }, []);

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

  const calculateTotalCost = () => {
    let totalCost = 0;
    let totalShippingCost = 0;
    let ActualPayment = 0;

    for (const order of filteredData) {
      totalCost += order.item_cost.product_cost * order.item_cost.quantity;
      ActualPayment += order.total_order_cost.total_cost;
      totalShippingCost += order.total_order_cost.total_shipping_cost;
    }

    const freight = totalShippingCost; // Freight is the total shipping cost
    const actualPayment = ActualPayment; // Actual Payment is the total cost
    console.log("calculateTotalCost", freight, actualPayment, totalCost);
    return { freight, actualPayment, totalCost };
  };

  const { freight, actualPayment, totalCost } = calculateTotalCost();

  const OrderStatusSteps = ({ step, timestamps }) => {
    // 0=已取消、1=已完成、2=发货、3=发货、4=已退回、5=失败、6=退款、7=待付款、8=已付款
    if (step == 1) {
      step == 3;
    } else if (step == 7) {
      step = 0;
    } else if (step == 8) {
      step = 1;
    }

    // Dummy timestamps for each step
    // const timestamps = [formatDate(time), "", "", ""];
    timestamps = [...timestamps, "", "", "", ""].slice(0, 4);

    return (
      <div className="bg-white py-4 mb-8 text-center">
        {/* Steps and Timestamps */}
        <div className="flex justify-between mb-2">
          {timestamps.map((time, index) => (
            <div
              key={index}
              className={`mx-4 ${index === step ? "text-gray-800" : "text-gray-400"
                }`}
            >
              {time ? formatDate(time) : ""}
            </div>
          ))}
        </div>

        {/* DaisyUI Steps Component */}
        <div className="steps w-full">
          <div className={`step ${step >= 0 ? "step-primary" : ""}`}>
            Buyer completes payment
          </div>
          <div className={`step ${step >= 1 ? "step-primary" : ""}`}>
            Wait for the seller's delivery
          </div>
          <div className={`step ${step >= 2 ? "step-primary" : ""}`}>
            Wait for the buyer to confirm receipt
          </div>
          <div className={`step ${step >= 3 ? "step-primary" : ""}`}>
            Deal is done
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
            refund, which we will process promptly. Once the refund is
            completed, the transaction will be closed.
          </p>
          <p className="text-sm text-blue-600 mt-2 cursor-pointer">
            3. Add a note
          </p>
        </div>
      </div>
    );
  };

  const OrderInformation = ({ orders }) => {
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
              Email: {orders[0]?.order?.receiver_email}
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
            {/* <p className="mb-7 text-lg text-[#707070]">
              Delivery Period: It is expected to be delivered before 24:00,
              November 09, 2023
            </p> */}
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
      </div>
    );
  };

  const OrderDetails = ({ orders }) => {
    const getStatus_text = (status) => {
      let statusMessage = "";

      switch (status) {
        case 0:
          statusMessage = "Cancelled";
          break;
        case 1:
          statusMessage = "Completed";
          break;
        case 2:
          statusMessage = "To Ship";
          break;
        case 3:
          statusMessage = "Shipping";
          break;
        case 4:
          statusMessage = "Returned";
          break;
        case 5:
          statusMessage = "Failed";
          break;
        case 6:
          statusMessage = "Refunded";
          break;
        case 7:
          statusMessage = "Payment Pending";
          break;
        case 8:
          statusMessage = "Paid";
          break;
        default:
          statusMessage = "Unknown Status";
          break;
      }
      return statusMessage;
    };

    const get_categories_name = (id) => {
      const categoriesArray = [
        {
          id: 1,
          name: "Outdoor 3 Seater Sofa Set",
        },
        {
          id: 2,
          name: "Outdoor 2 Seater Sofa Set",
        },
        {
          id: 3,
          name: "Outdoor Chair Set",
        },
        {
          id: 4,
          name: "3 Seater Sofa",
        },
        {
          id: 5,
          name: "2 Seater Sofa",
        },
        {
          id: 6,
          name: "Arm Chair",
        },
        {
          id: 7,
          name: "Sectional Sofa",
        },
        {
          id: 8,
          name: "Dining Set",
        },
        {
          id: 9,
          name: "Sun Lounge",
        },
        {
          id: 10,
          name: "Outdoor Table",
        },
      ];
      const category = categoriesArray.find((category) => category.id === id);
      return category ? category.name : "Category not found";
    };

    return (
      <div className="p-10 pb-1 bg-white ">
        {/* Commodity Table */}
        <div className="shadow overflow-hidden rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="bg-[#E7F1FD]">
              <tr>
                <th
                  scope="col"
                  className="text-left py-3 px-4 text-sm font-medium text-gray-800"
                >
                  Commodity
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-sm font-medium text-gray-800"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-sm font-medium text-gray-800"
                >
                  Unit price
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-sm font-medium text-gray-800"
                >
                  Discounts
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-sm font-medium text-gray-800"
                >
                  Payment method
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-sm font-medium text-gray-800"
                >
                  Distribution mode
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-sm font-medium text-gray-800"
                >
                  Goods status
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <img
                        src={ImgBaseUrl(order.product.p_pic)}
                        alt={order.product.p_name}
                        className="w-20 h-20 object-contain rounded-md mr-4"
                      />
                      <div>
                        <div className="font-medium text-base">
                          {order.product.p_name}
                        </div>
                        <div className="text-gray-600 text-base">
                          {get_categories_name(order.product.p_category)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Color: Beige
                        </div>
                        <div className="flex space-x-2 mt-2">
                          {/* product?.quantity >0 现货，否则预售*/}
                          {/* {JSON.stringify(order)} */}
                          <ProductQuantity
                            product={order.product}
                          ></ProductQuantity>
                          <span className="text-[#002B5B] text-[10px] font-medium px-3 py-1 rounded-full border border-[#002B5B]">
                            Fast money back
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {order.order.quantity}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {order.item_cost.product_cost}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {" "}
                    {order.item_cost.discount_cost}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {order.order.payment_method == "0"
                      ? "paypal"
                      : order.order.payment_method == "1"
                        ? "card"
                        : "unknown"}
                  </td>
                  <td className="py-4 px-4 text-center">Expressage</td>
                  <td className="py-4 px-4 text-center">
                    {getStatus_text(order.order.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const TotalCost = ({ freight, actualPayment, totalCost }) => {
    return (
      <div className="p-10 bg-white ">
        <div className="flex justify-end mb-4">
          {/* <p className="text-lg font-bold text-black pr-1">
            30 days no reason to return
          </p> */}
          <Link to="/ShippingPolicy">
            <p className="text-lg font-bold text-[#002B5B]">shipping delivey</p>
          </Link>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-bold text-[#002B5B]">Total Cost</p>
          <p className="text-lg font-bold text-[#002B5B]">A${actualPayment}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-base text-[#002B5B]">Freight</p>
          <p className="text-lg font-bold text-[#002B5B]">A${freight}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-base text-[#002B5B]"> Actual Payment</p>
          <p className="text-lg font-bold text-[#002B5B]">A${actualPayment}</p>
        </div>
      </div>
    );
  };

  const ActionButtons = ({ order_no, status }) => {
    const [isInvoiceModalOpen, setInvoiceModalOpen] = useState(false);
    const [isAfterSalesModalOpen, setAfterSalesModalOpen] = useState(false);
    // 2  to ship 是代发货，3  shipping是已发货 发货中   1 Completed  0 Cancelled
    // 0=已取消、1=已完成、2=发货、3=发货、4=已退回、5=失败、6=退款、7=待付款、8=已付款
    // 待出货：取消订单，申请发票，确认订单
    // 已发货：申请售后,申请发票，确认收货
    // 已完成（从发货之后30天，订单状态改为已完成）：申请发票
    // 已取消：什么按钮都没有。
    // const handlePayPalPayment = (order_no) => {
    //   window.location.href = payerActionLink;
    // };

    const InvoiceModal = () => {
      const [companyName, setCompanyName] = useState("");
      const [taxId, setTaxId] = useState("");

      const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
      };

      const handleTaxIdChange = (event) => {
        setTaxId(event.target.value);
      };

      const handleInvoice = () => {
        // ... do something with companyName and taxId
        setInvoiceModalOpen(false);
      };

      if (!isInvoiceModalOpen) return null;

      return (
        <div className="modal modal-open fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="modal-box relative bg-white rounded max-w-lg mx-auto my-10 p-5">
            <h3 className="font-bold text-lg">Company/Individual Name:</h3>
            <input
              type="text"
              placeholder="Please Fill in Company/Individual Name:"
              className="input input-bordered w-full mb-4"
              value={companyName}
              onChange={handleCompanyNameChange}
            />

            <h3 className="font-bold text-lg">Tax ID:</h3>
            <input
              type="text"
              placeholder="Please Fill in Tax ID:"
              className="input input-bordered w-full mb-4"
              value={taxId}
              onChange={handleTaxIdChange}
            />

            <div className="flex flex-col items-center space-y-4">
              <button
                className="btn btn-primary w-full max-w-xs normal-case"
                onClick={handleInvoice}
              >
                Submit to
              </button>
              <button
                className="btn btn-ghost w-full max-w-xs normal-case"
                onClick={() => setInvoiceModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    };

    const AfterSalesModal = ({ isOpen, onClose }) => {
      const [afterSalesType, setAfterSalesType] = useState("");
      const [problemDescription, setProblemDescription] = useState("");

      const handleAfterSalesTypeChange = (event) => {
        setAfterSalesType(event.target.value);
      };

      const handleProblemDescriptionChange = (event) => {
        setProblemDescription(event.target.value);
      };

      const handleSubmit = () => {
        // Your submission logic here
        console.log("After-Sales Type:", afterSalesType);
        console.log("Problem Description:", problemDescription);
        onClose(); // Call the onClose prop to close the modal
      };

      if (!isOpen) return null;

      return (
        <div className="modal modal-open fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="modal-box relative bg-white rounded max-w-lg mx-auto my-10 p-5">
            <h3 className="font-bold text-lg">
              Please select the after-sales type
            </h3>

            <form className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="afterSalesType"
                  value="refund"
                  checked={afterSalesType === "refund"}
                  onChange={handleAfterSalesTypeChange}
                  className="radio radio-primary"
                />
                <span>Refund</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="afterSalesType"
                  value="return"
                  checked={afterSalesType === "return"}
                  onChange={handleAfterSalesTypeChange}
                  className="radio radio-primary"
                />
                <span>Return of goods</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="afterSalesType"
                  value="return-refund"
                  checked={afterSalesType === "return-refund"}
                  onChange={handleAfterSalesTypeChange}
                  className="radio radio-primary"
                />
                <span>Returns and refunds</span>
              </label>

              <textarea
                placeholder="Please describe the problem"
                className="textarea textarea-bordered w-full"
                value={problemDescription}
                onChange={handleProblemDescriptionChange}
              ></textarea>

              <div className="flex flex-col items-center space-y-4">
                <button
                  type="button"
                  className="btn btn-primary w-full max-w-xs normal-case"
                  onClick={handleSubmit}
                >
                  Submit to
                </button>
                <button
                  type="button"
                  className="btn btn-ghost w-full max-w-xs normal-case"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    const closeAfterSalesModal = () => {
      setAfterSalesModalOpen(false);
    };

    // 待出货：取消订单，申请发票，确认订单
    // 已发货：申请售后,申请发票，确认收货
    // 已完成（从发货之后30天，订单状态改为已完成）：申请发票
    // 已取消：什么按钮都没有。
    let buttons = null;

    switch (status) {
      case 7: // 待付款
        buttons = (
          <div className="flex justify-between space-x-2 p-10 bg-white">
            <button
              onClick={() => CancellOrder(order_no)}
              className="btn normal-case bg-white border-[#002B5B] text-[#002B5B]"
            >
              Cancell Order
            </button>
            {/* <div>
              <button
                onClick={() => handlePayPalPayment(order_no)}
                className="ml-7 btn normal-case btn-primary"
              >
                Pay of Order
              </button>
            </div> */}
          </div>
        );
        break;

      case 2: // 待发货
        buttons = (
          <div className="flex justify-between space-x-2 p-10 bg-white">
            <div>
              <button
                onClick={() => CancellOrder(order_no)}
                className="btn normal-case bg-white border-[#002B5B] text-[#002B5B] mr-7"
              >
                Cancellation Of Order
              </button>
              {/* 退款 */}
              <button
                onClick={() => setRefundVisible(true)}
                className="btn normal-case btn-primary"
              >
                Refund
              </button>
            </div>
            <div>
              <button
                onClick={() => setInvoiceModalOpen(true)}
                className="btn normal-case btn-primary"
              >
                Apply for invoice
              </button>
              <button className="ml-7 btn normal-case btn-primary">
                Confirm An Order
              </button>
            </div>
          </div>
        );
        break;
      case 6:
        buttons = (
          <div className="flex justify-between space-x-2 p-10 bg-white">
            <div>
              <button
                onClick={() => CancellOrder(order_no)}
                className="btn normal-case bg-white border-[#002B5B] text-[#002B5B] mr-7"
              >
                Cancellation Of Order
              </button>
            </div>
            <div>
              <button
                onClick={() => setInvoiceModalOpen(true)}
                className="btn normal-case btn-primary"
              >
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
          <div className="flex justify-between space-x-2 p-10 bg-white">
            <button
              onClick={() => setAfterSalesModalOpen(true)}
              className="btn normal-case btn-primary"
            >
              Apply for After-Sales
            </button>
            <div>
              <button
                onClick={() => setInvoiceModalOpen(true)}
                className="btn normal-case btn-primary"
              >
                Apply for invoice
              </button>
              <button className="btn normal-case ml-3 btn-primary">
                Confirm Receipt
              </button>
            </div>
          </div>
        );
        break;

      case 1: // 已完成
        buttons = (
          <div className="flex space-x-2 p-10 bg-white">
            <button
              onClick={() => setInvoiceModalOpen(true)}
              className="btn normal-case btn-primary mr-7"
            >
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

    return (
      <>
        {buttons}
        <InvoiceModal />
        <AfterSalesModal
          isOpen={isAfterSalesModalOpen}
          onClose={closeAfterSalesModal}
        />
      </>
    );
  };

  return (
    <div className="container  mx-auto bg-[#F7F7F7]  shadow-lg rounded-lg">
      <OrderStatusSteps
        step={filteredData[0]?.order.status}
        timestamps={[filteredData[0]?.order.created_at, "", "", ""]}
      />
      <OrderInformation orders={filteredData} />
      <OrderDetails orders={filteredData} />

      <TotalCost
        freight={freight}
        actualPayment={actualPayment}
        totalCost={totalCost}
      />
      <ActionButtons
        order_no={filteredData[0]?.order.order_no}
        status={filteredData[0]?.order.status}
      />
      <Refund
        visible={refundVisible}
        onCancel={() => setRefundVisible(false)}
        max={actualPayment}
        id={filteredData[0]?.order.order_id}
      />

    </div>
  );
};

export default CustomOrderInformationPC;
