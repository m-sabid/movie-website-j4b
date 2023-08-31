// IndividualIndustry.js
import React, { useState } from "react";
import AllMovies from "@/components/pages/HomePage/AllMovies";
import MovieCategoryHeader from "@/components/shared/MovieCategoryHeader";
import AnimatedSkeleton from "@/components/shared/AnimatedSkeleton";

const IndividualIndustry = ({ industry, movieData, isLoading }) => {
  const itemsPerPage = 10;
  const [industryPage, setIndustryPage] = useState(1);

  const industryMovies = movieData.filter(
    (movie) => movie.industry === industry.industryName
  );

  if (industryMovies.length === 0) {
    // If there are no movies for this industry, return null (don't render anything)
    return null;
  }

  const totalPages = Math.ceil(industryMovies.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleIndustryPageClick = (pageNumber) => {
    setIndustryPage(pageNumber);
  };

  return (
    <div key={industry._id}>
      <MovieCategoryHeader
        title={industry.industryName}
        className="col-span-1 md:col-span-5"
      />
      <div className="md:px-5 px-2 grid grid-cols-1 md:grid-cols-5 gap-4">
        {industryMovies
          .slice((industryPage - 1) * itemsPerPage, industryPage * itemsPerPage)
          .map((movie, index) => (
            <div className="rounded-md" id="all_movies" key={index}>
              {isLoading ? (
                <AnimatedSkeleton count={1} />
              ) : (
                <AllMovies movie={movie} />
              )}
            </div>
          ))}
      </div>
      {industryMovies.length > itemsPerPage && (
        <div className="flex w-full justify-center my-3">
          <div className="join">
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`join-item btn ${
                  pageNumber === industryPage ? "btn-black" : ""
                }`}
                onClick={() => handleIndustryPageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualIndustry;
