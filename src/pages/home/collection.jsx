import React from "react";
import { BsArrowRight } from "react-icons/bs";
import loungeVactor from "../../assets/images/loungeVactor.png";
import Button from "../../shared/Button/Button";
import { Link } from "react-router-dom";
import useCollections from "../../Hooks/useCollections";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";

const Collection = () => {
  const { collections } = useCollections();
  return (
    <section className="w-full py-10 pl-5 pr-5 md:py-20">
      <div>
        <div className="flex justify-between items-center">
          <div className="basis-2/3">
            <h1 className="text-2xl md:text-4xl font-semibold">
              Our Popular Collection
            </h1>
          </div>
          <Link
            to="/collections"
            className="flex items-center text-primary text-sm font-semibold cursor-pointer justify-end text-end"
          >
            View All
            <BsArrowRight className="ms-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {collections?.slice(0, 6).map((collection) => (
            <div
              key={collection?.collection_id}
              className="block group  items-center justify-between rounded-md my-2 lg:mt-[38px] hover:bg-[#303030] hover:bg-opacity-20 hover:p-6 hover:shadow-custom pb-6"
            >
              <img
                className="img w-full h-full object-cover lg:h-[375px] mb-6 rounded-md group-hover:h-[351px]"
                src={ImgBaseUrl(collection?.collection_pic)}
                alt=""
              />
              <div className=" flex justify-between items-center mb-5 text-xl font-semibold">
                {collection?.collection_name}
                <Link
                  to={`/collection-product/${collection?.collection_id}/${collection?.collection_name}`}
                >
                  <span className="flex items-center text-sm opacity-0 group-hover:opacity-100 transition duration-3000 ease-in">
                    Explore <BsArrowRight className="ms-2" />
                  </span>
                </Link>
                {/* <Button className="btn btn-primary rounded-full text-white hover:text-primary hover:bg-white capitalize">
                    Explore <BsArrowRight className="ms-2" />
                  </Button> */}
              </div>
              <div className="text-sm">{collection?.collection_desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
