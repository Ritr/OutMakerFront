import React, { useRef, useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import { CartContext } from "../../Provider/CartProvider";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PiNotePencil } from "react-icons/pi";

import { useManageProductQuantity } from "../../Hooks/api/useManageProductQuantity";
import CartNotes from "./CartNodes";
const SidebarCart = ({ isOpen, toggleSidebar }) => {
  const { cartData, objectOnlyData, fetchCartData, updateObjectOnlyData } =
    useContext(CartContext);
  const navigate = useNavigate();
  const userCode = localStorage.getItem("usercode");
  const [isAgreementChecked, setIsAgreementChecked] = useState(false); // 新状态
  const [noteFlag, setNoteFlag] = useState(false);
  const { mutate: manageQuantity } = useManageProductQuantity(userCode);

  // 处理复选框变化
  const handleAgreementChange = (e) => {
    setIsAgreementChecked(e.target.checked);
  };

  // Fetch cart data when the component mounts
  useEffect(() => {
    fetchCartData();
    const tagline = document.querySelector(".paypal-button-tagline");
    if (tagline) {
      tagline.parentNode.removeChild(tagline);
    }
  }, []);
  useEffect(() => {
    if (isOpen) {
      document.querySelector("#root").style.overflowY = "hidden";
    } else {
      document.querySelector("#root").style.overflowY = "auto";
    }
  }, [isOpen]);
  // Calculate the total price from objectOnlyData
  const totalEstimatedPrice = objectOnlyData?.reduce(
    (total, item) => total + (item?.cost?.total_cost * item?.qunatity || 0),
    0
  );

  // 处理结账按钮点击
  const handleCheckout = () => {
    if (!isAgreementChecked) {
      toast.error(
        "Please agree to the terms and conditions before proceeding."
      ); // 显示警告
      return; // 提前退出函数
    }
    toggleSidebar();
    navigate("/checkout-info");
    // 此处添加跳转逻辑，如果已勾选复选框
  };
  const handleIncreaseQuantity = (id) => {


    manageQuantity(
      { productId: id, action: "increase" },
      {
        onSuccess: () => {
          // 触发 Context 中的状态更新
          fetchCartData(); // 假设这个函数会重新获取最新的购物车数据并更新状态
          toast.success("Product quantity increased successfully.");
        },
        onError: (error) => {
          console.error("Failed to increase quantity", error);
          toast.error("Failed to increase product quantity.");
        },
      }
    );
  };

  const handleDecreaseQuantity = (id) => {
    manageQuantity(
      { productId: id, action: "decrease" },
      {
        onSuccess: () => {
          // 触发 Context 中的状态更新
          fetchCartData(); // 假设这个函数会重新获取最新的购物车数据并更新状态
          toast.success("Product quantity increased successfully.");
        },
        onError: (error) => {
          console.error("Failed to decrease quantity", error);
          toast.error("Failed to decrease product quantity.");
        },
      }
    );
  };

  return (
    <div
      style={{
        zIndex: "1001",
      }}
      className={`fixed  inset-y-0 right-0 left-0 top-0 bottom-0  h-full w-full bg-gray-900 bg-opacity-60  ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div
        style={{
          zIndex: "1001",
        }}
        className={`fixed inset-y-0 right-0 left-10 md:left-auto md:w-3/12  bg-base-100 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <section
          style={{
            zIndex: "1001",
          }}
          className="w-full h-full text-black container mx-auto py-2 md:pb-10 "
        >
          <div className="flex flex-col h-full justify-between">
            <div className="p-5 bg-white border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h5 className="text-xl  leading-none ">Your Cart</h5>
                  <span className="text-sm font-medium ml-3">
                    ({cartData ? objectOnlyData.length : 0} Item)
                  </span>
                </div>

                <button
                  onClick={toggleSidebar}
                  className="btn btn-sm btn-circle text-white bg-black"
                >
                  <FaTimes />
                </button>
              </div>
              <div className={`max-h-[45vh] overflow-y-auto`}>
                {objectOnlyData?.map((singleData, index) => (
                  <div key={index} className="flex gap-4 my-4">
                    <img
                      src={ImgBaseUrl(singleData?.product?.p_pic)}
                      alt="Product"
                      className="w-[35%] object-contain -mt-12"
                    />

                    <div className="w-[65%] flex flex-col">
                      <h6 className="text-base  mb-2">
                        {singleData?.product?.p_name}
                      </h6>
                      {/* <p className="text-sm text-[#808080] mb-1">
                        Color: Glacier
                      </p>
                      <p className="text-sm text-[#808080] mb-1">
                        Dimension: {singleData?.dimension}
                      </p> */}
                      <p className="text-sm text-[#808080] mb-1">
                        Category: {singleData?.category}
                      </p>
                      <div className="card-actions flex justify-between items-center mt-4 mr-2">
                        <div className="flex items-center gap-6 border border-[#BFBFBF] p-2 py-1 rounded-full cursor-pointer">
                          <p
                            onClick={() =>
                              handleDecreaseQuantity(singleData?.product?.p_id)
                            }
                            className="text-sm cursor-pointer"
                          >
                            <FaMinus />
                          </p>
                          <span className="text-base">
                            {singleData?.qunatity}
                          </span>
                          <p
                            onClick={() =>
                              handleIncreaseQuantity(singleData?.product?.p_id)
                            }
                            className="text-sm cursor-pointer"
                          >
                            <FaPlus />
                          </p>
                        </div>

                        <p className="text-base">
                          Price: A${singleData?.cost?.product_sale_price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`${objectOnlyData[0] ? "flex pt-4" : "hidden"}`}>
                <div className="tooltip" data-tip="Edit Notes">
                  <button className={`btn ${noteFlag ? "hidden" : ""}`} onClick={() => { setNoteFlag(true) }}>Edit Notes <PiNotePencil className="text-xl" /></button>
                </div>
              </div>
              <div className={`mt-4 absolute bottom-20 z-10 ${(noteFlag && objectOnlyData[0]) ? "" : "hidden"}`}>
                <CartNotes initNotes={objectOnlyData[0]?.notes} onCancel={() => { setNoteFlag(false) }} onSubmit={() => { setNoteFlag(false) }} />
              </div>
            </div>
            <div id="paymentRef" className={`bg-gray-50 p-5 pb-0 sticky bottom-0 ${(noteFlag && objectOnlyData[0])?"hidden":""}` }>
              <div className="flex justify-between items-center">
                <h5 className="text-xl leading-none ">Order Summary</h5>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base text-[#808080]">
                    Estimated Total
                  </span>
                  <span className="text-xl text-[#F31717]">
                    A${totalEstimatedPrice}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full text-center rounded-full py-[14px] text-base font-medium mt-3 bg-[#0091CD] text-white duration-500 transition-all ease-linear"
              >
                CHECK OUT
              </button>
              <div className="flex items-center mt-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="w-4 h-4 text-[#7F7F7F] rounded"
                  onChange={handleAgreementChange}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-xs text-[#7F7F7F]"
                >
                  I agree with the{" "}
                  <Link
                    to="/TermsOfService"
                    className="text-[#7F7F7F] hover:text-blue-400"
                  >
                    terms and conditions
                  </Link>
                  .
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SidebarCart;
