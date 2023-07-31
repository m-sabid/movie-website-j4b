"use client";

import Chart_MostDownloadedIndustry from "./AllChart/Chart_MostDownloadedIndustry";
import Chart_PaymentPerMonth from "./AllChart/Chart_PaymentPerMonth";
import Chart_UserPerMonth from "./AllChart/Chart_UserPerMonth";

const Charts = () => {
  return (
    <div className="bg-gray-300 p-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1">
          <div className="bg-white p-4 h-96">
            <h2 className="text-xl font-semibold text-center text-black border-b-2">
              User Per Month
            </h2>
            <Chart_UserPerMonth />
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white p-4 h-96">
            <h2 className="text-xl font-semibold text-center text-black border-b-2">
              Most Downloaded Industry
            </h2>
            <Chart_MostDownloadedIndustry />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-4">
            <h2 className="text-xl font-semibold text-center text-black border-b-2">
              Payment Per Month
            </h2>
            <Chart_PaymentPerMonth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
