import React from "react";
import Button from "../../shared/Button/Button";
import {
  TiSocialFacebook,
  TiSocialPinterest,
  TiSocialLinkedin,
  TiSocialInstagram,
} from "react-icons/ti";

function formatDateTime(isoDateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    new Date(isoDateString)
  );
  return formattedDate;
}

const BlogHeader = (data) => {
  return (
    <header className="py-10">
      <div className="flex justify-center gap-6 md:gap-24">
        <Button className="btn btn-primary rounded-full text-white hover:text-primary hover:bg-white border-2 px-8 md:px-12">
          OUTDOOR
        </Button>
        <Button className="btn btn-primary rounded-full text-white hover:text-primary hover:bg-white border-2 px-10 md:px-16">
          LIVING
        </Button>
      </div>

      <h2 className="text-center text-primary font-normal text-xl md:text-5xl py-7 md:py-10 leading-normal border-b-4 border-primary">
        {data.data.post_title}
      </h2>

      <div className="flex justify-center gap-6 pt-7 md:pt-10 text-primary font-semibold">
        <div className="w-1 bg-[#002B5B]"></div>
        <p>{formatDateTime(data.data.updated_at)}</p>
        <div className="w-1 bg-[#002B5B]"></div>
        {/* <p>By Kelly Bill</p> */}
      </div>

      <div className="flex justify-center gap-4 pt-7 md:pt-10">
        <span className="bg-primary p-1 rounded-full">
          <TiSocialFacebook size={30} color="white" />
        </span>
        <span className="bg-primary p-1 rounded-full">
          <TiSocialLinkedin size={30} color="white" />
        </span>
        <span className="bg-primary p-1 rounded-full">
          <TiSocialInstagram size={30} color="white" />
        </span>
        <span className="bg-primary p-1 rounded-full">
          <TiSocialPinterest size={30} color="white" />
        </span>
      </div>
    </header>
  );
};

export default BlogHeader;
