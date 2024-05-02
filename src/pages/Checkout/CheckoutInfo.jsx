import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import { CartContext } from "../../Provider/CartProvider";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import bPaypal from "../../assets/icons/bPaypal.svg";
import zip from "../../assets/icons/ZIP.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import logo from "../../assets/icons/logo-white.png";
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

//oceanpayment
import OceanPayment from "../../Hooks/useOceanpayment";
import { useCreateOceanpayment } from "../../Hooks/api/useOceanpayment";
import FormDataAfter from "../../components/Oceanpayment/formDataAfter";


import { v4 as uuidv4 } from "uuid";
import afterPay from "../../assets/Afterpay.png";
import { applyDiscount } from "../../Hooks/api/applyDiscount";
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
    window.oceanWin = { userId: 0, order_no: "" };
  }, []);
  const [discount, setDiscount] = useState(0);
  const applyDiscountMutation = applyDiscount(discount);
  const applyDiscountHandle = () => {
    applyDiscountMutation.mutate();
  }
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    if (applyDiscountMutation.isSuccess && applyDiscountMutation.data.msg === "Ok") {
      setConfirm(true);
    }
  }, [applyDiscountMutation.isSuccess])
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
  //oceanpayment
  const { mutate: useFetchOceanCreate } = useCreateOceanpayment();
  const [afterpay, setAfterpay] = useState({ pay_url: "", data: {} });
  const [payzippay, setPayzippay] = useState({ pay_url: "", data: {} });

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
    (total, item) => total + (item?.cost?.total_cost * (item?.qunatity || 0) * (confirm ? 90 : 100)/100),
    0
  );

  // Calculate the shipping cost
  const shippingCost = objectOnlyData?.reduce(
    (total, item) => total + (item?.cost?.shipping_cost * item?.quantity || 0),
    0
  );
  //ocean回调
  window.oceanpaymentCallBack = function (res) {
    if (res.msg) {
      setIsBtnLoading(false);
    } else {
      //3d直接跳走
      if (res.indexOf("pay_url") > -1) {
        const regex = /<pay_url>(.*?)<\/pay_url>/;
        const match = res.match(regex);
        if (match) {
          //先清购物车,再跳转

          fetchClear(window.oceanWin, {
            onSuccess: () => {
              setIsBtnLoading(false);
              window.location.href = match[1];
            },
            onError: (error) => {
              setIsBtnLoading(false);
              window.location.href = match[1];
            },
          });
        } else {
          setIsBtnLoading(false);
        }
        //支付成功
      } else {
        //会异步通知
        window.location.href =
          "http://theoutmaker.com.au/pay/statusOrder/" +
          window.oceanWin.order_no;
      }
      console.log("调用成功", res);
    }
  };

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
      setIsBtnLoading(false);
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
      useFetchOceanCreate(
        {
          user_code: userId,
          send_type: "paypal",
          billing_country: "AU",
          billing_state: state,
          billing_city: city,
          billing_address: address,
          billing_zip: zip,
          billing_firstName: firstName,
          billing_lastName: lastName,
          billing_email: formDataemail,
          billing_phone: phone,
          billing_tip: totalChargeFromShipping.toFixed(2),
          baseUrl: window.location.origin,
          discount: confirm ? discount : ''
        },
        {
          onSuccess: (result) => {
            if (result.code == 1) {
              fetchClear(
                { userId: userId, order_no: result.order_number },
                {
                  onSuccess: () => {
                    // Handle the success scenario for order clear
                    //toast.success("Order cleared successfully");
                    // Additional success logic here...
                    if (result.sign.link) {
                      window.location.href = result.sign.link;
                    } else {
                      toast.error("Error order: " + result.msg);
                    }
                    setIsBtnLoading(false);
                  },
                  onError: (error) => {
                    // Handle the error scenario for order clear
                //    toast.error("Error clearing order: " + error.message);
                    setIsBtnLoading(false);
                  },
                }
              );
            } else {
              setIsBtnLoading(false);
              toast.error(result.msg);
            }
          },
          onError: (error) => {
            // Handle the error scenario
            console.error("Error in ocean process:", error);
            toast.error("Error in ocean process:" + error.message);
            setIsBtnLoading(false);
          },
        }
      );


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
      const orderData = {
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
    } else if (paymentMethod == "ocean") {
      useFetchOceanCreate(
        {
          user_code: userId,
          send_type: "ocean",
          billing_country: "AU",
          billing_state: state,
          billing_city: city,
          billing_address: address,
          billing_zip: zip,
          billing_firstName: firstName,
          billing_lastName: lastName,
          billing_email: formDataemail,
          billing_phone: phone,
          billing_tip: totalChargeFromShipping.toFixed(2),
          baseUrl: window.location.origin,
          discount: confirm ? discount : '',
        },
        {
          onSuccess: (result) => {
            if (result.code == 1) {
              window.oceanWin.userId = userId;
              window.oceanWin.order_no = result.sign.order_number;
              Oceanpayment.checkout(result.sign);
            } else {
              setIsBtnLoading(false);
              toast.error("Error in ocean process:" + result.msg);
            }
          },
          onError: (error) => {
            // Handle the error scenario
            console.error("Error in ocean process:", error);
            toast.error("Error in ocean process:" + error.message);
            setIsBtnLoading(false);
          },
        }
      );
    } else if (paymentMethod == "afterpay") {
      useFetchOceanCreate(
        {
          user_code: userId,
          send_type: "afterpay",
          billing_country: "AU",
          billing_state: state,
          billing_city: city,
          billing_address: address,
          billing_zip: zip,
          billing_firstName: firstName,
          billing_lastName: lastName,
          billing_email: formDataemail,
          billing_phone: phone,
          billing_tip: totalChargeFromShipping.toFixed(2),
          baseUrl: window.location.origin,
          discount: confirm ? discount : ''
        },
        {
          onSuccess: (result) => {
            if (result.code == 1) {
              setAfterpay(result.sign);
              fetchClear(
                { userId: userId, order_no: result.order_number },
                {
                  onSuccess: () => {
                    // Handle the success scenario for order clear
                    //toast.success("Order cleared successfully");
                    // Additional success logic here...
                    setIsBtnLoading(false);
                  },
                  onError: (error) => {
                    // Handle the error scenario for order clear
                   // toast.error("Error clearing order: " + error.message);
                    setIsBtnLoading(false);
                  },
                }
              );
            } else {
              setIsBtnLoading(false);
              toast.error(result.msg);
            }
          },
          onError: (error) => {
            // Handle the error scenario
            console.error("Error in ocean process:", error);
            toast.error("Error in ocean process:" + error.message);
            setIsBtnLoading(false);
          },
        }
      );
    } else if (paymentMethod == "payZip") {
      useFetchOceanCreate(
        {
          user_code: userId,
          send_type: "zip",
          billing_country: "AU",
          billing_state: state,
          billing_city: city,
          billing_address: address,
          billing_zip: zip,
          billing_firstName: firstName,
          billing_lastName: lastName,
          billing_email: formDataemail,
          billing_phone: phone,
          billing_tip: totalChargeFromShipping.toFixed(2),
          baseUrl: window.location.origin,
          discount: confirm ? discount : '',
        },
        {
          onSuccess: (result) => {
            if (result.code == 1) {
              setPayzippay(result.sign);
              fetchClear(
                { userId: userId, order_no: result.order_number },
                {
                  onSuccess: () => {
                    // Handle the success scenario for order clear
                    //toast.success("Order cleared successfully");
                    // Additional success logic here...
                    setIsBtnLoading(false);
                  },
                  onError: (error) => {
                    // Handle the error scenario for order clear
                    toast.error("Error clearing order: " + error.message);
                    setIsBtnLoading(false);
                  },
                }
              );
            } else {
              setIsBtnLoading(false);
              toast.error(result.msg);
            }
          },
          onError: (error) => {
            // Handle the error scenario
            console.error("Error in ocean process:", error);
            toast.error("Error in ocean process:" + error.message);
            setIsBtnLoading(false);
          },
        }
      );
    }
  };

  const handlePaymentSuccess = async (paymentData) => {
    setIsBtnLoading(false);
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
      order_no: order_no,
      receiver_name: firstName + lastName,
      receiver_email: formDataemail,
      phone,
      address,
      state,
      city,
      zip,
      country,
      paypal_order_no: "",
      payment_method: "2",
      discount: confirm ? discount : '',
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
                //toast.success("Order cleared successfully");
                // Additional success logic here...
                setIsBtnLoading(false);
              },
              onError: (error) => {
                // Handle the error scenario for order clear
                //  toast.error("Error clearing order: " + error.message);
                setIsBtnLoading(false);
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
        <div className="bg-primary py-6">
          <div className="lg:max-w-[1600px] mx-auto flex justify-between">
            <div className="flex-1 flex justify-center">
              <Link to={"/"}>
                <img
                  src={logo}
                  alt="Logo"
                  className="object-contain z-50 w-32 md:w-32 md:translate-x-28"
                />
              </Link>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <FaShoppingBag
                onClick={() => setIsSidebarCartOpen(true)}
                size="1.5em"
                color="white"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
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

        <div className="w-full bg-white lg:max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-9 ">
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
                <div className={isOpen ? "pb-4 bg-white" : "hidden"}>
                  <div className="md:w-96 col-span-1 lg:col-span-4 bg-[#f8f8f8] p-6 rounded-lg  pt-10 ">
                    {objectOnlyData && objectOnlyData.length > 0 ? (
                      <>
                        {objectOnlyData.map((item) => (
                          <div
                            key={item?.product?.p_id}
                            className="flex mb-6 w-full relative"
                          >
                            <span className="w-6 h-6 leading-6 text-center rounded-full bg-gray-300 absolute z-10 -left-3 -top-3 ">
                              {item.qunatity}
                            </span>
                            <img
                              src={ImgBaseUrl(item?.product?.p_pic)}
                              alt="Product"
                              className="object-contain rounded w-20 h-20  mr-4 bg-white"
                            />
                            <div className="flex-1">
                              <h4 className="text-lg font-medium">
                                {item?.product?.p_name.slice(0, 30)}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Glacier / {item?.dimension} / {item?.category}
                              </p>
                            </div>
                            <div className="w-16 text-left flex flex-col justify-center items-center">
                              <span className="text-sm text-gray-500">
                                A${item?.cost?.product_sale_price * item.qunatity}
                              </span>
                            </div>
                          </div>
                        ))}
                        <div>
                          {/* {JSON.stringify(applyDiscountMutation)} */}
                          <div className="flex justify-between gap-4">
                            <input type="text" className={`input flex-1 ${applyDiscountMutation?.data?.msg === "Discount coupons do not exist" ? "input-error" : ""}`} placeholder="Discount Code" onChange={e => {
                              setConfirm(false);
                              setDiscount(e.target.value);
                            }} />
                            <button disabled={applyDiscountMutation.isLoading || !discount} className={`btn btn-primary ${applyDiscountMutation.isLoading ? "loading" : ""} `} onClick={applyDiscountHandle}>Apply</button>
                          </div>
                        </div>
                        {applyDiscountMutation?.data?.msg === "Discount coupons do not exist" ? <div className=" text-red-400 text-sm mt-2">Enter a valid discount code</div> : null}
                        {applyDiscountMutation?.data?.msg === "Ok" ? <div className=" text-green-600 text-sm mt-2">Valid Success</div> : null}
                      </>
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
                    <div className="space-y-4 mb-6 mt-4">
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
                          <div
                            className="tooltip"
                            data-tip="Price already includes tax"
                          >
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
            <div className="col-span-1 lg:col-span-5  p-3 pt-10 md:pt-10 md:pr-10 md:pb-0  md:overflow-auto">
              <div className="md:w-2/3 ml-auto">
                <h2 className="text-2xl font-medium mb-4 text-gray-700">
                  Contact
                </h2>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered focus:outline-none w-full text-sm"
                  value={formDataemail}
                  onChange={handleEmailChange}
                />

                <h2 className="text-2xl font-medium mb-4 mt-2 text-gray-700">
                  Shipping Address
                </h2>
                <ShippingAddress
                  objectOnlyData={objectOnlyData ? objectOnlyData : []}
                  onTotalChargeChange={handleTotalCharge}
                />

                <div className="container mx-auto mt-2">
                  <h2 className="text-2xl font-medium mb-4 text-gray-700">
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

                    {/* <div className="form-control">
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
                    </div> */}
                    <div className="form-control">
                      <label
                        className={`label p-4 cursor-pointer flex justify-between items-center mb-2 transition-all duration-300 ${paymentMethod === "afterpay"
                          ? "paymentMethodselected"
                          : ""
                          }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            className="radio checked:bg-blue-500"
                            checked={paymentMethod === "afterpay"}
                            onChange={() => setPaymentMethod("afterpay")}
                          />
                          <span className="label-text ml-2">Afterpay</span>
                        </div>
                        <img src={afterPay} alt="" className="w-auto h-[26px]" />
                        {/* <svg
                          role="img"
                          className="w-[68px] h-[24px]"
                          aria-hidden="true"
                          width="100%"
                          height="100%"
                          viewBox="0 0 108 20"
                        >
                          <path d="M8.724 9.787c0-1.798-1.338-3.061-2.982-3.061-1.644 0-2.982 1.285-2.982 3.061 0 1.755 1.338 3.06 2.982 3.06 1.646 0 2.982-1.262 2.982-3.06zm.024 5.35v-1.391c-.811.963-2.019 1.561-3.464 1.561C2.28 15.307 0 12.953 0 9.787c0-3.146 2.367-5.542 5.351-5.542 1.404 0 2.587.6 3.398 1.54V4.437h2.697v10.7H8.748zM24.544 12.761c-.944 0-1.206-.342-1.206-1.24V6.77h1.733V4.436h-1.733v-2.61h-2.764v2.61h-3.56v-.65c0-.9.352-1.243 1.317-1.243h.606V.468h-1.33c-2.28 0-3.354.728-3.354 2.953v1.014h-1.535V6.77h1.535v8.366h2.764V6.77h3.56v5.243c0 2.183.854 3.125 3.09 3.125h1.426v-2.376h-.55zM34.455 8.823c-.197-1.39-1.36-2.225-2.719-2.225-1.36 0-2.478.813-2.762 2.225h5.48zm-5.504 1.67c.198 1.583 1.36 2.483 2.829 2.483 1.162 0 2.062-.536 2.587-1.392h2.83c-.659 2.268-2.742 3.723-5.483 3.723-3.31 0-5.634-2.267-5.634-5.499 0-3.231 2.456-5.564 5.702-5.564 3.267 0 5.634 2.354 5.634 5.564 0 .236-.021.47-.065.685h-8.4zM54.987 9.787c0-1.734-1.338-3.061-2.982-3.061-1.644 0-2.982 1.285-2.982 3.061 0 1.755 1.338 3.06 2.982 3.06 1.644 0 2.982-1.326 2.982-3.06zm-8.684-5.35H49v1.391c.81-.985 2.016-1.583 3.464-1.583 2.96 0 5.283 2.376 5.283 5.52 0 3.147-2.367 5.544-5.349 5.544-1.382 0-2.522-.536-3.31-1.434v5.665h-2.785V4.437zM67.467 9.787c0-1.798-1.336-3.061-2.982-3.061-1.644 0-2.982 1.285-2.982 3.061 0 1.755 1.338 3.06 2.982 3.06 1.646 0 2.982-1.262 2.982-3.06zm.024 5.35v-1.391c-.811.963-2.019 1.561-3.464 1.561-3.004 0-5.284-2.354-5.284-5.52 0-3.146 2.367-5.542 5.35-5.542 1.403 0 2.587.6 3.398 1.54V4.437h2.696v10.7h-2.696zM41.443 5.486s.686-1.24 2.367-1.24c.719 0 1.184.24 1.184.24v2.73s-1.014-.611-1.946-.488c-.932.123-1.521.958-1.518 2.076v6.335h-2.784v-10.7h2.697v1.047zM82.781 4.437l-6.808 15.069h-2.871l2.673-5.826-4.52-9.243h3.254l2.644 6.176 2.713-6.176h2.915zM104.514 4.194L97.764.393c-1.98-1.116-4.457.278-4.457 2.512v.39c0 .352.193.678.505.853l1.275.718c.374.212.84-.052.84-.473v-.97c0-.485.538-.789.968-.546l5.846 3.294c.43.242.43.848 0 1.09l-5.846 3.293c-.43.242-.967-.06-.967-.546v-.516c0-2.233-2.477-3.63-4.46-2.512l-6.75 3.802a2.866 2.866 0 000 5.024l6.75 3.801c1.981 1.116 4.46-.278 4.46-2.512v-.39a.983.983 0 00-.506-.853l-1.274-.72c-.374-.211-.841.053-.841.474v.97c0 .485-.538.788-.967.545l-5.847-3.293a.623.623 0 010-1.091l5.847-3.294c.43-.243.967.06.967.546v.516c0 2.233 2.476 3.63 4.457 2.512l6.75-3.802a2.864 2.864 0 000-5.02z"></path>
                        </svg> */}
                      </label>
                      {paymentMethod === "afterpay" && (
                        <>
                          <FormDataAfter
                            payUrl={afterpay.pay_url}
                            formData={afterpay.data}
                          ></FormDataAfter>
                          <p className="text-xs p-1 text-gray-500 mt-1">
                            Payment with AfterPay will be limited by 2000 AUD
                          </p>
                        </>
                      )}
                    </div>
                    <div className="form-control">
                      <label
                        className={`label p-4 cursor-pointer flex justify-between items-center mb-2 transition-all duration-300 ${paymentMethod === "payZip"
                          ? "paymentMethodselected"
                          : ""
                          }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            className="radio checked:bg-blue-500"
                            checked={paymentMethod === "payZip"}
                            onChange={() => setPaymentMethod("payZip")}
                          />
                          <span className="label-text ml-2">ZIP</span>
                        </div>
                        <img
                          src={zip}
                          alt="ZIP"
                          className="w-auto h-[26px]"
                        />
                      </label>
                      {paymentMethod === "payZip" && (
                        <>
                          <FormDataAfter
                            payUrl={payzippay.pay_url}
                            formData={payzippay.data}
                          ></FormDataAfter>
                          {/* <p className="text-xs p-1 text-gray-500 mt-1">
                            Payment with Zip will be limited by 2000 AUD
                          </p> */}
                        </>
                      )}
                    </div>
                    <div className="form-control">
                      <label
                        className={`label p-4 cursor-pointer flex justify-between items-center transition-all duration-300 ${paymentMethod === "ocean"
                          ? "paymentMethodselected"
                          : ""
                          }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            className="radio checked:bg-blue-500"
                            checked={paymentMethod === "ocean"}
                            onChange={() => {
                              setPaymentMethod("ocean");
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
                      {paymentMethod === "ocean" && (
                        <>
                          <div className="p-1 text-gray-500 mt-1 oceanpayment-element">
                            <OceanPayment></OceanPayment>
                          </div>
                          <div id="oceanpayment-element"></div>
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

                  <ul className="p-3 flex flex-wrap mb-16 md:mb-0">
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
            <div className="hidden md:block col-span-1 lg:col-span-4 bg-[#f8f8f8] p-6 rounded-lg  md:w-full md:pl-10 pt-10 md:pb-0">
              <div className="sticky top-6">
                {objectOnlyData && objectOnlyData.length > 0 ? (
                  <>
                    {
                      objectOnlyData.map((item) => (
                        <div
                          key={item?.product?.p_id}
                          className="flex mb-6 w-full relative"
                        >
                          <span className="w-6 h-6 leading-6 text-center rounded-full bg-gray-300 absolute z-10 -left-3 -top-3 ">
                            {item.qunatity}
                          </span>
                          <img
                            src={ImgBaseUrl(item?.product?.p_pic)}
                            alt="Product"
                            className="object-contain rounded w-20 h-20  mr-4 bg-white"
                          />
                          <div className="flex-1">
                            <h4 className="text-lg font-medium">
                              {item?.product?.p_name.slice(0, 30)}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Glacier / {item?.dimension} / {item?.category}
                            </p>
                          </div>
                          <div className="w-16 text-left flex flex-col justify-center items-center">
                            <span className="text-sm text-gray-500">
                              A${item?.cost?.product_sale_price * item.qunatity}
                            </span>
                          </div>
                        </div>
                      ))
                    }
                    <div>
                      {/* {JSON.stringify(applyDiscountMutation)} */}
                      <div className="flex justify-between gap-4">
                        <input type="text" className={`input flex-1 ${applyDiscountMutation?.data?.msg === "Discount coupons do not exist" ? "input-error" : ""}`} placeholder="Discount Code" onChange={e => {
                          setConfirm(false);
                          setDiscount(e.target.value);
                        }} />
                        <button disabled={applyDiscountMutation.isLoading || !discount} className={`btn btn-primary ${applyDiscountMutation.isLoading ? "loading" : ""} `} onClick={applyDiscountHandle}>Apply</button>
                      </div>
                    </div>
                    {applyDiscountMutation?.data?.msg === "Discount coupons do not exist" ? <div className=" text-red-400 text-sm mt-2">Enter a valid discount code</div> : null}
                    {applyDiscountMutation?.data?.msg === "Ok" ? <div className=" text-green-600 text-sm mt-2">Valid Success</div> : null}
                  </>
                ) : (
                  <div className="text-center">
                    <p>No items in the cart.</p>
                  </div>
                )}
                <div className="space-y-4 mb-6 mt-4">
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
                      <div
                        className="tooltip"
                        data-tip="Price already includes tax"
                      >
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

      </section>
    </>
  );
};

export default CheckoutInfo;
