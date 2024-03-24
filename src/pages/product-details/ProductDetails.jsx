import React, { useEffect, useState } from "react";
import DetailsSlider from "./DetailsSlider";
import Info from "./Info";
import Details from "./Details";
import Dimensions from "./Dimensions";
import Warranty from "./Warranty";
import CareGuide from "./CareGuide";
import Shipping from "./Shipping";
import mic from "../../assets/images/mic.png";
import { useLoaderData, useParams, Link } from "react-router-dom";
import BuyerReview from "./BuyerReview";
import CartBar from "./CartBar";
import useCart from "../../Hooks/useCart";
import Materials from "./ProductMaterials";
import ImageSlider from "./ImageSlider";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import NetWork from "../../shared/Network/Network";
import Faq from "./Faq";
import useCollections from "../../Hooks/useCollections";
import SwiperWrapper from "../../components/SwiperWrapper";
import { SwiperSlide } from "swiper/react";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
const ProductDetails = () => {
  const [category, setCategory] = useState("dimension");
  const changeCategory = (payload) => setCategory(payload);
  const [showCartBar, setShowCartBar] = useState(false);
  const { collections } = useCollections();
  const [collectionId, setCollectionId] = useState();
  const [collectionName, setCollectionName] = useState();
  const exploreRange = () => {
    let collectionId = Product.p_collection;
    let collection = collections.find((item) => {
      return item.collection_id === collectionId;
    });
    let collectionName = collection.collection_name;
    setCollectionId(collectionId);
    setCollectionName(collectionName);
  };
  useEffect(() => {
    const handleScroll = () => {
      // 设置当用户向下滚动超过一定像素（例如 300px）时显示 CartBar

      if (document.querySelector("#root").scrollTop > 1880) {
        setShowCartBar(true);
      } else {
        setShowCartBar(false);
      }
    };

    // 添加滚动监听器

    document.querySelector("#root").addEventListener("scroll", handleScroll);

    // 清除监听器
    return () =>
      document
        .querySelector("#root")
        .removeEventListener("scroll", handleScroll);
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
    Product_Materials,
  } = receivedData;
  useEffect(() => {
    if (collections.length && Product) {
      exploreRange();
    }
  }, [collections, Product]);

  // console.log(Comments_Replies);

  return (
    <main className="relative w-full lg:max-w-[1600px] mx-auto ">
      <DetailsSlider
        product={Product}
        images={Images}
        dimensions={data}
        Product_Colors={Product_Colors}
        collectionId={collectionId}
        collectionName={collectionName}
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
      {Product_Materials.length && (
        <Materials productMaterials={Product_Materials} />
      )}
      <NetWork />
      <BuyerReview reviews={Comments_Replies} product={Product} />
      <div className="">
        <div className="mb-2 md:mb-4 text-center md:text-left color-[#181818] text-2xl font-medium">
          Other Collections
        </div>
        <SwiperWrapper
          showNavigation={true}
          swiperProps={{
            loop: false,
            spaceBetween: 10,
            breakpoints: {
              375: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
              },
            },
          }}
        >
          {collections.map((collection) => {
            return (
              <SwiperSlide className="h-full">
                <div className="relative">
                  <Link
                    to={`/collection-product/${collection?.collection_id}/${collection?.collection_name}`}
                    className="text-xl md:text-2xl lg:text-3xl"
                  >
                    <div className=" w-full flex items-center justify-center">
                      <img
                        src={
                          ImgBaseUrl(collection?.collection_pic) + "?width=600"
                        }
                        alt="IMAGE"
                        className="max-h-full h-32 md:h-[248px] max-w-full rounded object-cover"
                      />
                    </div>
                    <div className=" font-medium md:text-md absolute z-10 text-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                      {collection?.collection_name}
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperWrapper>
      </div>
      {/* <div className="p-4 md:p-10">
        <Link to={`/collection-product/${collectionId}/${collectionName}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-lg">
            Explore The Range
          </button>
        </Link>
      </div> */}
      <Faq />
      {/* to generate a rnadom number when user will land on this page */}
      <UserInitialization />
    </main>
  );
};

export default ProductDetails;
