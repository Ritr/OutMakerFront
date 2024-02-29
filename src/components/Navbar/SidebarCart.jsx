import React, { useRef, useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import { CartContext } from "../../Provider/CartProvider";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useManageProductQuantity } from "../../Hooks/api/useManageProductQuantity";

const SidebarCart = ({ isOpen, toggleSidebar }) => {
  const { cartData, objectOnlyData, fetchCartData, updateObjectOnlyData } =
    useContext(CartContext);
  const navigate = useNavigate();
  const userCode = localStorage.getItem("usercode");
  const [isAgreementChecked, setIsAgreementChecked] = useState(false); // 新状态

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
          // 直接更新 objectOnlyData 状态以反映数量减少后的变化
          const updatedData = objectOnlyData.reduce((acc, item) => {
            if (item.product.p_id === id) {
              const newQuantity = item.qunatity - 1;
              if (newQuantity > 0) {
                // 如果数量大于 0，更新该项
                acc.push({ ...item, qunatity: newQuantity });
              }
              // 如果数量等于 0，不再将该项添加到数组中，相当于移除该商品
            } else {
              // 如果不是当前操作的商品 ID，保持不变
              acc.push(item);
            }
            return acc;
          }, []);

          // 更新状态
          updateObjectOnlyData(updatedData);
          toast.success("Product quantity decreased successfully.");
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
      className={`fixed  inset-y-0 right-0 left-0 h-full w-full bg-gray-900 bg-opacity-60 duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        style={{
          zIndex: "1001",
        }}
        className={`fixed inset-y-0 right-0 md:w-3/12  bg-base-100 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <section
          style={{
            zIndex: "1001",
          }}
          className="w-full h-full text-black container mx-auto py-2 md:pb-10"
        >
          <div className="flex flex-col h-screen">
            <div className="p-5 bg-white border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h5 className="text-xl font-bold leading-none text-gray-900">
                    Your Cart
                  </h5>
                  <span className="text-sm font-medium ml-3">
                    {cartData ? objectOnlyData.length : 0} Item{" "}
                  </span>
                </div>

                <button
                  onClick={toggleSidebar}
                  className="btn btn-sm btn-circle text-white bg-black"
                >
                  <FaTimes />
                </button>
              </div>
              <div className={`max-h-[60vh] overflow-y-auto`}>
                {objectOnlyData?.map((singleData, index) => (
                  <div key={index} className="flex gap-4 my-4">
                    <img
                      src={ImgBaseUrl(singleData?.product?.p_pic)}
                      alt="Product"
                      className="w-20 h-20 object-fit object-center"
                    />
                    <div className="flex flex-col">
                      <h6 className="text-md font-bold">
                        {singleData?.product?.p_name}
                      </h6>
                      <p className="text-sm text-gray-600">Color: Glacier</p>
                      <p className="text-sm text-gray-600">
                        Dimension: {singleData?.dimension}
                      </p>
                      <p className="text-sm text-gray-600">
                        Category: {singleData?.category}
                      </p>
                      <div className="card-actions flex justify-between items-center mt-4 mr-2">
                        <div className="flex items-center gap-6 border-2 border-black p-0.5 rounded-full cursor-pointer">
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

                        <p className="text-xl">
                          Price: A${singleData?.cost?.product_sale_price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div id="paymentRef" className="bg-gray-50 p-5 sticky bottom-0">
              <div className="flex justify-between items-center">
                <h5 className="text-xl font-bold leading-none text-gray-900">
                  Order Summary
                </h5>
              </div>
              <div className="mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Estimated Total
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    A${totalEstimatedPrice}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full text-center border-2 border-primary rounded-full py-[14px] text-2xl font-medium mt-4 bg-primary text-white duration-500 transition-all ease-linear"
              >
                CHECK OUT
              </button>
              <div className="flex items-center mt-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                  onChange={handleAgreementChange}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-xs font-medium text-black"
                >
                  I agree with the{" "}
                  <Link
                    to="/TermsOfService"
                    class="text-blue-300 hover:text-blue-400"
                  >
                    terms and conditions
                  </Link>
                  .
                </label>
              </div>
            </div>
          </div>

          {/* to generate a rnadom number when user will land on this page */}
          <UserInitialization />
        </section>
      </div>
    </div>
  );
};

export default SidebarCart;
