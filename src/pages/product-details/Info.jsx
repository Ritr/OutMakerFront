import React, { useContext, useRef, useState } from "react";
import { BsHandbagFill } from "react-icons/bs";
import SocialShare from "../../components/SocialShare/SocialShare";
import { FaPlay, FaPause } from "react-icons/fa";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { CartContext } from "../../Provider/CartProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import { FaMinus, FaPlus, FaBoxOpen } from "react-icons/fa";
import SidebarCart from "../../components/Navbar/SidebarCart";
import ReactPlayer from "react-player";

import { useAddToCart } from "../../Hooks/api/useAddToCart";
import * as dayjs from "dayjs";
const Info = ({
  category,
  changeCategory,
  product,
  cost,
  video,
  poster,
  images,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isSidebarCartOpen, setIsSidebarCartOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const { fetchCartData } = useContext(CartContext);
  const userCode = localStorage.getItem("usercode");
  const { mutate: addToCart } = useAddToCart(userCode);
  const day1 = dayjs().add(30, "day");
  const day2 = dayjs().add(40, "day");
  // toggle video play pause
  const togglePlayPause = () => {
    // 如果视频正在播放，暂停它；如果视频暂停，播放它
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      // 更新播放状态
      setIsPlaying(!isPlaying);
    }
  };

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
  // const handleAddToCart = () => {
  //   fetch(
  //     `https://theoutmaker.com/public/api/user/product/add_to/cart/${userCode}/${product?.p_id}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ quantity }), // 使用当前的数量
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       toast.success("Successfully Added to your cart.");
  //       fetchCartData();
  //       document.getElementById("my_modal_3").showModal();
  //     });
  // };
  const handleAddToCart = () => {
    addToCart(
      { productId: product?.p_id, quantity },
      {
        onSuccess: (response) => {
          const data = response.data;
          console.log(data);
          if (data.Failed) {
            toast.error(data.Failed);
            return;
          }
          toast.success("Successfully Added to your cart.");
          fetchCartData(); // Refetch cart data
          document.getElementById("my_modal_3").showModal(); // Show modal
        },
      }
    );
  };

  const viewCart = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.close();
    }
    setIsSidebarCartOpen(true);
  };

  return (
    <section className="">
      <div className="w-full">
        {/* SidebarCart */}
        <SidebarCart
          isOpen={isSidebarCartOpen}
          toggleSidebar={() => setIsSidebarCartOpen(false)}
        />
        {/* Modal Container */}
        <div>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box  border-2 border-primary">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <p className="text-primary font-medium mb-2">
                Added To Your Cart
              </p>
              <div className="flex items-center justify-around gap-5 border-t-2 border-b-2 py-5">
                <figure className="w-[100px]">
                  <img
                    src={ImgBaseUrl(product?.p_pic)}
                    alt=""
                    className="object-cover w-full h-full border"
                  />
                </figure>
                <h3>{product?.p_name}</h3>
                <p>A${cost?.product_sale_price}</p>
              </div>
              <div className="mt-5">
                <button
                  onClick={viewCart}
                  className="btn btn-primary rounded-full w-full text-white"
                >
                  view Cart
                </button>
                <Link
                  to="/checkout-info"
                  className="btn btn-primary rounded-full w-full text-white  mt-5"
                >
                  CheckOut
                </Link>

                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-outline btn-primary rounded-full w-full mt-5">
                    Continue Shopping
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        <div className="hidden mt-4 cart-bar md:pl-12 md:p-3 md:border-gray-300 md:flex items-center justify-between md:rounded-full md:border">
          <div className=" items-center md:flex">
            {/* <div
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
            </div> */}
            <div className="">
              <div className="flex items-end">
                <p className="text-2xl font-semibold">{product.p_name}</p>
                <span className="ml-2 text-sm text-right text-gray-400">
                  (in stock ship within 72hours)
                </span>
              </div>
              <div className=" text-sm flex items-center mt-2">
                <FaBoxOpen className="mr-2 color-[#a0a0a0]" />
                <span>
                  {product?.quantity > 0
                    ? "In stock - Ship from Melbourne warehouse.Received within 5-7days"
                    : "pre-order - Ship from Melbourne warehouse.Received between " +
                      day1.format("YYYY/MM/DD") +
                      " and " +
                      day2.format("YYYY/MM/DD")}
                </span>
              </div>
            </div>
          </div>

          {/* Cart Bar */}
          <div className="md:content-wrapper md:w-auto w-full flex items-center justify-between ">
            <div className=" price-info mr-2 text-right">
              <p className="price">
                <del className="text-[#ADACAC]">
                  A${cost?.product_regular_price}
                </del>
                <span className="text-[#DC2626] pl-[5px] font-semibold">
                  A${cost?.product_sale_price}
                </span>
              </p>
              <p
                className="affirm-as-low-as text-base"
                data-page-type="product"
                data-amount="350400"
              >
                and 10 Year Warranty
              </p>
            </div>

            <div className="flex mx-6 items-center gap-6 border border-primary p-3 rounded-full cursor-pointer">
              <p
                className={`cursor-pointer ${
                  quantity === 1 ? "text-gray-400 cursor-not-allowed" : ""
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
              className="bg-primary hover:bg-white text-white text-center hover:text-primary rounded-full btn btn-outline p-3 px-8 text-sm font-normal"
            >
              <p className="flex gap-2 items-center text-center">
                <BsHandbagFill className="" /> Add to cart- A$
                {cost?.product_sale_price}
              </p>
            </button>
          </div>
        </div>
        <div className="md:hidden">
          <div className="flex justify-between p-3 w-full">
            <div>
              <p className="price">
                <del className="text-[#ADACAC]">
                  A${cost?.product_regular_price}
                </del>
                <span className="text-[#DC2626] pl-[5px] font-semibold">
                  A${cost?.product_sale_price}
                </span>
              </p>
              <p
                className="affirm-as-low-as text-base"
                data-page-type="product"
                data-amount="350400"
              >
                <span className="text-sm text-right text-gray-400">
                  (in stock ship within 72hours)
                </span>
                and 10 Year Warranty
              </p>
            </div>
          </div>
          <div className="flex w-full  items-center">
            <div className="flex px-2  flex-1">
              <div className="flex items-center gap-6 border-2 border-primary p-2 mr-1 rounded-full cursor-pointer">
                <p
                  className={`cursor-pointer ${
                    quantity === 1 ? "text-gray-400 cursor-not-allowed" : ""
                  }`}
                  onClick={handleDecreaseQuantity}
                >
                  <FaMinus />
                </p>
                <span className="w-full text-center">{quantity}</span>
                <p onClick={handleIncreaseQuantity} className="cursor-pointer">
                  <FaPlus />
                </p>
              </div>
            </div>
            <div className="flex px-2 flex-3">
              <button
                onClick={handleAddToCart}
                className="bg-primary  h-[50px] w-full hover:bg-white text-white text-center hover:text-primary rounded-full btn btn-outline p-3 px-8 text-sm font-normal"
              >
                <p className="flex gap-2 items-center text-center">
                  <BsHandbagFill className="" /> Add to cart- A$
                  {cost?.product_sale_price}
                </p>
              </button>
            </div>
          </div>

          <div className="text-sm p-3 flex">
            <FaBoxOpen className="mr-2 color-[#a0a0a0]" />
            <span>
              {product?.quantity > 0
                ? "In stock - Ship from Melbourne warehouse.Received within 5-7days1111"
                : "pre-order - Ship from Melbourne warehouse.Received " +
                  day1.format("YYYY/MM/DD") +
                  " and " +
                  day2.format("YYYY/MM/DD")}
            </span>
          </div>
        </div>
        <div className="py-6">
          <h4 className="text-2xl font-medium leading-loose">MEET LUDLOW</h4>
          <p className="text-base font-light  leading-loose">
            {product?.p_s_description}
          </p>
        </div>
        {/* <div className="pt-8 pb-0 md:pb-8">
          <button className="btn btn-outline bg-white hover:bg-primary text-primary rounded-full hover:text-white w-[300px] md:w-[400px] text-sm font-normal">
            <p className="flex gap-2 items-center">
              <BsInfoCircle /> In stock - Ships within Two Weeks
            </p>
          </button>{" "}
          <br />
          <button
            onClick={() => handleAddToCart(product?.p_id)}
            className="bg-primary hover:bg-white text-white hover:text-primary rounded-full w-[300px] md:w-[400px] btn btn-outline justify-start text-sm font-normal mt-6"
          >
            <p className="flex gap-2 items-center">
              <BsHandbagFill className="" />{" "}
              {!isIdTrue(product?.p_id) ? "Add to cart-" : "View Cart"} $
              {cost?.product_sale_price}
            </p>
          </button>
        </div>  */}
        {/* video */}
        <div className="relative">
          <div className=" w-full h-full">
            {/* <video
              playsInline
              autoPlay
              muted
              loop
              poster="cake.jpg"
              className="w-full md:h-[100vh] h-[300px] object-cover lg:object-cover"
              ref={videoRef}
            >
              <source src={video} type="video/webm" />
              Your browser does not support the video tag.
            </video> */}
            <ReactPlayer
              url={video}
              playing={true}
              loop={true}
              volume={0}
              muted={true}
              width="100%"
              height="100%"
              playsinline={true}
              className="w-full md:h-[100vh] h-[300px] object-cover lg:object-cover"
            />
          </div>
          {/* video button */}
          <div className="absolute z-10 right-8 bottom-8">
            <button
              onClick={togglePlayPause}
              className="border border-primary bg-white hover:bg-[#D8EDF5] transition-all duration-300 ease-linear p-2 rounded-full"
            >
              {isPlaying ? (
                <div className="flex items-center gap-2 px-2 text-primary">
                  <p className="bg-primary p-2 rounded-full">
                    <FaPause className="text-white text-sm" />
                  </p>
                  <p>Pause</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-2 text-primary">
                  <p className="bg-primary p-2 rounded-full">
                    <FaPlay className="text-white text-sm" />
                  </p>
                  <p>Play</p>
                </div>
              )}
            </button>
          </div>
        </div>
        <ImageSlider images={images} />
        <div className="block lg:flex items-center gap-8 md:pt-4">
          <nav className="md:pt-4">
            <ul className="block md:border md:rounded-full overflow-hidden md:flex justify-between text-sm md:text-base font-normal text-center">
              <li
                onClick={() => changeCategory("dimension")}
                className={`cursor-pointer border-r ${
                  category === "dimension" ? "bg-primary text-white" : ""
                } hover:text-white py-4 hover:bg-primary px-10`}
              >
                Dimensions
              </li>
              <li
                onClick={() => changeCategory("details")}
                className={`cursor-pointer border-r ${
                  category === "details" ? "bg-primary text-white" : ""
                } hover:text-white py-4 hover:bg-primary px-10`}
              >
                Product details
              </li>

              <li
                onClick={() => changeCategory("warranty")}
                className={`cursor-pointer border-r ${
                  category === "warranty" ? "bg-primary text-white" : ""
                } hover:text-white py-4 hover:bg-primary px-10`}
              >
                Warranty
              </li>
              <li
                onClick={() => changeCategory("CareGuide")}
                className={`cursor-pointer border-r ${
                  category === "CareGuide" ? "bg-primary text-white" : ""
                } hover:text-white py-4 hover:bg-primary px-10`}
              >
                Care Guide
              </li>
              <li
                onClick={() => changeCategory("Shipping")}
                className={`cursor-pointer border-l ${
                  category === "Shipping" ? "bg-primary text-white" : ""
                } hover:text-white py-4 hover:bg-primary px-10`}
              >
                Shipping
              </li>
            </ul>
          </nav>

          <SocialShare />
        </div>
      </div>
    </section>
  );
};

export default Info;
