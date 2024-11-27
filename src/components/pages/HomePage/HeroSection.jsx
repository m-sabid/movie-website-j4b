import TypographyWrapper from "@/components/shared/TypographyWrapper";
import React from "react";

const HeroSection = () => {
  return (
    <TypographyWrapper>
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage:
            "url(https://i0.wp.com/www.irishfilmcritic.com/wp-content/uploads/2021/07/TSR.jpg?fit=1392%2C696&ssl=1)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <div className="relative z-10 min-h-screen bg-black bg-opacity-50"></div>
      </div>
    </TypographyWrapper>
  );
};

export default HeroSection;
