import React, { useContext, useState, useEffect } from "react";
import { AllMoviesContext } from "@/providers/data/AllMoviesData";
import AnimatedSkeleton from "@/components/shared/AnimatedSkeleton";
import MovieCart from "@/components/shared/MovieCart";
import TypographyWrapper from "@/components/shared/TypographyWrapper";

const IndividualIndustry = ({ industry }) => {
  const { movies, fetchMoviesByIndustry, loading } =
    useContext(AllMoviesContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch movies and update pagination state
  useEffect(() => {
    const fetchData = async () => {
      const pagination = await fetchMoviesByIndustry(industry, page);

      if (pagination) {
        setTotalPages(pagination.totalPages); // Update totalPages from backend response
      }
    };
    fetchData();
  }, [industry, page]);

  // Handle page change (jump by 3 pages)
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Generate pagination buttons
  const generatePagination = () => {
    const buttons = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`md:px-3 px-2 py-1 border rounded ${
            i === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <TypographyWrapper>
      <div className="py-10 border-b-2 border-gray-400">
        <h2
          className="text-2xl md:px-10 font-bold mb-4 uppercase"
          id={`${industry}_movie`}
        >
          {industry}
        </h2>
        {loading[industry] ? (
          <AnimatedSkeleton count={10} />
        ) : movies[industry]?.length > 0 ? (
          <div className="grid md:px-10 mx-auto grid-cols-2 md:grid-cols-6 gap-4">
            {movies[industry].map((movie) => (
              <div key={movie._id} className="movie-card animate-zoom-in-out">
                <MovieCart movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No movies available.</p>
        )}

        <div className="flex md:px-10 justify-between items-center mt-4">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(page - 3)}
            className={`px-4 py-2 rounded ${
              page <= 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>

          {/* Pagination buttons */}
          <div className="flex gap-2">{generatePagination()}</div>

          {/* Next button */}
          <button
            onClick={() => handlePageChange(page + 3)}
            className={`px-4 py-2 rounded ${
              page >= totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </TypographyWrapper>
  );
};

export default IndividualIndustry;
