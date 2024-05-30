import React, { useEffect, useState } from "react";
import PaymentSuccessfulIcon from "../../assets/icons/PaymentSuccessful.svg";
import PaymentError from "../../assets/icons/PaymentError.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const PayerID = searchParams.get("PayerID");
  const [status, setStatus] = useState("");
  const [details, setDetails] = useState({});

  const capturePayment = () => {
    fetch(`https://api.theoutmaker.com/api/paypal/capturePayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: token }), // 发送订单ID
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // 处理支付结果
      })
      .catch((error) => {
        console.log("error", error);
        // 处理请求错误
      });
  };

  const getOrderDetails = (OrderID) => {
    setIsLoading(true);
    fetch(
<<<<<<< HEAD
      `https://api.theoutmaker.com/api/paypal/order/${OrderID}/details`
=======
      `https://api.theoutmaker.com/api/paypal/order/${OrderID}/details`
>>>>>>> dev
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          toast.error(result.error);
        }
        const orderDetails = result.orderDetails;

        const orderId = result.orderDetails.id || "1234567890986543278";
        const paymentAmount =
          result.orderDetails.purchase_units[0]?.amount?.value || "A$1611";
        const orderStatus = result.orderDetails.status || "";
        const create_time = result.orderDetails.create_time || "";
        const links = result.orderDetails.links;
        let payerActionHref = "";

        for (let i = 0; i < links.length; i++) {
          if (links[i].rel === "payer-action") {
            payerActionHref = links[i].href;
            break;
          }
        }
        setDetails({
          orderId,
          paymentAmount,
          orderStatus,
          create_time,
          payerActionHref,
        });

        if (orderDetails.status === "APPROVED") {
          // 订单状态为"APPROVED"时，执行支付
          capturePayment();
          setStatus("PS");
        } else if (orderDetails.status === "COMPLETED") {
          setStatus("PS");
        } else {
          setStatus("");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrderDetails(token);
  }, []);
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return ""; // 处理空值
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };
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

  if (isLoading) {
    return <div>Loading...</div>; // 或者加载动画组件
  }

  return (
    <div className="flex items-center justify-center h-4/5 bg-gray-100">
      {status == "PS" ? (
        <div className="h-full w-full bg-white rounded-lg shadow-xl p-6 flex flex-col items-center justify-center">
          <div className="max-w-md ">
            <div className="text-center">
              <img
                src={PaymentSuccessfulIcon}
                alt="Payment Successful"
                className="mx-auto h-24" // Icon size adjusted for responsiveness
              />
              <h1 className="text-2xl font-medium text-gray-900 mt-4">
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
                      {details.orderId}
                    </span>
                    <FaCopy
                      className="cursor-pointer"
                      onClick={() => copyToClipboard(details.orderId)}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-normal text-gray-900">
                    Payment amount
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {details.paymentAmount}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-normal text-gray-900">
                    Payment method
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    Paypal payment
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-normal text-gray-900">
                    Order creation time
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {formatDateTime(details.create_time)}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link to={`/OrderInformation/${details.orderId}`}>
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
              <h1 className="text-2xl font-medium text-gray-900 mt-4">
                Payment failed
              </h1>
              <p className="text-xl mt-7" style={{ color: "#CF0000" }}>
                The payment card is invalid Please re-enter the payment card
                information
              </p>
            </div>

            <div className="text-center mt-7">
              <Link to={`/OrderInformation/${details.orderId}`}>
                <button className="bg-primary text-white  rounded-full w-[300px] md:w-[400px] btn btn-outline justify-center text-sm font-normal">
                  Go to order page
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
