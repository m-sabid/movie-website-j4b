import TypographyWrapper from "@/components/shared/TypographyWrapper";
import React from "react";

export default function Loading() {
  return (
    <TypographyWrapper>
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>
    </TypographyWrapper>
  );
}
