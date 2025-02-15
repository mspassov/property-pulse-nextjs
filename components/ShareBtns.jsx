"use client";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

const ShareBtns = ({ property }) => {
  const shareURL = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share this property:
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton url={shareURL} hashtag="#PropertyPulse">
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareURL} hashtag="#PropertyPulse">
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={shareURL} hashtag="#PropertyPulse">
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton url={shareURL} subject={`${property.name} for rent`}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareBtns;
