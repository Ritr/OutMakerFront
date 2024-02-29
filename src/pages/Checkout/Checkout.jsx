import React, { useContext, useEffect, useState } from "react";
import image from "../../assets/care-guide/image-1.png";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import { CartContext } from "../../Provider/CartProvider";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const {
    cartData,
    convertedData,
    objectOnlyData,
    setProductQuantity,
    isIdTrue,
    setToggle,
    toggle,
    setConvertedData,
    updateObjectOnlyData,
    fetchCartData,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const [isAgreementChecked, setIsAgreementChecked] = useState(false); // 新状态
  const userCode = localStorage.getItem("usercode");

  // 处理复选框变化
  const handleAgreementChange = (e) => {
    setIsAgreementChecked(e.target.checked);
  };

  // Fetch cart data when the component mounts
  useEffect(() => {
    // fetchCartData();
    window.scrollTo(0, 0);
    const tagline = document.querySelector(".paypal-button-tagline");
    if (tagline) {
      tagline.parentNode.removeChild(tagline);
    }
  }, []);
  // Calculate the total price from objectOnlyData
  const totalEstimatedPrice = objectOnlyData?.reduce(
    (total, item) => total + (item?.cost?.total_cost * item?.qunatity || 0),
    0
  );
  // handle increase the quantity
  const handleIncreaseQuantity = (id) => {
    fetch(
      `https://theoutmaker.com/public/api/user/product/add_to/cart/${userCode}/${id}`,
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
        setToggle(!toggle);
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
      `https://theoutmaker.com/public/api/user/product/delete_from/cart/${userCode}/${id}`,
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
        setToggle(!toggle);
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

  // 处理结账按钮点击
  const handleCheckout = () => {
    if (!isAgreementChecked) {
      toast.error(
        "Please agree to the terms and conditions before proceeding."
      ); // 显示警告
      return; // 提前退出函数
    }
    navigate("/checkout-info");
    // 此处添加跳转逻辑，如果已勾选复选框
  };

  return (
    <>
      <section className="text-primary container mx-auto px-2 md:px-10 py-10 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* cards */}
          <div className="flex-1  ">
            <h3 className="text-3xl font-bold mb-6">
              Your Cart ({cartData ? objectOnlyData.length : 0} Item )
            </h3>
            <div className="shadow-xl rounded">
              {/* card */}

              {objectOnlyData?.map((singleData, index) => (
                <div key={index} className="flex flex-col md:flex-row">
                  <div>
                    <figure className="w-full md:w-[280px] md:pl-6 py-8">
                      <img
                        src={ImgBaseUrl(singleData?.product?.p_pic)}
                        alt=""
                        className="object-fill w-full h-full rounded-lg"
                      />
                    </figure>
                  </div>
                  <div className="card-body">
                    <h2 className="card-title">
                      {singleData?.product?.p_name}
                    </h2>
                    <p>Color: Glacier</p>
                    <p>Dimension: {singleData?.dimension}</p>
                    <p>Category: {singleData?.category}</p>
                    <div className="card-actions justify-end items-center">
                      <p className="text-xl">
                        Price: A${singleData?.cost?.product_sale_price}
                      </p>
                      <div className="flex items-center gap-6 border-2 border-primary p-1 rounded-full cursor-pointer">
                        <p
                          onClick={() =>
                            handleDecreaseQuantity(singleData?.product?.p_id)
                          }
                        >
                          <FaMinus />
                        </p>
                        <span>{singleData?.qunatity}</span>
                        <p
                          onClick={() =>
                            handleIncreaseQuantity(singleData?.product?.p_id)
                          }
                          className="cursor-pointer"
                        >
                          <FaPlus />
                        </p>
                      </div>
                    </div>
                    <div className="h-[4px] bg-[#B8B8B8]"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* payment */}
          <div className="w-full md:w-[550px]  mb-8 lg:mb-0">
            <h3 className="text-3xl font-bold mb-6">Order Summary</h3>
            <div className="p-[30px] shadow-xl rounded">
              <div>
                {/* total ammount */}
                <div className="flex items-center justify-between mt-12 text-xl">
                  <p>Estimated Total</p>
                  <p className="font-bold">A${totalEstimatedPrice}</p>
                </div>
                {/* checkout button */}
                <div>
                  <button
                    onClick={handleCheckout}
                    className="w-full text-center border-2 border-primary rounded-full py-[14px] text-2xl font-medium mt-12 hover:bg-primary hover:text-white duration-500 transition-all ease-linear"
                  >
                    Checkout
                  </button>
                  <div className="w-full text-center mt-2 mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="agreement"
                        className="form-checkbox h-5 w-5 text-blue-600 "
                        onChange={handleAgreementChange}
                      />
                      <span className="ml-2">
                        I agree with the{" "}
                        <Link
                          to="/TermsOfService"
                          class="text-blue-300 hover:text-blue-400"
                        >
                          terms and conditions
                        </Link>
                        .
                      </span>
                    </label>
                  </div>
                  {/* <p className="text-center mb-2">Express checkout</p>
                  {/* divider */}
                  {/* <PayPalScriptProvider
                    options={{
                      clientId: "test",
                      currency: "AUD",
                      disableFunding: "credit,card",
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: totalEstimatedPrice,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        // 这里处理支付成功的逻辑
                        return actions.order.capture().then((details) => {
                          toast.success("Payment Successful!");
                        });
                      }}
                      onCancel={() => {
                        // 这里处理用户取消支付的逻辑
                        toast.error("Payment Cancelled!");
                      }}
                      onError={(err) => {
                        // 这里处理支付过程中发生的错误
                        console.error("Payment Error: ", err);
                        toast.error(
                          "An error occurred during the payment process."
                        );
                      }}
                    />
                  </PayPalScriptProvider>{" "} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* to generate a rnadom number when user will land on this page */}
        <UserInitialization />
      </section>
    </>
  );
};

export default Checkout;
