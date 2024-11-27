"use client";

import { useContext } from "react";
import Chart_MostDownloadedIndustry from "./AllChart/Chart_MostDownloadedIndustry";
import Chart_PaymentPerMonth from "./AllChart/Chart_PaymentPerMonth";
import Chart_UserPerMonth from "./AllChart/Chart_UserPerMonth";
import { ThemeContext } from "@/providers/colors/GlobalColors";
import TypographyWrapper from "../shared/TypographyWrapper";

const Charts = () => {
  const { colors } = useContext(ThemeContext);
  return (
    <TypographyWrapper>
      <div className="p-3" style={{ backgroundColor: colors.mo_primary }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <div
              className="p-4 h-96 shadow-md"
              style={{ backgroundColor: colors.mo_db_primary }}
            >
              <h2 className="text-xl font-semibold text-center text-black border-b-2">
                User Per Month
              </h2>
              <Chart_UserPerMonth />
            </div>
          </div>

          <div className="md:col-span-1">
            <div
              className=" shadow-md p-4 h-96"
              style={{ backgroundColor: colors.mo_db_primary }}
            >
              <h2 className="text-xl font-semibold text-center text-black border-b-2">
                Most Downloaded Industry
              </h2>
              <Chart_MostDownloadedIndustry />
            </div>
          </div>

          <div className="md:col-span-2">
            <div
              className="p-4 shadow-md"
              style={{ backgroundColor: colors.mo_db_primary }}
            >
              <h2 className="text-xl font-semibold text-center text-black border-b-2">
                Payment Per Month
              </h2>
              <Chart_PaymentPerMonth />
            </div>
          </div>
        </div>
      </div>
    </TypographyWrapper>
  );
};

export default Charts;
