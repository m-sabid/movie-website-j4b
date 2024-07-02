import React, { useState, useEffect } from "react";
import AllMovies from "@/components/pages/HomePage/AllMovies";
import MovieCategoryHeader from "@/components/shared/MovieCategoryHeader";
import AnimatedSkeleton from "@/components/shared/AnimatedSkeleton";

const IndividualIndustry = ({ industry, movieData, isLoading }) => {
  const itemsPerPage = 12;
  const [industryPage, setIndustryPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const industryMovies = movieData.filter(
    (movie) => movie.industry === industry.industryName
  );

  if (industryMovies.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(industryMovies.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleIndustryPageClick = (pageNumber) => {
    setLoading(true);
    setTimeout(() => {
      setIndustryPage(pageNumber);
      setLoading(false);
    }, 500); // simulate loading delay
  };

  const handlePreviousClick = () => {
    setLoading(true);
    setTimeout(() => {
      setIndustryPage((prevPage) => Math.max(prevPage - 5, 1));
      setLoading(false);
    }, 500); // simulate loading delay
  };

  const handleNextClick = () => {
    setLoading(true);
    setTimeout(() => {
      setIndustryPage((prevPage) => Math.min(prevPage + 5, totalPages));
      setLoading(false);
    }, 500); // simulate loading delay
  };

  const renderPageNumbers = () => {
    const startPage = Math.max(1, industryPage - 2);
    const endPage = Math.min(totalPages, industryPage + 2);
    const visiblePages = [];

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <div key={industry._id}>
      <MovieCategoryHeader
        title={industry.industryName}
        className="col-span-1 md:col-span-5"
      />
      <div className="md:px-5 px-2 grid grid-cols-2 md:grid-cols-6 gap-4">
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <div className="rounded-md" key={index}>
                <AnimatedSkeleton count={2} />
              </div>
            ))
          : industryMovies
              .slice(
                (industryPage - 1) * itemsPerPage,
                industryPage * itemsPerPage
              )
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
            <button
              className="join-item btn"
              onClick={handlePreviousClick}
              disabled={industryPage === 1}
            >
              Previous
            </button>
            {renderPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                className={`join-item btn ${
                  pageNumber === industryPage ? "bg-white text-black" : ""
                }`}
                onClick={() => handleIndustryPageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className="join-item btn"
              onClick={handleNextClick}
              disabled={industryPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualIndustry;
