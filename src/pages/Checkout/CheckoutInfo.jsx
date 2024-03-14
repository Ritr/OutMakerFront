import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import { CartContext } from "../../Provider/CartProvider";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import bPaypal from "../../assets/icons/bPaypal.svg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import headerIMG from "../../assets/checkinfo.png";
import logo from "../../assets/icons/navIcon.png";
import SidebarCart from "../../components/Navbar/SidebarCart";

import ShippingAddress from "./ShippingAddress";
import { FaShoppingBag, FaQuestionCircle } from "react-icons/fa";

import {
  useCreatePaypalOrder,
  useFetchOrderPaypal,
} from "../../Hooks/api/useCreatePaypalOrder";
import { useFetchOrder, useFetchClear } from "../../Hooks/api/useOrders";

import {
  useGetLianlianToken,
  useLianlianPay,
} from "../../Hooks/api/useLianlianPayment";

import { v4 as uuidv4 } from "uuid";

const CheckoutInfo = () => {
  // context to get the data
  const {
    objectOnlyData,
    isIdTrue,
    updateObjectOnlyData,
    setProductQuantity,
    cartData,
  } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const userId = localStorage.getItem("usercode") || null;
  const [totalChargeFromShipping, setTotalChargeFromShipping] = useState(0);
  const [formDataFromShipping, setFormDataFromShipping] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [formDataemail, setFormDataEmail] = useState("");
  const [paypalOrderID, setPaypalOrderID] = useState("");
  const [isSidebarCartOpen, setIsSidebarCartOpen] = useState(false);
  const { mutate: getLianlianTokenMutate } = useGetLianlianToken();
  const { mutate: lianlianPay, isLoading: isPaying } = useLianlianPay();

  const { mutate: createOrder } = useCreatePaypalOrder();
  const { mutate: fetchOrderPaypal } = useFetchOrderPaypal();
  const { mutate: fetchOrder } = useFetchOrder();
  const { mutate: fetchClear } = useFetchClear();

  const handleTotalCharge = (totalCharge, formData) => {
    setFormDataFromShipping(formData);

    // 计算原价减去77%的折扣后的费用
    const discountRate = 0.77; // 77%的折扣
    const discountedTotalCharge = totalCharge * (1 - discountRate);
    console.log(`totalCharge：${totalCharge}`);
    console.log(`discountedTotalCharge：${discountedTotalCharge}`);
    // 更新总费用为折扣后的费用
    // setTotalChargeFromShipping(0);
    setTotalChargeFromShipping(discountedTotalCharge);
  };

  // Calculate the tax price
  const tax = objectOnlyData?.reduce(
    (total, item) => total + (item?.cost?.tax || 0),
    0
  );

  const totalEstimatedPrice = objectOnlyData?.reduce(
    (total, item) => total + (item?.cost?.total_cost * item?.qunatity || 0),
    0
  );

  // Calculate the shipping cost
  const shippingCost = objectOnlyData?.reduce(
    (total, item) => total + (item?.cost?.shipping_cost * item?.quantity || 0),
    0
  );

  const amount =
    Math.ceil(
      tax + totalChargeFromShipping + shippingCost + totalEstimatedPrice
    ).toFixed(2) || 0;

  const handleForm = async (e) => {
    e.preventDefault();

    setIsBtnLoading(true);

    const {
      country,
      state,
      city,
      firstName,
      lastName,
      address,
      phone,
      email,
      zip,
    } = formDataFromShipping;

    if (
      country &&
      state &&
      city &&
      firstName &&
      lastName &&
      address &&
      phone &&
      formDataemail &&
      zip
    ) {
      // 所有变量都不为空，可以继续执行操作
      // 在这里添加您的代码
    } else {
      // 有一个或多个变量为空，执行错误处理或显示错误消息
      console.error("请填写所有必填字段");
      toast.error("Please fill all the blank parts that are needed");
      return;
    }

    // Australia NSW THE UNIVERSITY OF SYDNEY  气 无 123 Main Staa 123 123123 977429272@qq.com -1
    const idAndNameArray = objectOnlyData.map((item) => {
      return {
        id: item.product.p_id,
        name: item.product.p_name,
      };
    });

    if (paymentMethod == "paypal") {
      // 上传到官方paypal的， 不用修改
      const orderData = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "AUD",
              value: amount,
            },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
              brand_name: "EXAMPLE INC",
              locale: "en-US",
              landing_page: "LOGIN",
              shipping_preference: "NO_SHIPPING",
              user_action: "PAY_NOW",
              return_url: "https://theoutmaker.com.au/paypal/status",
              cancel_url: "https://theoutmaker.com.au/paypal/status",
            },
          },
        },
      };

      createOrder(orderData, {
        onSuccess: (data) => {
          console.log(data);
          if (data?.approvalUrl) {
            localStorage.setItem("OrderID", data?.order.id);
            const approvalUrl = data?.approvalUrl; // approvalUrl支付跳转链接
            const paypalOrderID = data?.order.id; // paypalOrderID官方订单号
            const uuid = uuidv4();
            console.log(approvalUrl, paypalOrderID, uuid);

            const data_fetchOrder = {
              uuid,
              receiver_name: firstName + lastName,
              receiver_email: formDataemail,
              phone,
              address,
              state,
              city,
              zip,
              country,
              payment_method: "0",
              paypal_order_no: paypalOrderID,
              shipping_cost: totalChargeFromShipping,
              total_cost: amount,
            };

            fetchOrderPaypal(
              {
                userinfo: formDataemail,
                product: JSON.stringify(idAndNameArray),
                address: address,
                amount: amount,
                paypal_no: paypalOrderID,
                uuid,
              },
              {
                onSuccess: (data) => {
                  // 处理成功逻辑
                },
                onError: (error) => {
                  // 处理错误逻辑
                },
              }
            );

            fetchOrder(
              {
                userId,
                data: data_fetchOrder,
                order_no: uuid,
              },
              {
                onSuccess: (response) => {
                  if (response.Error) {
                    toast.error(response.Error);
                    return;
                  }
                  // After order draft, execute order clear
                  fetchClear(
                    { userId, order_no: uuid },
                    {
                      onSuccess: () => {
                        // Handle the success scenario for order clear
                        toast.success("Order cleared successfully");
                        // Additional success logic here...
                      },
                      onError: (error) => {
                        // Handle the error scenario for order clear
                        toast.error("Error clearing order: " + error.message);
                      },
                    }
                  );
                },
                onError: (error) => {
                  // Handle the error scenario for order draft
                  toast.error("Error creating order draft: " + error.message);
                },
              }
            );
          } else {
            toast.error("Creating PayPal order failed.");
            return null;
          }
          // 成功后的操作，例如重定向到 PayPal 的 approvalUrl
          window.location.href = data.approvalUrl;
        },
        onError: (error) => {
          // 错误处理已经在 mutation 内部完成，这里可以添加额外的错误处理逻辑
          console.error("error", error);
          toast.error(error.message);
          setIsBtnLoading(false);
        },
      });
    } else if (paymentMethod == "card") {
      const cardToken = await getCardTokenAsync();
      const productList = objectOnlyData.map((item) => {
        const product = item.product;
        return {
          product_id: product.p_id.toString(),
          product_name: product.p_name,
          product_price: item.cost.product_sale_price.toString(),
          product_quantity: item.qunatity.toString(),
          product_url:
            "https://theoutmaker.com.au/product-details/" +
            product.p_id.toString(),
        };
      });
      const uuid = uuidv4();
      const orderData = {
        uuid,
        user_id: userId,
        city: city,
        country: "AU",
        firstName: firstName,
        lastName: lastName,
        line1: address,
        state: state,
        postal_code: zip,
        shipping_name: firstName + " " + lastName,
        shipping_phone: phone,
        order_amount: amount,
        // order_amount: "1",
        order_currency_code: "AUD",
        productList: productList,
        cycle: "48h",
        card_token: cardToken,
        email: formDataemail,
      };

      console.log(orderData);
      lianlianPay(orderData, {
        onSuccess: handlePaymentSuccess,
        onError: (error) => {
          // Handle the error scenario
          console.error("Error in payment process:", error);
          toast.error("Error in payment process:" + error.message);
          setIsBtnLoading(false);
        },
      });
    }
  };

  const handlePaymentSuccess = async (paymentData) => {
    //     {
    //     "code": 1,
    //     "msg": "success",
    //     "data": {
    //         "ll_transaction_id": "2024012702488016",
    //         "merchant_transaction_id": "014d92a8-5f7b-445d-96b5-19c40896fa93",
    //         "payment_data": {
    //             "payment_currency_code": "AUD",
    //             "payment_amount": "1.00",
    //             "payment_time": "20240127071137",
    //             "payment_status": "PS",
    //             "settlement_currency_code": "USD",
    //             "account_date": "20240127"
    //         },
    //         "payment_url": "https://gacashier.lianlianpay-inc.com/in-payment?key=1pgqgn2e5eg",
    //         "key": "1pgqgn2e5eg"
    //     },
    //     "pay_response": {
    //         "return_code": "SUCCESS",
    //         "return_message": "Success",
    //         "trace_id": "925.107.17063394971965565",
    //         "order": {
    //             "ll_transaction_id": "2024012702488016",
    //             "merchant_transaction_id": "014d92a8-5f7b-445d-96b5-19c40896fa93",
    //             "payment_data": {
    //                 "payment_currency_code": "AUD",
    //                 "payment_amount": "1.00",
    //                 "payment_time": "20240127071137",
    //                 "payment_status": "PS",
    //                 "settlement_currency_code": "USD",
    //                 "account_date": "20240127"
    //             },
    //             "payment_url": "https://gacashier.lianlianpay-inc.com/in-payment?key=1pgqgn2e5eg",
    //             "key": "1pgqgn2e5eg"
    //         },
    //         "sign_verify": true
    //     },
    //     "merchant_transaction_id": "014d92a8-5f7b-445d-96b5-19c40896fa93"
    // }
    console.log(paymentData);
    toast.success("Payment successful!!");
    const order_no = paymentData.merchant_transaction_id;
    const paymentAmount = paymentData.data.payment_data.payment_amount;

    // Construct your order data
    const {
      country,
      state,
      city,
      firstName,
      lastName,
      address,
      phone,
      email,
      zip,
    } = formDataFromShipping;
    const orderData = {
      uuid: order_no,
      receiver_name: firstName + lastName,
      receiver_email: formDataemail,
      phone,
      address,
      state,
      city,
      zip,
      country,
      paypal_order_no: "",
      payment_method: "1",
      shipping_cost: totalChargeFromShipping,
      total_cost: paymentAmount,
    };
    // Execute order draft mutation
    fetchOrder(
      {
        userId,
        data: orderData,
        order_no: order_no,
      },
      {
        onSuccess: (response) => {
          if (response.Error) {
            toast.error(response.Error);
            return;
          }
          // After order draft, execute order clear
          fetchClear(
            { userId, order_no },
            {
              onSuccess: () => {
                // Handle the success scenario for order clear
                toast.success("Order cleared successfully");
                // Additional success logic here...
              },
              onError: (error) => {
                // Handle the error scenario for order clear
                toast.error("Error clearing order: " + error.message);
              },
            }
          );
        },
        onError: (error) => {
          // Handle the error scenario for order draft
          toast.error("Error creating order draft: " + error.message);
        },
      }
    );

    if (
      paymentData.data.hasOwnProperty("3ds_status") &&
      paymentData.data["3ds_status"] === "CHALLENGE"
    ) {
      // 如果需要 3DS 认证，则跳转到 payment_url
      const paymentUrl = paymentData.data.payment_url;
      window.location.href = paymentUrl;
    } else {
      // 其他逻辑，例如直接完成支付流程
      window.location.href = `http://theoutmaker.com.au/checkout-info/status/${order_no}`;
    }
  };

  const handleEmailChange = (e) => {
    setFormDataEmail(e.target.value);
  };

  // 异步获取cardToken的函数
  async function getCardTokenAsync() {
    return new Promise((resolve, reject) => {
      LLP.getValidateResult()
        .then(function (res) {
          if (res && res.validateResult) {
            LLP.confirmPay()
              .then(function (result) {
                if (result && result.data) {
                  const card_token = result.data;
                  console.log("success card_token", card_token);
                  resolve(card_token);
                }
              })
              .catch(reject);
          } else {
            console.log("校验不通过，支付取消");
            setIsBtnLoading(false);
            reject(new Error("Validation failed"));
          }
        })
        .catch(reject);
    });
  }

  const mountCardElement = (token) => {
    const elements = LLP.elements(); // LLP should be defined globally or imported
    console.log("mountCardElement", token);
    const card = elements.create("card", {
      token: token,
      style: "", // Define your styles here
      apiType: "", // Set the API type if needed
      // merchantUrl: "https://www.theoutmaker.com.au",
      merchantUrl: location.href,
    });

    card.mount("#llpay-card-element");
  };

  const getToken = () => {
    getLianlianTokenMutate(undefined, {
      onSuccess: (newOrder) => {
        console.log("新的order值: " + newOrder);
        mountCardElement(newOrder);
      },
      onError: (error) => {
        console.error("获取order值失败", error);
        toast.error("getOrder error");
      },
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className="w-full h-full bg-[#F7F7F7]">
        {/* SidebarCart */}
        <SidebarCart
          isOpen={isSidebarCartOpen}
          toggleSidebar={() => setIsSidebarCartOpen(false)}
        />
        {/* <div className="relative bg-cover w-full h-16 md:h-[102px]">
          <img
            src={headerIMG}
            alt="Header"
            className="absolute w-full h-full object-cover" // 确保图像覆盖整个头部
          />
          <div className="flex justify-between items-center px-4 md:px-8 h-full ">
            <Link
              to={"/"}
              className="flex items-center justify-center w-12 h-12 md:w-20 md:h-20"
              style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
            >
              <img src={logo} alt="Logo" className="object-contain z-50" />
            </Link>
            <FaShoppingBag
              onClick={() => setIsSidebarCartOpen(true)}
              size="1.5em"
              color="white"
              className="z-50 cursor-pointer"
            />
          </div>
        </div> */}

        <div className="w-full bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-9">
            {/* mobile order summary */}
            <aside className="sm:hidden bg-[#FFFAEE]">
              <div className="">
                <button
                  onClick={toggleAccordion}
                  className="w-full py-4 text-left focus:outline-none"
                >
                  <div className="flex justify-between p-3">
                    <div className="flex justify-center items-center">
                      <p className="mr-1">
                        {!isOpen ? "Show" : "Hide"} order summary
                      </p>
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </div>

                    <p>A$ {totalEstimatedPrice}</p>
                  </div>
                </button>
                <div className={isOpen ? "px-4 pb-4 bg-white" : "hidden"}>
                  <div className="md:w-96">
                    {objectOnlyData && objectOnlyData.length > 0 ? (
                      objectOnlyData.map((item) => (
                        <div key={item?.product?.p_id} className="flex mb-6">
                          <img
                            src={ImgBaseUrl(item?.product?.p_pic)}
                            alt="Product"
                            className="object-contain rounded w-20 h-20  mr-4"
                          />
                          <div>
                            <h4 className="text-lg font-medium">
                              {item?.product?.p_name.slice(0, 30)}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Glacier / {item?.dimension} / {item?.category}
                            </p>
                            <p className="text-sm text-gray-500">
                              A${item?.cost?.product_sale_price}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center">
                        <p>No items in the cart.</p>
                      </div>
                    )}
                    {/* Promo Code Input */}
                    {/* <div className="mb-6">
                <div className="flex">
                  <input
                    id="promo-code"
                    type="text"
                    placeholder="Enter your code"
                    className="input input-bordered w-full mr-2"
                  />
                  <button className="btn text-black bg-[#D0D0D0]">Apply</button>
                </div>
              </div> */}

                    {/* Pricing Information */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>A${totalEstimatedPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                          {totalChargeFromShipping
                            ? `A$${totalChargeFromShipping.toFixed(2)}`
                            : "Enter shipping address"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          Estimated Tax
                          <div className="tooltip" data-tip="hello">
                            <FaQuestionCircle></FaQuestionCircle>
                          </div>
                        </span>
                        <span>A${tax}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Left Column for Forms */}
            <div className="col-span-1 lg:col-span-5 bg-[#FFFAEE] rounded-lg shadow-lg p-3 pt-10 md:pt-10 md:pr-10 md:pb-0">
              <div className="md:w-2/3 ml-auto">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                  Contact
                </h2>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered border-2 focus:outline-none w-full text-sm"
                  value={formDataemail}
                  onChange={handleEmailChange}
                />

                <h2 className="text-2xl font-semibold mb-4 mt-2 text-gray-700">
                  Shipping Address
                </h2>
                <ShippingAddress
                  objectOnlyData={objectOnlyData ? objectOnlyData : []}
                  onTotalChargeChange={handleTotalCharge}
                />

                <div className="container mx-auto mt-2">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    Payment
                  </h2>
                  <p className="text-gray-500 mb-4 text-xs">
                    All transactions are secure and encrypted
                  </p>

                  <div className="bg-white ">
                    <div className="form-control">
                      <label
                        className={`label p-4 cursor-pointer flex justify-between items-center mb-2 transition-all duration-300 ${paymentMethod === "paypal"
                          ? "paymentMethodselected"
                          : ""
                          }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            className="radio checked:bg-blue-500"
                            checked={paymentMethod === "paypal"}
                            onChange={() => setPaymentMethod("paypal")}
                          />
                          <span className="label-text ml-2">PayPal</span>
                        </div>
                        <img
                          src={bPaypal}
                          alt="PayPal"
                          className="w-[56px] h-[22px]"
                        />
                      </label>
                      {paymentMethod === "paypal" && (
                        <p className="text-xs p-1 text-gray-500 mt-1">
                          After clicking "Pay with PayPal", you will be
                          redirected to PayPal to complete your purchase
                          securely.
                        </p>
                      )}
                    </div>

                    <div className="form-control">
                      <label
                        className={`label p-4 cursor-pointer flex justify-between items-center transition-all duration-300 ${paymentMethod === "card"
                          ? "paymentMethodselected"
                          : ""
                          }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            className="radio checked:bg-blue-500"
                            checked={paymentMethod === "card"}
                            onChange={() => {
                              setPaymentMethod("card");
                              getToken();
                            }}
                          />
                          <span className="label-text ml-2">
                            Credit/Debit Card
                          </span>
                        </div>
                        <div className="flex ">
                          <div className="ml-4 h5pc-card-paid-icon-scale h5pc-card-paid-list-visa-actived"></div>
                          <div className="ml-4 h5pc-card-paid-icon-scale h5pc-card-paid-list-mastercard-actived"></div>
                          <div className="ml-4 h5pc-card-paid-icon-scale h5pc-card-paid-list-jcb-actived"></div>
                          <div className="ml-4 h5pc-card-paid-icon-scale h5pc-card-paid-list-amex-actived"></div>
                        </div>
                      </label>
                      {paymentMethod === "card" && (
                        <>
                          <div id="llpay-card-element"></div>
                          <p className="text-xs p-1 text-gray-500 mt-1">
                            Choose to pay with your credit or debit card.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleForm}
                    disabled={isBtnLoading}
                    className="btn btn-primary w-full mt-4 mb-2 text-white"
                  >
                    {isBtnLoading ? "Loading..." : "Continue to Shipping"}
                  </button>

                  <ul className="p-3 flex flex-wrap">
                    <li>
                      <Link to="/ReturnPolicy" className="underline text-xs">
                        Refund policy
                      </Link>
                    </li>
                    <li className=" ml-3 ">
                      <Link to="/ShippingPolicy" className="underline text-xs">
                        Shipping and Delivery
                      </Link>
                    </li>
                    <li className=" ml-3 ">
                      <Link to="/Privacypolicy" className="underline text-xs">
                        Privacy policy
                      </Link>
                    </li>
                    <li className=" ml-3 ">
                      <Link to="/TermsOfService" className="underline text-xs">
                        Terms of service
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Right Column for Order Summary */}
            <div className="col-span-1 lg:col-span-4 bg-white p-6 rounded-lg shadow-lg md:w-full md:pl-10 pt-10 md:pb-0">
              <div className="md:w-3/5">
                {objectOnlyData && objectOnlyData.length > 0 ? (
                  objectOnlyData.map((item) => (
                    <div key={item?.product?.p_id} className="flex mb-6">
                      <img
                        src={ImgBaseUrl(item?.product?.p_pic)}
                        alt="Product"
                        className="object-contain rounded w-20 h-20  mr-4"
                      />
                      <div>
                        <h4 className="text-lg font-medium">
                          {item?.product?.p_name.slice(0, 30)}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Glacier / {item?.dimension} / {item?.category}
                        </p>
                        <p className="text-sm text-gray-500">
                          A${item?.cost?.product_sale_price}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <p>No items in the cart.</p>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>A${totalEstimatedPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {totalChargeFromShipping
                        ? `A$${totalChargeFromShipping.toFixed(2)}`
                        : "Enter shipping address"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center cursor-pointer">
                      Estimated Tax
                      <div className="tooltip" data-tip="Price already includes tax">
                        <FaQuestionCircle className="ml-1"></FaQuestionCircle>
                      </div>
                    </span>
                    <span>A${tax}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Random number generator */}
        <UserInitialization />
      </section>
    </>
  );
};

export default CheckoutInfo;
