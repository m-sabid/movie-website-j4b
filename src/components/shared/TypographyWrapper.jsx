"use client";

import { ThemeContext } from "@/providers/colors/GlobalColors";
import { useContext } from "react";

const TypographyWrapper = ({ children }) => {
  const { typography } = useContext(ThemeContext);

  return (
    <div
      style={{
        fontFamily: typography.fontFamily,
        fontSize: typography.primaryFontSize,
        fontWeight: typography.fontWeightNormal,
      }}
    >
      {children}
    </div>
  );
};

export default TypographyWrapper;
