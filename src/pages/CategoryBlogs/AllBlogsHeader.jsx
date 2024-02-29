import React from "react";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";

const AllBlogsHeader = (Category) => {
  console.log(Category);
  return (
    <header
      className="min-h-screen flex flex-col items-start justify-end p-8 md:p-20"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        backgroundImage: `url(${ImgBaseUrl(Category?.Category?.category_pic)})`,
        
      }}
    >
      <div className="border-b-4 border-white">
        <h1 className="text-2xl md:text-5xl text-white font-semibold uppercase">
          {Category?.Category?.category_name}
        </h1>
        <p className="pt-6 pb-2 text-white uppercase">
          {Category?.Category?.category_desc}
        </p>
      </div>
    </header>
  );
};

export default AllBlogsHeader;
