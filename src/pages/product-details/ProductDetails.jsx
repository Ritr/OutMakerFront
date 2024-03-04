import React, { useEffect, useState } from "react";
import DetailsSlider from "./DetailsSlider";
import Info from "./Info";
import Details from "./Details";
import Dimensions from "./Dimensions";
import Warranty from "./Warranty";
import CareGuide from "./CareGuide";
import Shipping from "./Shipping";
import mic from "../../assets/images/mic.png";
import { useLoaderData, useParams } from "react-router-dom";
import BuyerReview from "./BuyerReview";
import CartBar from "./CartBar";
import useCart from "../../Hooks/useCart";
import Meterials from "./ProductMaterials";
import ImageSlider from "./ImageSlider";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import NetWork from "../../shared/Network/Network";
import Faq from "./Faq";

const ProductDetails = () => {
  const [category, setCategory] = useState("dimension");
  const changeCategory = (payload) => setCategory(payload);
  const [showCartBar, setShowCartBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 设置当用户向下滚动超过一定像素（例如 300px）时显示 CartBar
      if (window.scrollY > 1880) {
        setShowCartBar(true);
      } else {
        setShowCartBar(false);
      }
    };

    // 添加滚动监听器
    window.addEventListener("scroll", handleScroll);

    // 清除监听器
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //single product data
  const receivedData = useLoaderData();
  const {
    Product,
    Product_Cost,
    Images,
    Contents,
    Secondary_Images,
    Single_Video,
    Dimensions: data,
    Comments_Replies,
    Product_Colors,
  } = receivedData;

  // console.log(Comments_Replies);

  return (
    <main className="relative w-full lg:max-w-[1600px] mx-auto pt-16 md:pt-0">
      <DetailsSlider
        product={Product}
        images={Images}
        dimensions={data}
        Product_Colors={Product_Colors}
      />
      <Info
        category={category}
        changeCategory={changeCategory}
        product={Product}
        video={Single_Video[0]?.video_url}
        poster={Single_Video[0]?.video_cover}
        cost={Product_Cost}
        images={Secondary_Images}
      />

      {category === "dimension" && data.length > 0 && (
        <Dimensions
          tpye={Product?.p_type}
          id={Product?.p_id}
          dimensions={data}
        />
      )}
      {category === "details" && (
        <Details
          changeCategory={changeCategory}
          product={Product}
          category={category}
          content={Contents}
          images={Secondary_Images}
        />
      )}
      {category === "warranty" && <Warranty product={Product} />}
      {category === "CareGuide" && <CareGuide product={Product} />}
      {category === "Shipping" && <Shipping product={Product} />}
      {/* <Weather /> */}
      {/* <Furniture /> */}
      {/* <Buyer /> */}
      {/* <ImageSlider images={Secondary_Images} /> */}
      {showCartBar && <CartBar product={Product} cost={Product_Cost} />}
      <Meterials />
      <NetWork />
      <BuyerReview reviews={Comments_Replies} product={Product} />
      <Faq />
      {/* to generate a rnadom number when user will land on this page */}
      <UserInitialization />
    </main>
  );
};

export default ProductDetails;
