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
      <div className="flex items-center gap-4 text-black pt-4 pb-4 md:pb-0">
        <p>Share On:</p>
        {/* social share */}
        <FacebookShareButton url={url} quote={"share on facebook"}>
          <div className="border-black rounded-full w-9 h-9 border-[1px] p-2 hover:bg-primary hover:text-white cursor-pointer">
            <SlSocialFacebook />
          </div>
        </FacebookShareButton>

        <TwitterShareButton url={url} title={"share on twitter"}>
          <div className="border-black rounded-full w-9 h-9 border-[1px] p-2 hover:bg-primary hover:text-white cursor-pointer">
            <SlSocialTwitter />
          </div>
        </TwitterShareButton>

        <LinkedinShareButton url={url}>
          <div className="border-black rounded-full w-9 h-9 border-[1px] p-2 hover:bg-primary hover:text-white cursor-pointer">
            <SlSocialLinkedin />
          </div>
        </LinkedinShareButton>

        <PinterestShareButton url={url} media={url}>
          <div className="border-black rounded-full w-9 h-9 border-[1px] p-2 hover:bg-primary hover:text-white cursor-pointer">
            <SlSocialPintarest />
          </div>
        </PinterestShareButton>
        {/* --- */}

        {/* <>
        <div className="border-primary rounded-full w-9 h-9 border-[1px] p-2 hover:bg-primary hover:text-white cursor-pointer">
          <SlSocialFacebook />
        </div>
        <div className="border-primary rounded-full w-9 h-9 border-[1px] p-2 hover:bg-primary hover:text-white cursor-pointer">
          <SlSocialTwitter />
        </div>
        <div className="border-primary rounded-full w-9 h-9 border-[1px] p-2 hover:bg-primary hover:text-white cursor-pointer">
          <SlSocialLinkedin />
        </div>
        <div className="border-primary rounded-full w-9 h-9 border-[1px] p-2 hover:bg-primary hover:text-white cursor-pointer">
          <SlSocialInstagram />
        </div>
        </> */}
      </div>
    </>
  );
};

export default SocialShare;
