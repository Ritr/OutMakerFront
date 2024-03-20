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
import img1 from "../../assets/detail/1.png";
import img2 from "../../assets/detail/2.png";
import img3 from "../../assets/detail/3.png";
import img4 from "../../assets/detail/4.png";
import img5 from "../../assets/detail/5.png";
import img6 from "../../assets/detail/6.png";
import img7 from "../../assets/detail/7.png";
import { useAddToCart } from "../../Hooks/api/useAddToCart";
import dayjs from "dayjs/esm/index.js";
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
              <div className="flex items-center">
                <img src={img7} alt="" className="md:w-[128px] mr-2" />
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
                      day1.format("DD/MM") +
                      " and " +
                      day2.format("DD/MM")}
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
              <p className="price flex items-center">
                <del className="text-[#ADACAC]">
                  A${cost?.product_regular_price}
                </del>
                <span className="text-[#DC2626] pl-[5px] font-semibold">
                  A${cost?.product_sale_price}
                </span>
                <img src={img7} className="w-28 ml-2" alt="" />
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
            <div className="md:hidden">
              <div className="flex items-center gap-4 p-2 ">
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
          </div>
          <div className="hidden md:flex w-full  items-center">
            <div className="flex px-2 flex-1">
              <div className="flex items-center gap-6 border-2 border-primary p-2 md:mr-1 rounded-full cursor-pointer">
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
                className="bg-primary  h-[50px] w-full hover:bg-white text-white text-center hover:text-primary rounded-full btn btn-outline p-2  md:p-3 md:px-8 text-sm font-normal"
              >
                <p className="flex gap-2 items-center text-center">
                  <BsHandbagFill className="" /> Add to cart- A$
                  {cost?.product_sale_price}
                </p>
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-primary md:hidden  h-[50px] w-full hover:bg-white text-white text-center hover:text-primary rounded-full btn btn-outline p-2  text-sm "
          >
            <p className="flex gap-2 items-center text-center">
              <BsHandbagFill className="" /> Add to cart- A$
              {cost?.product_sale_price}
            </p>
          </button>

          <div className="text-sm p-3 flex">
            <FaBoxOpen className="mr-2 color-[#a0a0a0]" />
            <span>
              {product?.quantity > 0
                ? "In stock - Ship from Melbourne warehouse.Received within 5-7days"
                : "pre-order - Ship from Melbourne warehouse.Received " +
                  day1.format("DD/MM") +
                  " and " +
                  day2.format("DD/MM")}
            </span>
          </div>
        </div>
        <div className="px-4 pt-4 md:border rounded-lg md:flex justify-between flex-row-reverse mt-4 md:mt-6">
          <div>
            <div className="font-bold mb-3 flex gap-2 items-center">
              <img src={img1} className="w-4 h-4 object-contain" alt="" />
              30 Days Free Returns
            </div>
            <div className="font-bold mb-3 flex gap-2 items-center">
              <img src={img2} className="w-4 h-4 object-contain" alt="" />
              Quick refund
            </div>
          </div>
          <div>
            <div className="md:flex gap-4 md:mb-3">
              <div className="mb-3 md:mb-0 text-sm flex gap-2 items-center">
                <img src={img3} className="w-4 h-4 object-contain" alt="" />
                Furniture Assemble: {product?.assemble ? "yes" : "no"}
              </div>
              <div className="mb-3 md:mb-0 text-sm flex gap-2 items-center">
                <img src={img4} className="w-4 h-4 object-contain" alt="" />
                Freight calculated based on the shipping address
              </div>
            </div>
            <div className="md:flex gap-4">
              <div className="mb-3 md:mb-0 text-sm flex gap-2 items-center">
                <img src={img5} className="w-4 h-4 object-contain" alt="" />
                Furniturep Provided for installation
              </div>
              <div className="mb-3 md:mb-0 text-sm flex gap-2 items-center">
                <img src={img6} className="w-4 h-4 object-contain" alt="" />
                Modular splicing design: {product?.modular ? "yes" : "no"}
              </div>
            </div>{" "}
          </div>
        </div>

        <div className="py-6 text-center">
          <h4 className="text-2xl font-font leading-loose">MEET LUDLOW</h4>
          <p className="text-sm font-light">{product?.p_s_description}</p>
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
          <div className=" w-full h-full [&>div>video]:object-cover">
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
              playsinline={true}
              className="w-full  h-[50vh] md:h-[100vh]"
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
          <nav className="pt-4">
            <ul className="flex flex-wrap px-2 md:gap-4 md:rounded-full gap-2 md:justify-between text-sm md:text-base font-normal text-center mb-2 md:mb-0">
              <li
                onClick={() => changeCategory("dimension")}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm md:text-base border border-primary ${
                  category === "dimension" ? "bg-primary text-white" : ""
                } hover:text-white  hover:bg-primary`}
              >
                Dimensions
              </li>
              <li
                onClick={() => changeCategory("details")}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm md:text-base border border-primary ${
                  category === "details" ? "bg-primary text-white" : ""
                } hover:text-white  hover:bg-primary`}
              >
                Product details
              </li>
              <li
                onClick={() => changeCategory("warranty")}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm md:text-base border border-primary ${
                  category === "warranty" ? "bg-primary text-white" : ""
                } hover:text-white  hover:bg-primary`}
              >
                Warranty
              </li>
              <li
                onClick={() => changeCategory("CareGuide")}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm md:text-base border border-primary ${
                  category === "CareGuide" ? "bg-primary text-white" : ""
                } hover:text-white  hover:bg-primary`}
              >
                Care Guide
              </li>
              <li
                onClick={() => changeCategory("Shipping")}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm md:text-base border border-primary ${
                  category === "Shipping" ? "bg-primary text-white" : ""
                } hover:text-white  hover:bg-primary`}
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
