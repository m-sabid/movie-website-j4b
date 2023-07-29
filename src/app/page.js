"use client";
import React, { useState, useContext, useEffect } from "react";
import AllMovies from "@/components/pages/HomePage/AllMovies";
import HeroSection from "@/components/pages/HomePage/HeroSection";
import HowToDownload from "@/components/pages/HomePage/HowToDownload";
import RecentMovieSlider from "@/components/pages/HomePage/RecentMovieSlider";
import SearchBarOnHeroSection from "@/components/pages/HomePage/SearchBarOnHeroSection";
import SecondaryNav from "@/components/pages/HomePage/SecondaryNav";
import SocialLinksForHeroSection from "@/components/pages/HomePage/SocialLinksForHeroSection";
import JoinTelegram from "@/components/shared/JoinTelegram";
import MovieCategoryHeader from "@/components/shared/MovieCategoryHeader";
import { AllMoviesContext } from "@/providers/data/AllMoviesData";
import MainNav from "@/components/pages/HomePage/MainNav";

export default function Home() {
  const { movieData, filmIndustries } = useContext(AllMoviesContext);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false); // New state to track if no results found

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  useEffect(() => {
    setIsLoading(false);
  }, [movieData]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setIsLoading(true);
    setIsLoading(false);
  };

  const handleSearch = (searchValue) => {
    const results = searchValue
      ? movieData.filter((movie) =>
          movie.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : [];

    setSearchResults(results);
    setCurrentPage(1);
    setShowNoResults(results.length === 0 && searchValue !== ""); // Set showNoResults based on the length of results and non-empty searchValue
  };

  let moviesToShow;
  if (searchResults.length > 0) {
    moviesToShow = searchResults?.slice(startIdx, endIdx);
  } else {
    moviesToShow = movieData?.slice(startIdx, endIdx);
  }

  const totalMovies = searchResults.length || movieData?.length;
  const totalPages = Math.ceil(totalMovies / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      <div className="min-h-screen max-w-full ">
        <MainNav />
        <HeroSection />
        <div className="absolute text-center mt-20 w-full">
          <SearchBarOnHeroSection onSearch={handleSearch} />
        </div>
        <div className="absolute w-full bottom-0">
          <div className="md:pb-0 pb-24">
            <JoinTelegram />
          </div>
          <div className="hidden md:flex">
            <SocialLinksForHeroSection />
          </div>
          <SecondaryNav onSearch={handleSearch} />          
        </div>
      </div>

      <div className="container bg-gray-200 mx-auto min-h-screen pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-5 p-2 md:p-8">
          <div className="md:col-span-3 h-[50vh] md:h-[50vh] overflow-hidden">
            <RecentMovieSlider />
          </div>
          <div className="md:col-span-1 h-[50vh] md:h-[50vh] overflow-hidden">
            <HowToDownload />
          </div>
        </div>

        {filmIndustries?.map((industry, index) => (
          <div key={index}>
            <MovieCategoryHeader
              title={industry}
              className="col-span-1 md:col-span-5"
            />
            <div className="md:px-5 px-2 grid grid-cols-1 md:grid-cols-5 gap-4">
              {showNoResults ? (
                <p>No movie found.</p>
              ) : (
                moviesToShow.map((movie, index) => (
                  <div className="rounded-md" key={index}>
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      <AllMovies movie={movie} searchResults={searchResults} />
                    )}
                  </div>
                ))
              )}
            </div>
            {totalPages > 1 && (
              <div className="flex w-full justify-center my-3">
                <div className="join">
                  {pageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`join-item btn ${
                        pageNumber === currentPage ? "btn-black" : ""
                      }`}
                      onClick={() => handlePageClick(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
