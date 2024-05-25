import React, { useContext, useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";
import left from "../../assets/images/left-icon.png";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import CardPayment from "./CardPayment";
import { CartContext } from "../../Provider/CartProvider";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import bPaypal from "../../assets/icons/bPaypal.svg";
import visa from "../../assets/icons/visa.svg";
import JCB from "../../assets/icons/JCB.svg";
import express from "../../assets/icons/express.svg";
import mastercard from "../../assets/icons/mastercard.svg";
import ShippingAddress from "./ShippingAddress";
import { IoIosHelpCircleOutline } from "react-icons/io";

import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

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
  const [totalChargeFromShipping, setTotalChargeFromShipping] = useState(0);
  const [formDataFromShipping, setFormDataFromShipping] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem("usercode") || null;

  const handleTotalCharge = (totalCharge, formData) => {
    setFormDataFromShipping(formData);

    // 计算原价减去77%的折扣后的费用
    const discountRate = 0.77; // 77%的折扣
    const discountedTotalCharge = totalCharge * (1 - discountRate);
    console.log(`totalCharge：${totalCharge}`);
    console.log(`discountedTotalCharge：${discountedTotalCharge}`);
    // 更新总费用为折扣后的费用
    setTotalChargeFromShipping(discountedTotalCharge);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Calculate the tax price
  const tax = objectOnlyData?.reduce(
    (total, item) => total + (item?.cost?.tax || 0),
    0
  );

  // Calculate the total estimated price   Subtotal
  // const totalEstimatedPrice = objectOnlyData?.reduce(
  //   (total, item) => total + (item?.cost?.total_cost * item?.quantity || 0),
  //   0
  // );
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

  // to check which option is selected
  const [paypal, setPaypal] = useState(true);
  const [card, setCard] = useState(false);
  const [affirm, setAffirm] = useState(false);

  // to select shipping method
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  const [paypalOrderID, setPaypalOrderID] = useState("");

  // 记录商品到数据库
  const fetch_order_paypal = async (data) => {
    try {
      const response = await fetch(
        "https://admin.theoutmaker.com/api/shopping/cart/paypal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      if (result.code === 1) {
        const resdata = result.data;
        // 执行其他逻辑
      } else {
        toast.error(result.msg);
        console.error(result.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // 创建paypal订单
  const createOrder = async (data) => {
    try {
      const response = await fetch(
        "https://admin.theoutmaker.com/api/paypal/createOrder",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (result?.approvalUrl) {
        localStorage.setItem("OrderID", result?.order.id);
        return {
          approvalUrl: result?.approvalUrl,
          paypalOrderID: result?.order.id,
        };
      } else {
        toast.error(result);
        return null;
      }
    } catch (error) {
      console.error("error", error);
      toast.error(error.message);
      return null;
    }
  };

  const fetchOrder = async (data, order_no) => {
    try {
      const response = await fetch(
        `https://theoutmaker.com/public/api/user/order/draft/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      console.log("user/order/draft", result);
      if (result.Success == "1") {
        await fetchClear(order_no);
      } else {
        toast.error(result.Error);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const fetchClear = async (order_no) => {
    try {
      const response = await fetch(
        `https://theoutmaker.com/public/api/user/order/payment/clear/${userId}/${order_no}`,
        {
          method: "POST",
        }
      );
      const result = await response.json();

      if (result.Success === "1") {
        console.log("clear", result);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

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

    // Australia NSW THE UNIVERSITY OF SYDNEY  气 无 123 Main Staa 123 123123 977429272@qq.com -1
    const idAndNameArray = objectOnlyData.map((item) => {
      return {
        id: item.product.p_id,
        name: item.product.p_name,
      };
    });

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

    const result = await createOrder(orderData);

    if (result) {
      const uuid = uuidv4();
      const { approvalUrl, paypalOrderID } = result; // approvalUrl支付跳转链接, paypalOrderID官方订单号

      console.log(approvalUrl, paypalOrderID, uuid);

      const data_fetchOrder = {
        uuid,
        receiver_name: firstName + lastName,
        receiver_email: email,
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

      await fetchOrder(data_fetchOrder, uuid);

      await fetch_order_paypal({
        userinfo: email,
        product: JSON.stringify(idAndNameArray),
        address: address,
        amount: amount,
        paypal_no: paypalOrderID,
        uuid,
      });

      window.location.href = approvalUrl;
    }
  };

  // Handle selection
  const handleMethodSelection = (name) => {
    if (name === "paypal") {
      setPaypal(!paypal);
      setCard(false);
      setAffirm(false);
    } else if (name === "card") {
      setPaypal(false);
      setCard(!card);
      setAffirm(false);
    } else {
      setPaypal(false);
      setCard(false);
      setAffirm(!affirm);
    }
  };
  // Handle selection
  const handleShippinMethodSelection = (name) => {
    if (name === "first") {
      setFirst(!first);
      setSecond(false);
    } else {
      setFirst(false);
      setSecond(!second);
    }
  };

  // handle increase the quantity
  const handleIncreaseQuantity = (id) => {
    fetch(
      `https://theoutmaker.com/public/api/user/product/add_to/cart/${userId}/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setToggle(!toggle);
      });
    if (isIdTrue(id)) {
      // Update the quantity in the objectOnlyData array
      const updatedData = objectOnlyData.map((item) => {
        if (item.product.p_id === id) {
          return {
            ...item,
            qunatity: (item.qunatity || 0) + 1, // Increase the quantity by 1
          };
        }
        return item;
      });

      // Update the objectOnlyData state
      setProductQuantity((prev) => prev + 1);
      updateObjectOnlyData(updatedData);
    }
  };

  // handle decrease the quantity
  const handleDecreaseQuantity = (id) => {
    fetch(
      `https://theoutmaker.com/public/api/user/product/delete_from/cart/${userId}/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setToggle(!toggle);
      });

    if (isIdTrue(id)) {
      // Find the item to update or remove
      const updatedData = objectOnlyData.map((item) => {
        if (item.product.p_id === id) {
          if (item.qunatity > 1) {
            // Decrease the quantity by 1 (if it's greater than 1)
            return {
              ...item,
              qunatity: item.qunatity - 1,
            };
          } else {
            // Remove the item if the quantity is 1
            return null;
          }
        }
        return item;
      });

      // Remove null entries (items with quantity 0)
      const updatedDataWithoutNull = updatedData.filter(
        (item) => item !== null
      );

      // Update the objectOnlyData state
      setProductQuantity((prev) => prev - 1);
      updateObjectOnlyData(updatedDataWithoutNull);
    }
  };

  const handleDiscountedTotalCharge = (discountedTotalCharge) => {
    setTotalChargeFromShipping(discountedTotalCharge);
    // 在这里处理discountedTotalCharge的逻辑
  };

  return (
    <section className="container mx-auto px-2 md:px-10 py-10 md:py-20 text-primary">
      <>
        <div className="flex flex-col md:flex-row gap-12">
          {/* deatails part */}
          <div className="order-2 md:order-1 shadow-xl px-5 py-8 flex-1">
            {/* select payment method */}
            <div className={`overflow-x-auto mb-10 rounded-md mt-2`}>
              {/* <div className="divider">or</div> */}
              <div className="border-2 border-primary w-full">
                {/* row 1 */}
                <div className="w-full border-b-2 p-5 border-primary flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleMethodSelection("paypal")}
                    onClick={(e) =>
                      setPaypal(e.target.value === "on" ? true : false)
                    }
                    checked={paypal}
                    name="paypal"
                    className="checkbox checkbox-primary"
                  />
                  <p style={{ marginLeft: "10px" }}>Paypal Payment</p>
                  <div className="flex items-center ml-auto">
                    <img
                      src={bPaypal}
                      style={{ width: "85px", height: "20px" }}
                      alt=""
                    />
                  </div>
                </div>

                {/* row 2 */}
                <div className="w-full p-5 border-primary flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleMethodSelection("card")}
                    onClick={(e) =>
                      setCard(e.target.value === "on" ? true : false)
                    }
                    checked={card}
                    name="card"
                    className="checkbox checkbox-primary"
                  />
                  <p style={{ marginLeft: "10px" }}>Card Payment</p>
                  <div className="flex items-center ml-auto">
                    <img src={visa} alt="" className="w-[40px]" />
                    <img src={mastercard} alt="" className="w-[40px]" />
                    <img src={express} alt="" className="w-[40px]" />
                    <img src={JCB} alt="" className="w-[40px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* paypal form */}
            {paypal && !card && !affirm && (
              <form onSubmit={handleForm} className="text-primary">
                {/* for shipping address */}
                <div>
                  <h3 className="text-2xl font-medium mb-4 mt-14">
                    Shipping Address
                  </h3>
                  <div className="grid">
                    <ShippingAddress
                      objectOnlyData={objectOnlyData ? objectOnlyData : []}
                      onTotalChargeChange={handleTotalCharge}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-0 mt-14">
                  <Link to="/checkout">
                    <button className="flex items-center gap-4">
                      <img src={left} alt="" className="w-[10px]" />
                      <span>Return to cart</span>
                    </button>
                  </Link>
                  <button className="btn btn-primary normal-case">
                    Continue to Shipping
                  </button>
                </div>
                <ul className="p-3 flex flex-wrap">
                  <li>
                    <Link
                      to="/ReturnPolicy"
                      style={{ textDecoration: "underline" }}
                    >
                      Refund policy
                    </Link>
                  </li>
                  <li className=" ml-3 ">
                    <Link
                      to="/ShippingPolicy"
                      style={{ textDecoration: "underline" }}
                    >
                      Shipping and Delivery
                    </Link>
                  </li>
                  <li className=" ml-3 ">
                    <Link
                      to="/Privacypolicy"
                      style={{ textDecoration: "underline" }}
                    >
                      Privacy policy
                    </Link>
                  </li>
                  <li className=" ml-3 ">
                    <Link
                      to="/TermsOfService"
                      style={{ textDecoration: "underline" }}
                    >
                      Terms of service
                    </Link>
                  </li>
                </ul>
              </form>
            )}
            {!paypal && card && !affirm && (
              <CardPayment
                info={objectOnlyData ? objectOnlyData : []}
                amount={amount}
                onTotalChargeChange={handleDiscountedTotalCharge}
              />
            )}
            {!paypal && !card && affirm && <CardPayment />}
          </div>

          {/* payment info  */}
          <div className="order-1 md:order-2 px-5 py-16 shadow-xl rounded-md w-full lg:w-[550px]">
            {/* product card */}
            <div>
              {objectOnlyData && objectOnlyData.length > 0 ? (
                objectOnlyData.map((item) => (
                  <div
                    key={item?.product?.p_id}
                    className="flex flex-col md:flex-row lg:items-center justify-between mb-3"
                  >
                    <div className="flex flex-col md:flex-row lg:items-center gap-4">
                      <figure className="w-full md:w-[100px] h-[100px]">
                        <img
                          src={ImgBaseUrl(item?.product?.p_pic)}
                          alt=""
                          className="object-contain w-full h-full rounded"
                        />
                      </figure>
                      <div className="space-y-0 lg:space-y-2">
                        <p>{item?.product?.p_name.slice(0, 30)}</p>
                        <p className="lg:w-5/6">
                          Glacier / {item?.dimension} / {item?.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end items-center">
                      <p className="text-end lg:text-start mr-1">
                        A${item?.cost?.product_sale_price}
                      </p>
                      <div className="flex items-center gap-6 border-2 border-primary p-1 rounded-full cursor-pointer">
                        <p
                          onClick={() =>
                            handleDecreaseQuantity(item?.product?.p_id)
                          }
                        >
                          <FaMinus />
                        </p>
                        <span>{item?.qunatity}</span>
                        <p
                          onClick={() =>
                            handleIncreaseQuantity(item?.product?.p_id)
                          }
                          className="cursor-pointer"
                        >
                          <FaPlus />
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p>No items in the cart.</p>
                </div>
              )}
            </div>
            {/* divider */}
            <div className="h-[2px] bg-primary mb-7"></div>
            {/* amount */}
            <div>
              <div className="flex lg:items-center justify-between mb-2">
                <p>Subtotal</p>
                <p>A${totalEstimatedPrice}</p>
              </div>
              <div className="flex lg:items-center justify-between mb-2">
                <div className="flex items-center">
                  <p>Shipping</p>
                  <IoIosHelpCircleOutline
                    onClick={toggleModal}
                    className="cursor-pointer"
                  />
                </div>

                <p className="">
                  {totalChargeFromShipping
                    ? `A$${totalChargeFromShipping.toFixed(2)}`
                    : "Enter shipping address"}
                </p>
                {isModalOpen && (
                  <div className="modal modal-open">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Shipping Policy</h3>
                      <p className="py-4">
                        All orders are typically processed within 1-2 business
                        days...
                      </p>{" "}
                      {/* Your shipping policy details here */}
                      <div className="modal-action">
                        <label
                          htmlFor="my-modal"
                          className="btn "
                          onClick={toggleModal}
                        >
                          Close
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex lg:items-center justify-between mb-2">
                <div className="flex items-center">
                  <p>Estimated Tax</p>
                  <div className="ml-2 relative group">
                    <span className="cursor-pointer text-sm">&#x3F;</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-600 text-white text-xs rounded py-1 px-3 min-w-max whitespace-nowrap">
                      Price already includes tax
                    </div>
                  </div>
                </div>
                <p>A${tax}</p>
              </div>
            </div>
            {/* divider */}
            <div className="h-[2px] bg-primary mb-7"></div>
            {/* total */}
            <div className="flex lg:items-center justify-between mb-2 text-xl font-bold">
              <p>Total Cost</p>
              <p>A${amount}</p>
            </div>
          </div>
        </div>
      </>

      {/* to generate a rnadom number when user will land on this page */}
      
    </section>
  );
};

export default CheckoutInfo;
