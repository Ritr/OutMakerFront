import React, { useState, useContext,useEffect } from "react";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BsHandbagFill } from "react-icons/bs";
import { CartContext } from "../../Provider/CartProvider";

import { useAddToCart } from "../../Hooks/api/useAddToCart";

const CartBar = ({ product, cost }) => {
  const userCode = localStorage.getItem("usercode");
  const { fetchCartData } = useContext(CartContext);
  const { mutate: addToCart } = useAddToCart(userCode);
  const [quantity, setQuantity] = useState(1);
  const addToCartMutation = useAddToCart(userCode);
  // 处理增加数量
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // 处理减少数量
  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
    );
  };

  // 处理添加到购物车
  const handleAddToCart = () => {
    // addToCart(
    //   { productId: product?.p_id, quantity },
    //   {
    //     onSuccess: (response) => {
    //       const data = response.data;
    //       console.log(data);
    //       if (data.Failed) {
    //         toast.error(data.Failed);
    //         return;
    //       }
    //       toast.success("Successfully Added to your cart.");
    //       fetchCartData(); // Refetch cart data
    //       document.getElementById("my_modal_3").showModal(); // Show modal
    //     },
    //   }
    // );
    addToCartMutation.mutate({ productId: product?.p_id, quantity });
  };
  useEffect(() => {
    if (addToCartMutation.isSuccess) {
      toast.success("Successfully Added to your cart.");
      fetchCartData();
      document.getElementById("my_modal_3").showModal();
    }
  }, [addToCartMutation.isSuccess]);
  return (
    <div className="cart-bar w-full md:right-4 md:left-1 fixed bottom-4 z-10 md:p-3 bg-white flex items-center justify-between rounded-full shadow-lg md:h-16 justify-center">
      <div className="hidden md:flex  items-center">
        <div
          className="ar-wrapper thumb-wrapper"
          style={{ paddingBottom: "1.0" }}
        >
          <div className="flex items-center justify-center w-16 h-16">
            <img
              className="lazy entered loaded"
              src={ImgBaseUrl(product?.p_pic)}
              alt=""
              data-ll-status="loaded"
            />
          </div>
        </div>
        <p className="ml-2">{product.p_name}</p>
        <span className="text-xs text-right text-gray-500">
          {product?.quantity > 0
            ? "(in stock ship within 72hours)"
            : null}
          {/* (in stock ship within 72hours) */}
        </span>
      </div>

      <div className="content-wrapper flex items-center justify-between w-full md:w-auto p-1 md:p-0">
        <div className="hidden md:block price-info mr-2 text-right">
          <p className="price">
            <del className="text-[#ADACAC]">A${cost?.product_regular_price}</del>
            <span className="text-[#BF0A30] pl-[5px] font-medium">
              A${cost?.product_sale_price}
            </span>
          </p>
          <p
            className="affirm-as-low-as"
            data-page-type="product"
            data-amount="350400"
          >
            and 10 Year Warranty
          </p>
        </div>

        <div className="flex items-center gap-6 border-2 border-primary p-2 mr-1 rounded-full cursor-pointer">
          <p
            className={`cursor-pointer ${quantity === 1 ? "text-gray-400 cursor-not-allowed" : ""
              }`}
            onClick={handleDecreaseQuantity}
          >
            <FaMinus />
          </p>
          <span>{quantity}</span>
          <p onClick={handleIncreaseQuantity} className="cursor-pointer">
            <FaPlus />
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-primary hover:bg-white text-white text-center hover:text-primary rounded-full w-[270px] md:w-[400px] btn btn-outline text-sm font-normal"
        >
          <p className="flex gap-2 items-center text-center">
            <BsHandbagFill className="" /> Add to cart- A$
            {cost?.product_sale_price}
          </p>
        </button>
      </div>
    </div>
  );
};

export default CartBar;
