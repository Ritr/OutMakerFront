import React, { useState, useEffect, useContext } from "react";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../assets/css/details.css";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { FaPlay } from "react-icons/fa";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { GoSearch } from "react-icons/go";
import SwiperWrapper from "../../components/SwiperWrapper";
import { SwiperSlide } from "swiper/react";


import { BsHandbagFill } from "react-icons/bs";
import SocialShare from "../../components/SocialShare/SocialShare";
import { CartContext } from "../../Provider/CartProvider";
import toast from "react-hot-toast";
import ImageSlider from "./ImageSlider";
import { FaMinus, FaPlus, FaBoxOpen, FaRegQuestionCircle } from "react-icons/fa";
import SidebarCart from "../../components/Navbar/SidebarCart";
import img1 from "../../assets/detail/1.png";
import img2 from "../../assets/detail/2.png";
import img3 from "../../assets/detail/3.png";
import img4 from "../../assets/detail/4.png";
import img5 from "../../assets/detail/5.png";
import img6 from "../../assets/detail/6.png";
import img7 from "../../assets/detail/7.png";
import { useAddToCart } from "../../Hooks/api/useAddToCart";
import dayjs from "dayjs/esm/index.js";
import zip from "../../assets/icons/ZIP.png";
import afterPay from "../../assets/Afterpay.png";
import bPaypal from "../../assets/icons/bPaypal.svg";

import imgPostPrice from "../../assets/postPrice.png";
import { stateAbbreviations, map, logisticsInfo } from "../Checkout/au.js";
import {
  calculateWeight,
  calculateBaseCharge,
  calculateAdditionalCharges,
  calculateFuelSurchargeAndGST,
} from "../Checkout/LargeCalculations";
const DetailsSlider = ({
  product,
  images,
  Product_Colors,
  dimensions,
  collectionId,
  collectionName,
  category,
  changeCategory,
  video,
  poster,
  cost,
  imagesInfo,
  productMaterials = []
}) => {
  const find24 = () => {
    let res = productMaterials.find(item => {
      return item.material.material_id == 24;
    });
    if (res) {
      return 10;
    } else {
      return 5;
    }
  }
  const [headerImage, setHeaderImage] = useState(null);
  const [images2, setImages] = useState([
    { image_url: product.p_pic },
    ...images,
  ]);
  const [productColor, setProductColor] = useState({});
  const toggleColor = (color) => {
    if (productColor.color_name === color.color_name) {
      setProductColor({});
      filterColor({});
    } else {
      setProductColor(color);
      filterColor(color);
    }

  }
  const filterColor = (color) => {
    console.log(images);

    const res = images.filter((item) => {
      if (!color.color_name) {
        return item;
      }
      return item.image_color === color.color_name;
    })
    console.log(color);

    console.log(res);
    setImages([{ image_url: product.p_pic }, ...res])
    // return [{ image_url: product.p_pic }, ...res]
  };
  // handler for image change
  const handleImageClick = (image) => {
    setHeaderImage(image);
  };

  const handleNext = () => {
    console.log(headerImage);
    let index = images2.findIndex((item) => {
      return item.image_url === (headerImage || product.p_pic);
    });
    if (index + 1 >= images2.length) {
      return;
    }

    let image = images2[index + 1];
    console.log(image.image_url);
    setHeaderImage(image.image_url);
  };

  const handlePrev = () => {
    let index = images2.findIndex((item) => {
      return item.image_url === (headerImage || product.p_pic);
    });

    if (index === 0) {
      return;
    }
    let image = images2[index - 1];
    setHeaderImage(image.image_url);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);




  const [quantity, setQuantity] = useState(1);
  const [isSidebarCartOpen, setIsSidebarCartOpen] = useState(false);
  const { fetchCartData } = useContext(CartContext);
  const userCode = localStorage.getItem("usercode");
  const addToCartMutation = useAddToCart(userCode);
  const day1 = dayjs().add(30, "day");
  const day2 = dayjs().add(40, "day");
  const [visible, setVisible] = useState(false);
  const [afterPayVisible, setAfterPayVisible] = useState(false);
  const [zipPayVisible, setZipPayVisible] = useState(false);
  const [postCost, setPostCost] = useState(0);
  useEffect(() => {
    if (addToCartMutation.isSuccess) {
      toast.success("Successfully Added to your cart.");
      fetchCartData();
      document.getElementById("my_modal_3").showModal();
    }
  }, [addToCartMutation.isSuccess]);
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
  const handleAddToCart = () => {
    const color_id = productColor.color_id;
    const color_name = productColor.color_name;
    addToCartMutation.mutate({ productId: product?.p_id, quantity, colorId: color_id, colorName: color_name, colorCode: productColor.color_code });
  };
  const viewCart = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.close();
    }
    setIsSidebarCartOpen(true);
  };
  const postCodeChange = (code) => {

    if (code) {
      const cityInfo = map?.find(
        (item) => item.邮编 === code
      );

      if (cityInfo) {
        console.log("cityInfo", cityInfo);
        const logistics = logisticsInfo?.find(
          (info) => info.物流分区 === cityInfo.物流分区
        );

        if (logistics) {
          const totalWeight = calculateWeight(
            [product]
          ); // 计算总重量
          console.log("计算总重量", totalWeight);
          // todo
          const baseCharge = calculateBaseCharge(
            logistics.基础费用,
            logistics.续重费,
            logistics.最低单费,
            80
          );
          console.log("logistics", logistics);
          const additionalCharges = calculateAdditionalCharges(
            [{ product }]
          ); // 计算附加费用
          const FuelSurchargeAndGST = calculateFuelSurchargeAndGST(
            baseCharge,
            additionalCharges
          ); // 包括燃油附加费、GST和保险费

          // console.log("Base Charge: ", baseCharge);
          // console.log("Additional Charges: ", additionalCharges);
          // console.log("FuelSurchargeAndGST: ", FuelSurchargeAndGST);
          setPostCost(FuelSurchargeAndGST.toFixed(2));
        }
      }
    }
  };
  return (
    <div>
      <div className="text-center w-full ">
        <div className="hidden md:block absolute top-10 right-0">
          <div className="bg-[#EDEDEF] px-2 py-2 mb-2 text-xs text-center">
            THIS SET INCLUDES
          </div>
          <div className="border border-color-[#E3E3E3] text-left px-3 py-3 pb-0 rounded-sm">
            {dimensions.map((item, index) => {
              return (
                <div className="flex items-center mb-3 text-xs" key={index}>
                  <div className="mr-2 justify-center items-center flex h-6 w-6 rounded-full border border-[#002B5B] bg-[#D8EDF5]">
                    {index + 1}
                  </div>
                  <span className="">{item.dimension.dim_title}</span>
                </div>
              );
            })}
          </div>
        </div>
        <Link to={`/collection-product/${collectionId}/${collectionName}`}>
          <div className=" hidden md:flex p-6 py-2 w-56 md:absolute top-[500px] right-0 border rounded-full  items-center justify-center">
            <GoSearch className="mr-2"></GoSearch> Explore collection
          </div>
        </Link>
        <div>
          <div className="block md:flex items-center justify-center">
            <h4 className="uppercase text-xl md:text-3xl font-medium">
              {product?.p_name}
            </h4>
          </div>
        </div>
        <div className="mt-5 md:mb-3 h-56   md:h-[430px] lg:h-[500px] ">
          {headerImage?.endsWith(".mp4") ? (
            <div className="h-full md:w-[50vw] mx-auto">
              <VideoPlayer url={ImgBaseUrl(headerImage)}></VideoPlayer>
            </div>
          ) : (
            <img
              src={
                headerImage
                  ? ImgBaseUrl(headerImage)
                  : ImgBaseUrl(product?.p_pic)
              }
              alt="Product Image"
              className="h-full  object-contain"
            />
          )}
        </div>
        <div className="flex justify-end md:hidden ">
          <Link to={`/collection-product/${collectionId}/${collectionName}`}>
            <div className="flex mt-4 mb-2 mr-4 p-6 py-2 w-56 border rounded-full  items-center justify-center">
              <GoSearch className="mr-2"></GoSearch> Explore collection
            </div>
          </Link>
        </div>

        <div className="bg-[#f3f3f3] rounded-md px-10 py-4 md:px-[120px] md:mx-[100px] md:py-[24px]">
          {/* {JSON.stringify(images)} */}
          <SwiperWrapper
            prevClassName="w-[2rem] h-[2rem] md:w-[53px] md:h-[53px] md:text-2xl font-medium -translate-x-12 md:-translate-x-28"
            nextClassName="w-[2rem] h-[2rem] lg:w-[53px] lg:h-[53px] bg-opacity-50  md:text-2xl font-medium translate-x-12 md:translate-x-28"
            onNextClick={handleNext}
            onPrevClick={() => {
              handlePrev();
            }}
            swiperProps={{
              slidesPerView: 5,
              loop: false,
            }}
            showNavigation={true}
          >
            {images2?.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => handleImageClick(image?.image_url)}
                  className="cursor-pointer"
                >
                  <div
                    className={`lg:w-[170px] lg:h-[150px] h-[3rem] w-[3rem] bg-white mx-auto flex justify-center items-center rounded ${headerImage === image?.image_url
                      ? "border-2 border-primary"
                      : ""
                      }`}
                  >
                    {image?.image_url?.endsWith(".mp4") ? (
                      <div className="relative w-full h-full">
                        <video
                          src={ImgBaseUrl(image?.image_url)}
                          className="object-cover w-full h-full"
                        ></video>
                        <FaPlay className="absolute inset-0 m-auto" />
                      </div>
                    ) : (
                      <img
                        src={ImgBaseUrl(image?.image_url) + "?width=900"}
                        alt=""
                        className="object-cover md:object-contain w-full h-full"
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperWrapper>
        </div>
        {Product_Colors.length ?
          <div className="hidden mb-2 justify-center  md:flex">
            <div className="flex gap-4 items-center p-3 rounded-full bg-white border  md:absolute md:top-[500px]">
              Color: <span className="text-left">{productColor.color_name}</span>
              {Product_Colors.map(({ color }) => (
                <div onClick={() => { toggleColor(color) }} key={color.color_id} className="text-center cursor-pointer">
                  <div
                    style={{ backgroundColor: color.color_code }}
                    className={`h-6 w-6 rounded-full mx-auto ${color.color_name === productColor.color_name ? " border border-[#002B5B]  " : ""}`}
                  ></div>
                </div>
              ))}
            </div>
          </div> : null}
      </div>
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
              <div className="">
                <div className="flex items-center">
                  <img src={img7} alt="" className="md:w-[128px] mr-2" />
                  <p className="text-2xl font-medium">{product.p_name}</p>
                  <span className="ml-2 text-sm text-right text-gray-400">
                    {product?.quantity > 0
                      ? "(in stock ship within 72hours)"
                      : null}
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
                  <span className="text-[#DC2626] pl-[5px] font-medium">
                    A${cost?.product_sale_price}
                  </span>
                </p>
                <p
                  className="affirm-as-low-as text-base"
                  data-page-type="product"
                  data-amount="350400"
                >
                  and {find24()} Year Warranty
                </p>
              </div>

              <div className="flex mx-6 items-center gap-6 border border-[#bfbfbf] p-3 rounded-full cursor-pointer">
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
                className="bg-primary hover:bg-white text-white text-center hover:text-primary rounded-full btn btn-outline p-3 px-8 text-sm font-normal"
              >
                <p className="flex gap-2 items-center text-center">
                  <BsHandbagFill className="" /> Add to cart- A$
                  {cost?.product_sale_price}
                </p>
              </button>
            </div>
          </div>
          <div className="hidden md:flex gap-8 pt-4 justify-center">
            <div className="text-center cursor-pointer">
              <div className="h-8 w-24 mx-auto  bg-[#b2fce5] px-6 rounded-full overflow-hidden">
                <img src={afterPay} className="h-8 w-auto mx-auto scale-150" alt="" />
              </div>
              <p className="text-sm text-[#777] mt-2">pay in 4 up to $2000</p>
            </div>
            <div className="text-center cursor-pointer">
              <img src={zip} className="h-8 w-auto mx-auto" alt="" />
              <p className="text-sm text-[#777] mt-2">From $10/week</p>
            </div>

            <div className="text-center cursor-pointer pt-2">
              <img src={bPaypal} className="h-5 w-auto mx-auto" alt="" />
              <p className="text-sm text-[#777] mt-2">paypal in 4 </p>
            </div>

          </div>
          <div className="md:hidden">
            <div className="flex justify-between p-3 w-full">
              <div>
                <p className="price flex items-center">
                  <del className="text-[#ADACAC]">
                    A${cost?.product_regular_price}
                  </del>
                  <span className="text-[#DC2626] pl-[5px] font-medium">
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
                    {product?.quantity > 0
                      ? "(in stock ship within 72hours)"
                      : null}
                  </span>
                  and {find24()} Year Warranty
                </p>
              </div>
              <div className="md:hidden">
                <div className="flex items-center gap-4 p-2 ">
                  <p
                    className={`cursor-pointer ${quantity === 1 ? "text-gray-400 cursor-not-allowed" : ""
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
                    className={`cursor-pointer ${quantity === 1 ? "text-gray-400 cursor-not-allowed" : ""
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
            {Product_Colors.length ?
              <div className="p-1 my-2">
                <div className="p-4  rounded-md bg-white border">
                  Color: <span className="text-left">{productColor.color_name}</span>
                  <div className="flex gap-2 items-center mt-4">
                    {Product_Colors.map(({ color }) => (
                      <div onClick={() => { toggleColor(color) }} key={color.color_id} className="text-center cursor-pointer">
                        <div
                          style={{ backgroundColor: color.color_code }}
                          className={`h-6 w-6 rounded-full mx-auto ${color.color_name === productColor.color_name ? " border border-[#002B5B]  " : ""}`}
                        ></div>
                        {/* <p className="text-xs text-[#666666] font-normal">
                  {color.color_name}
                </p> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div> : null}
            <button
              onClick={handleAddToCart}
              className="bg-primary md:hidden  h-[50px] w-full hover:bg-white text-white text-center hover:text-primary rounded-full btn btn-outline p-2  text-sm "
            >
              <p className="flex gap-2 items-center text-center">
                <BsHandbagFill className="" /> Add to cart- A$
                {cost?.product_sale_price}
              </p>
            </button>
            <div className="md:hidden flex gap-4 pt-4 justify-center">
              <div className="text-center cursor-pointer">
                <div className="h-6 w-24 mx-auto  bg-[#b2fce5] px-6 rounded-full overflow-hidden">
                  <img src={afterPay} className="h-6 w-auto mx-auto scale-150" alt="" />
                </div>
                <p className="text-xs text-[#777] mt-2">pay in 4 up to $2000</p>
              </div>
              <div className="text-center cursor-pointer">
                <img src={zip} className="h-6 w-auto mx-auto" alt="" />
                <p className="text-xs text-[#777] mt-2">From $10/week</p>
              </div>
              <div className="text-center cursor-pointer pt-1">
                <img src={bPaypal} className="h-4 w-auto mx-auto" alt="" />
                <p className="text-xs text-[#777] mt-[10px]">paypal in 4</p>
              </div>
            </div>
            <div className="md:hidden">
              {/* <div className="border mt-4 p-4">
                <div className="mb-1 flex items-center">
                  <input type="radio" id="radio-2" className="radio text-xs mr-2" />
                  <label htmlFor="radio-2" className="text-black font-semibold cursor-pointer">Installation Services</label>
                  <div className="text-red-400 text-xs pl-8">
                    {"(Installation Coast $A80)"}
                  </div>
                </div>

              </div> */}
              <div className="border mt-4 mb-4 p-4">
                <div className="bg-[#EEEEEE] flex  items-stretch">
                  <div className="flex w-1/2 p-2">
                    <input type="text" className="h-full w-full inline-block" onChange={(e) => { postCodeChange(e.target.value) }} />
                  </div>
                  <button className="btn btn-primary rounded-none">Postage</button>
                  <div className="text-red-400 font-semibold pl-2 flex items-center">A${postCost}</div>
                </div>
              </div>
            </div>
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
          <div className="md:border rounded-lg md:flex justify-between flex-row-reverse mt-4 md:mt-6">
            <div className="md:p-4 md:w-1/6">
              <div className="font-bold mb-3 flex gap-2 items-center">
                <img src={img1} className="w-4 h-4 object-contain" alt="" />
                30 Days Free Returns
              </div>
              <div className="font-bold mb-3 flex gap-2 items-center">
                <img src={img2} className="w-4 h-4 object-contain" alt="" />
                Quick refund
              </div>
            </div>
            <div className="hidden md:flex w-1/2 border-l border-r p-4 px-24 justify-between">
              <div className="flex-1">
                {/* <div className="mb-1 flex items-center">
                  <input type="radio" id="radio-1" className="radio text-xs mr-2" />
                  <label htmlFor="radio-1" className="text-black font-semibold cursor-pointer">Installation Services</label>
                </div>
                <div className="text-red-400 text-xs pl-8">
                  Installation Coast $A80
                </div> */}
              </div>
              <div className="flex-1">
                <div className="text-black font-semibold mb-1 flex items-center gap-2">
                  <img src={imgPostPrice} className="w-5" alt="" />
                  <span> Quickly check postage</span>
                </div>
                <div className="bg-[#f0f0f0] p-2">
                  <input type="text" className="bg-[#f0f0f0] outline-none" onChange={(e) => { postCodeChange(e.target.value) }} />
                  <span className="text-[#7D7D7D] opacity-20 mx-2">|</span>
                  <span className="text-red-500 font-semibold">$A{postCost}</span>
                </div>
              </div>
            </div>
            <div className="md:p-4 md:w-1/3">
              <div className="md:flex gap-4 md:mb-3">
                <div className="mb-3 md:mb-0 text-sm flex gap-2 items-center">
                  <img src={img3} className="w-4 h-4 object-contain" alt="" />
                  Furniture Assemble: {product?.assemble ? "yes" : "no"}
                  <FaRegQuestionCircle className="cursor-pointer" onClick={() => { setVisible(true) }}></FaRegQuestionCircle>
                </div>
              </div>
              <div className="md:flex gap-4">
                <div className="mb-3 md:mb-0 text-sm flex gap-2 items-center">
                  <img src={img6} className="w-4 h-4 object-contain" alt="" />
                  Modular splicing design: {product?.modular ? "yes" : "no"}
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 text-center">
            <h4 className="text-2xl font-font leading-loose">Meet {product.collection_name}</h4>
            <p className="text-sm font-light">{product?.p_s_description}</p>
          </div>
          {/* video */}
          <div>
            <div className="hidden md:block w-full h-full">
              <div className="w-full h-[100vh]">
                <VideoPlayer url={video}></VideoPlayer>
              </div>
            </div>
            <div className="md:hidden w-full h-full">
              <div className="w-full h-[50vh]">
                <VideoPlayer url={video}></VideoPlayer>
              </div>
            </div>
          </div>
          <ImageSlider images={imagesInfo} />
          <div className="block lg:flex items-center gap-8 md:pt-4">
            <nav className="pt-4">
              <ul className="scrollbar-hidden flex overflow-auto md:px-2 md:gap-4 md:rounded-full gap-2 md:justify-between text-sm md:text-base font-normal text-center mb-2 md:mb-0 border-t border-b md:border-0 ">
                <li
                  onClick={() => changeCategory("dimension")}
                  className={`cursor-pointer box-border px-4 py-4 md:py-2 md:rounded-full text-sm md:text-base md:border border-primary ${category === "dimension" ? "md:bg-primary md:text-white  border-b-4" : " border-white md:border-primary"
                    } md:hover:text-white  md:hover:bg-primary  border-b-4 md:border-b-1`}
                >
                  Dimensions
                </li>
                <li
                  onClick={() => changeCategory("details")}
                  className={`cursor-pointer box-border whitespace-nowrap px-4 py-4 md:py-2 md:rounded-full text-sm md:text-base md:border border-primary ${category === "details" ? "md:bg-primary md:text-white border-b-4" : "border-white md:border-primary"
                    } md:hover:text-white  md:hover:bg-primary border-b-4 md:border-b-1`}
                >
                  Product details
                </li>
                <li
                  onClick={() => changeCategory("warranty")}
                  className={`cursor-pointer box-border whitespace-nowrap  px-4 py-4 md:py-2 md:rounded-full text-sm md:text-base md:border border-primary ${category === "warranty" ? "md:bg-primary md:text-white border-b-4" : "border-white md:border-primary"
                    } md:hover:text-white  md:hover:bg-primary border-b-4 md:border-b-1`}
                >
                  Warranty
                </li>
                <li
                  onClick={() => changeCategory("CareGuide")}
                  className={`cursor-pointer box-border whitespace-nowrap px-4 py-4 md:py-2 md:rounded-full text-sm md:text-base md:border border-primary ${category === "CareGuide" ? "md:bg-primary md:text-white border-b-4" : "border-white md:border-primary"
                    } md:hover:text-white  md:hover:bg-primary border-b-4 md:border-b-1`}
                >
                  Care Guide
                </li>
                <li
                  onClick={() => changeCategory("Shipping")}
                  className={`cursor-pointer box-border whitespace-nowrap px-4 py-4 md:py-2 md:rounded-full text-sm md:text-base md:border border-primary ${category === "Shipping" ? "md:bg-primary md:text-white border-b-4" : "border-white md:border-primary"
                    } md:hover:text-white  md:hover:bg-primary border-b-4 md:border-b-1`}
                >
                  Shipping
                </li>
                <li
                  onClick={() => changeCategory("Color")}
                  className={`cursor-pointer whitespace-nowrap px-4 py-4 md:py-2 md:rounded-full text-sm md:text-base md:border border-primary ${category === "Color" ? "md:bg-primary md:text-white border-b-4" : "border-white md:border-primary"
                    } md:hover:text-white  md:hover:bg-primary border-b-4 md:border-b-1 `}
                >
                  Color
                </li>
              </ul>
            </nav>

            <SocialShare />
          </div>
        </div>
        <div className={`modal modal-open ${visible ? "" : "hidden"}`}>
          <div className="modal-box max-w-[40rem] max-h-[70vh]">
            <h3 className="font-bold text-lg">Modular splicing design</h3>
            <p className="py-4">
              Brief Description of Outdoor Furniture Disassembly and Assembly
              <br />
              1、 Outdoor furniture that needs to be assembled
              Prepare tools and accessories:
              Prepare the product manual and necessary tools (such as screwdrivers, wrenches, etc.), and we will provide a screwdriver as a gift
              Check if all accessories are complete, without any missing or damaged parts.
              Reading the instruction manual:
              Carefully read the product manual to understand the assembly steps and precautions.
              Start assembly:
              According to the instructions, gradually assemble each component together.
              Pay attention to the direction and position of each component to ensure correct assembly.
              Tightening screws and inspection:
              Use a screwdriver or wrench to tighten the screws at the connections of each component.
              Check if all parts of the furniture are secure, without shaking or tilting.
              Completion and cleaning:
              After assembly, clean the site to ensure that no tools or accessories are missing.
              <br />
              2、 Notes:
              During assembly or installation, please pay attention to safety and avoid injury.
              If you encounter any problems or misunderstandings, please contact our customer service in a timely manner.
              Use appropriate tools for assembly to avoid damaging the product.
              I hope this brief disassembly and Color can help you better use our outdoor furniture. If you have any questions or need further assistance, please feel free to contact us at any time.
            </p>
            <div className="modal-action">
              <label
                htmlFor="my-modal"
                className="btn"
                onClick={() => {
                  setVisible(false)
                }}
              >
                Got it
              </label>
            </div>
          </div>
        </div>

        <div className={`modal modal-open ${afterPayVisible ? "" : "hidden"}`}>
          <div class="modal-box">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => { setAfterPayVisible(false) }}>✕</button>
            <div></div>
          </div>
        </div>
        <div className={`modal modal-open ${zipPayVisible ? "" : "hidden"}`}></div>
      </section>
    </div>
  );
};
export default DetailsSlider;
