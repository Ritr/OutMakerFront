import React from "react";
import {
  SlSocialTwitter,
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialFacebook,
  SlSocialPintarest,
} from "react-icons/sl";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
const SocialShare = () => {
  const url = window.location.href;

  return (
    <>
      <div className="flex items-center gap-2 md:gap-4 text-black md:py-4 md:pb-0 text-sm md:text-base">
        <p>Share On:</p>
        {/* social share */}
        <FacebookShareButton url={url} quote={"share on facebook"}>
          <div className="border-black rounded-full w-6 h-6 md:w-9 md:h-9 md:border md:p-2 bg-[#EDEDEF] md:bg-[#ffffff] hover:bg-primary hover:text-white cursor-pointer flex items-center justify-center">
            <SlSocialFacebook />
          </div>
        </FacebookShareButton>

        <TwitterShareButton url={url} title={"share on twitter"}>
          <div className="border-black rounded-full w-6 h-6 md:w-9 md:h-9 md:border md:p-2 bg-[#EDEDEF] md:bg-[#ffffff] hover:bg-primary hover:text-white cursor-pointer flex items-center justify-center">
            <SlSocialTwitter />
          </div>
        </TwitterShareButton>

        <LinkedinShareButton url={url}>
          <div className="border-black rounded-full w-6 h-6 md:w-9 md:h-9 md:border md:p-2 bg-[#EDEDEF] md:bg-[#ffffff] hover:bg-primary hover:text-white cursor-pointer flex items-center justify-center">
            <SlSocialLinkedin />
          </div>
        </LinkedinShareButton>

        <PinterestShareButton url={url} media={url}>
          <div className="border-black rounded-full w-6 h-6 md:w-9 md:h-9 md:border md:p-2 bg-[#EDEDEF] md:bg-[#ffffff] hover:bg-primary hover:text-white cursor-pointer flex items-center justify-center">
            <SlSocialPintarest />
          </div>
        </PinterestShareButton>
        {/* --- */}

        {/* <>
        <div className="border-primary rounded-full  w-6 h-6 md:w-9 md:h-9 border p-2 hover:bg-primary hover:text-white cursor-pointer">
          <SlSocialFacebook />
        </div>
        <div className="border-primary rounded-full  w-6 h-6 md:w-9 md:h-9 border p-2 hover:bg-primary hover:text-white cursor-pointer">
          <SlSocialTwitter />
        </div>
        <div className="border-primary rounded-full  w-6 h-6 md:w-9 md:h-9 border p-2 hover:bg-primary hover:text-white cursor-pointer">
          <SlSocialLinkedin />
        </div>
        <div className="border-primary rounded-full  w-6 h-6 md:w-9 md:h-9 border p-2 hover:bg-primary hover:text-white cursor-pointer">
          <SlSocialInstagram />
        </div>
        </> */}
      </div>
    </>
  );
};

export default SocialShare;
