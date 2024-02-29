import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ShippingAddress from "./ShippingAddress";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useFetchOrder, useFetchClear } from "../../Hooks/api/useOrders";
import {
  useGetLianlianToken,
  useLianlianPay,
} from "../../Hooks/api/useLianlianPayment";

const CardPayment = ({ info, amount, onTotalChargeChange }) => {
  const userId = localStorage.getItem("usercode") || null;
  const [isLoading1, setIsLoading1] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [totalChargeFromShipping, setTotalChargeFromShipping] = useState(0);
  const [formDataFromShipping1, setFormDataFromShipping1] = useState(null);

  const { mutate: getLianlianTokenMutate } = useGetLianlianToken();
  const { mutate: lianlianPay, isLoading: isPaying } = useLianlianPay();
  const { mutate: fetchOrder } = useFetchOrder();
  const { mutate: fetchClear } = useFetchClear();

  const handleTotalCharge1 = (totalCharge, formData) => {
    setFormDataFromShipping1(formData);
    // 计算原价减去77%的折扣后的费用
    const discountRate = 0.77; // 77%的折扣
    const discountedTotalCharge = totalCharge * (1 - discountRate);
    // info.amount = discountedTotalCharge;
    // 更新总费用为折扣后的费用
    setTotalChargeFromShipping(discountedTotalCharge);

    if (onTotalChargeChange) {
      onTotalChargeChange(discountedTotalCharge);
    }
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
            reject(new Error("Validation failed"));
          }
        })
        .catch(reject);
    });
  }

  const mountCardElement = (token) => {
    const elements = LLP.elements(); // LLP should be defined globally or imported

    const card = elements.create("card", {
      token: token,
      style: "", // Define your styles here
      apiType: "", // Set the API type if needed
      merchantUrl: "https://www.theoutmaker.com.au",
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

  useEffect(() => {
    getToken();
  }, []);

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
    console.log(order_no, paymentAmount);

    // Construct your order data
    const {
      country,
      state,
      city,
      firstName,
      lastName,
      streetAddress,
      address,
      phone,
      email,
      zip,
    } = formDataFromShipping1;
    const orderData = {
      uuid: order_no,
      receiver_name: firstName + lastName,
      receiver_email: email,
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
    setIsLoading1(false);
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

  const handlePayNow = (card_token, formData) => {
    const productList = info.map((item) => {
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
      city: formData.city,
      country: "AU",
      firstName: formData.firstName,
      lastName: formData.lastName,
      line1: formData.address,
      state: formData.state,
      postal_code: formData.zip,
      shipping_name: formData.firstName + " " + formData.lastName,
      shipping_phone: formData.phone,
      order_amount: totalChargeFromShipping.toFixed(2),
      // order_amount: "1",
      order_currency_code: "AUD",
      productList: productList,
      cycle: "48h",
      card_token,
      email: formData.email,
    };

    console.log(orderData);
    // pay(orderData);

    setIsLoading1(true); // Set loading state

    lianlianPay(orderData, {
      onSuccess: handlePaymentSuccess,
      onError: (error) => {
        // Handle the error scenario
        console.error("Error in payment process:", error);
        setErrorMsg(error.message);
        setIsDialogOpen(true);
        setIsLoading1(false); // Unset loading state
      },
    });
  };

  const getFormData = async () => {
    try {
      setIsLoading1(true);
      const formData = formDataFromShipping1;

      if (!formData) {
        console.error("formData is null");
        return;
      }

      // 异步操作获取card_token
      const cardToken = await getCardTokenAsync();

      if (!cardToken) {
        console.error("cardToken is null");
        return;
      }

      // 在这里调用handlePayNow并传递cardToken和formData
      handlePayNow(cardToken, formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        {isDialogOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Payment Error</h3>
              <p className="py-4">
                Sorry, payment failed. Please try again.
                <br />[{errorMsg && errorMsg?.pay_response?.return_message}]
              </p>

              <div className="modal-action">
                <label
                  htmlFor="my-modal"
                  className="btn"
                  onClick={() => {
                    window.location.href = `http://theoutmaker.com.au/checkout-info/status/${errorMsg?.merchant_transaction_id}`;
                    setIsDialogOpen(false);
                  }}
                >
                  Got it
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="border-2 p-2">
          <div className="form-row">
            <div id="llpay-card-element"></div>
          </div>
          <form id="merchant-payment-form">
            <div>
              <h3 className="text-2xl font-semibold mb-4 mt-14">
                Shipping Address
              </h3>
              <ShippingAddress
                objectOnlyData={info}
                onTotalChargeChange={handleTotalCharge1}
              />
            </div>
          </form>
        </div>

        <div className="p-5 flex justify-end">
          <button
            className="btn btn-primary normal-case"
            disabled={isLoading1}
            onClick={() => getFormData()}
            id="merchant-button"
          >
            {isLoading1 ? "Loading..." : "Continue to Shipping"}
          </button>
        </div>

        {/* to generate a rnadom number when user will land on this page */}
        <UserInitialization />
      </div>
    </>
  );
};

export default CardPayment;
