import React, { useRef, useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import { CartContext } from "../../Provider/CartProvider";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SidebarCart = ({ isOpen, toggleSidebar }) => {
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
  const [paymentHeight, setPaymentHeight] = useState(0);
  const paymentRef = useRef(null);

  // 处理复选框变化
  const handleAgreementChange = (e) => {
    setIsAgreementChecked(e.target.checked);
  };

  // Fetch cart data when the component mounts
  useEffect(() => {
    // fetchCartData();
    const tagline = document.querySelector(".paypal-button-tagline");
    if (tagline) {
      tagline.parentNode.removeChild(tagline);
    }
  }, []);
  // 获取"payment"部分的高度
  useEffect(() => {
    if (paymentRef.current) {
      const height = paymentRef.current.offsetHeight;
      setPaymentHeight(height);
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
    toggleSidebar();
    navigate("/checkout-info");
    // 此处添加跳转逻辑，如果已勾选复选框
  };

  const delete_product_from_cart = (id) => {
    fetch(
      `https://theoutmaker.com/public/api/user/product/delete_product_from_cart/cart/${userCode}/${id}`,
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
        if (isIdTrue(id)) {
          // Find the item to update or remove
          const updatedData = objectOnlyData.filter((item) => {
            return item.product.p_id !== id;
          });

          // Remove null entries (items with quantity 0)
          const updatedDataWithoutNull = updatedData.filter(
            (item) => item !== null
          );

          // Update the objectOnlyData state
          setProductQuantity((prev) => prev - 1);
          updateObjectOnlyData(updatedDataWithoutNull);
        }
      });
  };

  const handleDeleteItem = (singleData) => {
    const { product, qunatity } = singleData;
    const { p_id, p_name } = product;
    // 使用 window.confirm 显示确认框
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${p_name}?`
    );

    if (isConfirmed) {
      // 用户点击确认
      try {
        delete_product_from_cart(p_id);
        // 删除成功的操作
        console.log(`Product with ID ${p_name} deleted successfully`);
      } catch (error) {
        // 删除失败的操作
        console.error("Error deleting product:", error);
      }
    } else {
      // 用户点击取消
      console.log("Deletion cancelled by user");
    }
  };

  return (
    <div
      style={{
        zIndex: "1001",
      }}
      className={`fixed inset-y-0 right-0 md:w-3/12  bg-base-100 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <section
        style={{
          zIndex: "1001",
        }}
        className="w-full h-full text-black container mx-auto py-2 md:py-10"
      >
        {" "}
        {/* 标题部分 */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl ml-3">
              Your Cart
              <span className="text-xl">
                {" "}
                {cartData ? objectOnlyData.length : 0} Item{" "}
              </span>
            </h3>
            <button
              onClick={toggleSidebar}
              className="btn btn-sm btn-circle text-white bg-black"
            >
              <FaTimes />
            </button>
          </div>
        </div>
        {/* 商品列表 */}
        <div className="flex flex-col flex-1 overflow-y-scroll">
          {objectOnlyData?.map((singleData, index) => (
            <div key={index} className="flex flex-col mb-4">
              <div className="flex w-full">
                <figure className="w-full md:w-[180px]">
                  <img
                    src={ImgBaseUrl(singleData?.product?.p_pic)}
                    alt=""
                    className="object-cover w-full h-atuo rounded-lg"
                  />
                </figure>
                <div className="w-full">
                  <h2 className="text-lg pb-1">
                    {singleData?.product?.p_name}
                  </h2>
                  <div className="">
                    <p className="mb-1 text-sm">Color: Glacier</p>
                    <p className="mb-1 text-sm">
                      Dimension: {singleData?.dimension}
                    </p>
                    <p className="mb-1 text-sm">
                      Category: {singleData?.category}
                    </p>
                  </div>

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
                      <span className="text-base">{singleData?.qunatity}</span>
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

                  {/* <p
                        onClick={() => handleDeleteItem(singleData)}
                        className="text-sm cursor-pointer mt-2"
                      >
                        <AiOutlineDelete />
                      </p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 订单摘要 */}
        <div
          ref={paymentRef}
          className="fixed bottom-0 left-0 right-0 bg-white p-4  shadow-xl"
        >
          <h3 className="text-3xl mt-3 mb-6 ml-3">Order Summary</h3>
          <div className="rounded">
            <div className="px-3">
              {/* total ammount */}
              <div className="flex items-center justify-between mt-1 text-lg">
                <p>Estimated Total</p>
                <p className="">A${totalEstimatedPrice}</p>
              </div>
              {/* checkout button */}
              <div>
                <button
                  onClick={handleCheckout}
                  className="w-full text-center border-2 border-primary rounded-full py-[14px] text-2xl font-medium mt-12 bg-primary text-white duration-500 transition-all ease-linear"
                >
                  CHECKOUT
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
                        className="text-blue-300 hover:text-blue-400"
                      >
                        terms and conditions
                      </Link>
                      .
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* to generate a rnadom number when user will land on this page */}
        <UserInitialization />
      </section>
    </div>
  );
};

export default SidebarCart;
