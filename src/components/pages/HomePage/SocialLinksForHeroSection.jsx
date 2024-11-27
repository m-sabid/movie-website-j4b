import TypographyWrapper from "@/components/shared/TypographyWrapper";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const SocialMediaData = [
  {
    name: "Facebook",
    icon: <FaFacebook />,
    link: "https://www.facebook.com/example",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    link: "https://www.twitter.com/example",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/example",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/example",
  },
  // Add more social media data items as needed
];

const SocialLinksForHeroSection = () => {
  return (
    <div className="container mb-20 mx-auto flex gap-1 justify-center items-center ">
      {SocialMediaData.map((item, index) => (
        <TypographyWrapper key={index}>
          <Link
            href="/"
            className="flex flex-wrap flex-col items-center md:mx-2 hover:bg-gray-100 hover:bg-opacity-25 hover:rounded-md md:p-4"
          >
            <p className="bg-blue-300 text-black p-2 rounded-md text-center inline-block">
              {item.icon}
            </p>
            <p className="hidden md:block text-white">{item.name}</p>
          </Link>
        </TypographyWrapper>
      ))}
    </div>
  );
};

export default SocialLinksForHeroSection;
