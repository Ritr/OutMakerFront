import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import ProductReviews from "./ProductReviews";
import ProductQuestions from "./ProductQuestions";
import WriteReview from "./WriteReview";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import test from "../../assets/test.jpg";

const BuyerReview = ({ reviews, product }) => {
  const id = product.p_id;
  const [isReview, setIsReview] = useState(true);
  const [toggleWriting, setToggleWriting] = useState(null);
  const [ProductMaterials, setProductMaterials] = useState([]);
  const handleToggleReview = (item) => {
    setToggleWriting(null);
    if (item === "reviews") {
      setIsReview(true);
    } else {
      setIsReview(false);
    }
  };

  useEffect(() => {
    fetch(`https://theoutmaker.com/api/get/product/single/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductMaterials(data.Product_Materials);
      });
  }, []);

  // console.log(reviews);
  return (
    <section className="w-full p-4 md:p-10">
      {/* <img src={test} alt="" />
      <br></br>
      <img src={test} alt="" /> */}
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold uppercase text-primary mb-10">
        Buyers review and question
      </h3>
      {/* buttons */}
      <div className="flex flex-col md:flex-row items-center gap-5 mb-10">
        <div className="flex items-center gap-5">
          <button
            onClick={() => handleToggleReview("reviews")}
            className={`btn ${
              isReview ? "btn-primary text-white" : "btn-outline text-primary"
            } rounded-full normal-case `}
          >
            Buyers Review
          </button>
          <button
            onClick={() => handleToggleReview("question")}
            className={`btn ${
              !isReview ? "btn-primary text-white" : "btn-outline text-primary"
            } rounded-full normal-case `}
          >
            Questions
          </button>
        </div>
        {/* divider */}
        <div className=" hidden md:block h-8 w-[2px] bg-primary rounded-xl"></div>
        {/* button with icon */}
        <div>
          <button
            onClick={() => setToggleWriting(true)}
            className="btn btn-primary rounded-full normal-case text-white"
          >
            <LiaEditSolid className="text-xl" />
            {isReview ? (
              <span>Write a Review</span>
            ) : (
              <span>Asked a Question</span>
            )}
          </button>
        </div>
      </div>
      <div className={`${toggleWriting ? "hidden" : "block"}`}>
        {isReview ? <ProductReviews reviews={reviews} /> : <ProductQuestions />}
      </div>
      {toggleWriting && (
        <WriteReview isReviw={isReview ? true : false} id={id} />
      )}
      {/* to generate a rnadom number when user will land on this page */}
      <UserInitialization />
    </section>
  );
};

export default BuyerReview;
