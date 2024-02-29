import React, { useEffect, useState } from "react";
import PaymentSuccessfulIcon from "../../assets/icons/PaymentSuccessful.svg";
import PaymentError from "../../assets/icons/PaymentError.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaCopy } from "react-icons/fa";

import { useFetchLianlianPayQuery } from "../../Hooks/api/useLianlianPayment";

const PaymentSuccess = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchLianlianPayQuery(id);
  const [status, setStatus] = useState(""); // 定义状态来存储接口返回的状态
  const [orderData, setOrderData] = useState(null); // 定义状态来存储接口返回的订单数据
  const [paymentData, setPaymentData] = useState(null); // 定义状态来存储支付信息

  useEffect(() => {
    if (data) {
      if (data.return_code === "SUCCESS") {
        setStatus("PS");
        setOrderData(data.order);
        setPaymentData(data.order.payment_data);
      } else {
        setStatus("FAILED");
      }
    }
  }, [data]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // You can display a message to the user indicating that the copy was successful.
        alert("Order number copied to clipboard.");
      },
      (err) => {
        // You can process the error here.
        console.error("Could not copy text: ", err);
      }
    );
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString || dateTimeString.length !== 14) return "Invalid Date";

    // 将时间字符串转换成 YYYY-MM-DDTHH:mm:ss 格式
    const formattedDateString = `${dateTimeString.substring(
      0,
      4
    )}-${dateTimeString.substring(4, 6)}-${dateTimeString.substring(
      6,
      8
    )}T${dateTimeString.substring(8, 10)}:${dateTimeString.substring(
      10,
      12
    )}:${dateTimeString.substring(12, 14)}`;

    const date = new Date(formattedDateString);

    // 检查日期是否有效
    if (isNaN(date)) return "Invalid Date";

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex items-center justify-center h-4/5 bg-gray-100">
      {status && status == "PS" ? (
        <div className="h-full w-full bg-white rounded-lg shadow-xl p-6 flex flex-col items-center justify-center">
          <div className="max-w-md ">
            <div className="text-center">
              <img
                src={PaymentSuccessfulIcon}
                alt="Payment Successful"
                className="mx-auto h-24" // Icon size adjusted for responsiveness
              />
              <h1 className="text-2xl font-semibold text-gray-900 mt-4">
                Payment successful
              </h1>
              <p className="text-xl mt-7" style={{ color: "#707070" }}>
                Thank you for your support
              </p>
            </div>
            <div className="mt-6">
              <div className=" p-4 rounded-md w-96">
                <div className="flex justify-between items-center mb-3">
                  <span
                    className="text-sm font-normal text-gray-900" // Tailwind classes for some styles
                  >
                    Order No.
                  </span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 mr-2">
                      {orderData?.merchant_transaction_id ||
                        "1234567890986543278"}
                    </span>
                    <FaCopy
                      className="cursor-pointer"
                      onClick={() =>
                        copyToClipboard(
                          orderData?.merchant_transaction_id ||
                            "1234567890986543278"
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-normal text-gray-900">
                    Payment amount
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {paymentData?.payment_amount || "AU$1611"}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-normal text-gray-900">
                    Payment method
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    Card payment
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-normal text-gray-900">
                    Order creation time
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {formatDateTime(paymentData?.payment_time) ||
                      "2023-11-04 21:32:53"}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link
                to={`/OrderInformation/${orderData?.merchant_transaction_id}`}
              >
                <button className="bg-primary text-white  rounded-full w-[300px] md:w-[400px] btn btn-outline justify-center text-sm font-normal">
                  View order
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full bg-white rounded-lg shadow-xl p-6 flex flex-col items-center justify-center">
          <div className="max-w-md ">
            <div className="text-center">
              <img
                src={PaymentError}
                alt="Payment Error"
                className="mx-auto h-24" // Icon size adjusted for responsiveness
              />
              <h1 className="text-2xl font-semibold text-gray-900 mt-4">
                Payment failed
              </h1>
              <p className="text-xl mt-7" style={{ color: "#CF0000" }}>
                The payment card is invalid Please re-enter the payment card
                information
              </p>
            </div>

            <div className="text-center mt-7">
              <Link to="/checkout-info">
                <button className="bg-primary text-white  rounded-full w-[300px] md:w-[400px] btn btn-outline justify-center text-sm font-normal">
                  Return to order page
                </button>
              </Link>
              <button
                style={{ background: "#F7C34B", color: "#002B5B" }}
                className=" mt-7   rounded-full w-[300px] md:w-[400px] btn justify-center text-sm font-normal"
              >
                Customer service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
