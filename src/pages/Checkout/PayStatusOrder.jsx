import React, { useEffect, useState } from "react";
import { useOrderStatus, useOrderDetail } from "../../Hooks/api/useOceanpayment";
import PaymentSuccessfulIcon from "../../assets/icons/PaymentSuccessful.svg";
import PaymentError from "../../assets/icons/PaymentError.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';
const PaymentSuccess = () => {
  const location = useLocation();
  const { order_no } = useParams();
  const [status, setStatus] = useState("loading");
  const [details, setDetails] = useState({ orderId: '----', paymentAmount: '--', paymentType: '--', create_time: '' });
  const { mutate: ajaxOrderStatus } = useOrderStatus();
  const { mutate: ajaxOrderDetail } = useOrderStatus();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  let i = 30;
  let j = 0;
  useEffect(() => {
    ajaxOrderStatusFun(order_no);
  }, []);

  const ajaxOrderStatusFun = (order_no) => {
    let param = { order_no: order_no };
    //token返回的是订单验证
    if (token) {
      param.token = token;
    }
    ajaxOrderStatus(param, {
      onSuccess: (result) => {
        //0=Cancelled, 1=Completed, 2=To Ship, 3=Shipping, 4=Returned, 5=Failed, 6=Refunded, 7=Payment Pending, 8=Paid 0=已取消、1=已完成、2=发货、3=发货、4=已退回、5=失败、6=退款、7=待付款、8=已付款
        if (result.code == 1) {
          setDetails({ orderId: result.order.order_no, paymentAmount: result.order.payment_amount, create_time: result.order.created_at, paymentType: result.order.paymentType })
          switch (result.order.status) {
            //支付中,估计会有延迟，按秒计算
            case 7:
              setTimeout(() => {
                if (i >= 0) {
                  //等待状态
                  ajaxOrderStatusFun(order_no);
                  i--;
                } else {
                  //超时按订单失败处理
                  i = 0;
                  setStatus("");

                }
              }, 3000);
              break;
            case 8:
              i = 0;
              setStatus("PS");
              break;
            case 1:
              i = 0;
              setStatus("PS");
              break;
            case 2:
              i = 0;
              setStatus("PS");
              break;
            case 3:
              i = 0;
              setStatus("PS");
              break;
            default:
              i = 0;
              setStatus("");
          }

        }
      }, onError: (error) => {
        setStatus("");
      }
    });

  }
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


  return (
    <div className="flex items-center justify-center h-4/5 bg-gray-100">
      {status == "loading" ? (
        <div className="h-full w-full bg-white rounded-lg shadow-xl p-6 flex flex-col items-center justify-center">
          <div className="max-w-md ">
            <div className="text-center">
              <div className="h-24"></div>
              <h1 className="text-2xl font-semibold text-gray-900 mt-4">
                Wait....
              </h1>
              <p className="text-xl mt-7" style={{ color: "#707070" }}>
                Wait for the payment result
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
                    {details.paymentType}
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
      ) : status == "PS" ? (
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
              <h1 className="text-2xl font-semibold text-gray-900 mt-4">
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
