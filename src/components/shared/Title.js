"use client";

import { ThemeContext } from "@/providers/colors/GlobalColors";
import { useContext } from "react";

function Title() {
  const { siteInfo, isLoading } = useContext(ThemeContext);

  console.log("Site Info in Title Component:", siteInfo);

  if (isLoading) {
    return <title>Loading...</title>;
  }

  return <title>{siteInfo?.siteName || "Movie Site "}</title>;
}

export default Title;
