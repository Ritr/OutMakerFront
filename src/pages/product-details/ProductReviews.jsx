import React, { useState } from "react";
import img from "../../assets/images/review-user-1.png";
import reviewImg from "../../assets/images/review-img1.png";
import { Rating } from "@smastrom/react-rating";
import SocialShare from "../../components/SocialShare/SocialShare";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";

const ProductReviews = ({ reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(5);
  const totalReviews = reviews.length;

  function formatDate(inputDate) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(inputDate);
    return date.toLocaleDateString(undefined, options);
  }

  const loadMoreReviews = () => {
    // Increase the number of visible reviews
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 5);
  };

  // console.log(reviews);
  return (
    <>
      {/* container */}
      {reviews?.slice(0, visibleReviews)?.map((review) => (
        <div key={review?.comment?.comment_id}>
          {/* image container */}
          <div className=" px-8 lg:px-5 py-7 border rounded-xl mb-8 w-full">
            {/* <div className="flex flex-col lg:flex-row gap-5 px-8 lg:px-5 py-7 border rounded-xl mb-8 w-full"> */}
            {/* <div className="lg:w-1/6 rounded-full">
              <img src={img} alt="" className="object-cover w-[60px] h-[60px] " />
            </div> */}
            {/* text container */}
            <div className="space-y-[20px] text-primary ">
              <div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                  <h4 className="text-lg  text-black">
                    {review?.comment?.user_name}
                  </h4>
                </div>
                {/* ratings container */}
                <div className="flex flex-row items-center gap-5 ">
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={review?.comment?.rating}
                    readOnly
                  />
                  <p className="text-xl text-black">
                    {review?.comment?.rating}
                  </p>
                </div>
              </div>
              <p className="text-xl text-black">
                {review?.comment?.title}
              </p>
              <p className="text-black text-sm">{review?.comment?.comment}</p>
              <div className="flex flex-wrap gap-4">
                {review?.comment_images?.map((image) => (
                  <img
                    key={image.id}
                    src={ImgBaseUrl(image.image_url)}
                    alt={`Review Image ${image.id}`}
                    className="w-full md:w-auto h-[152px] object-cover rounded-md shadow-lg"
                  />
                ))}
              </div>
              {/* share and date  */}
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                <SocialShare />
                <p className="text-black">
                  {formatDate(review?.comment?.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {visibleReviews < totalReviews && (
        <div className="text-center mt-4">
          <button
            className="bg-primary text-white py-2 px-4 rounded-lg"
            onClick={loadMoreReviews}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default ProductReviews;
