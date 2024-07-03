"use client";

import React, { useContext, useEffect, useState } from "react";
import HeroSection from "@/components/pages/HomePage/HeroSection";
import HowToDownload from "@/components/pages/HomePage/HowToDownload";
import RecentMovieSlider from "@/components/pages/HomePage/RecentMovieSlider";
import SearchBarOnHeroSection from "@/components/pages/HomePage/SearchBarOnHeroSection";
import SecondaryNav from "@/components/pages/HomePage/SecondaryNav";
import SocialLinksForHeroSection from "@/components/pages/HomePage/SocialLinksForHeroSection";
import JoinTelegram from "@/components/shared/JoinTelegram";
import { AllMoviesContext } from "@/providers/data/AllMoviesData";
import MainNav from "@/components/pages/HomePage/MainNav";
import IndividualIndustry from "@/components/pages/HomePage/IndividualIndustry";
import AnimatedSkeleton from "@/components/shared/AnimatedSkeleton";
import MostWatchedSlider from "@/components/pages/HomePage/MostWatchedSlider";
import ForYouSlider from "@/components/pages/HomePage/ForYouSlider";

export default function Home() {
  const { movieData, filmIndustries } = useContext(AllMoviesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [movieData]);

  const handleSearch = (searchValue) => {
    const results = searchValue
      ? movieData.filter((movie) =>
          movie.movieName.toLowerCase().includes(searchValue.toLowerCase())
        )
      : [];

    setSearchResults(results);
    setShowNoResults(results.length === 0 && searchValue !== "");
  };

  const movieIndustries = movieData.map((movie) => movie.industry);

  const matchingIndustries = filmIndustries.filter((industry) => {
    return movieIndustries.some(
      (movieIndustry) => movieIndustry === industry.industryName
    );
  });

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
          <div className="md:flex">
            <SocialLinksForHeroSection />
          </div>
          <SecondaryNav onSearch={handleSearch} />
        </div>
      </div>

      <div className="bg-gray-500 mx-auto min-h-screen pb-8 mt-[-20px]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-5 p-2 md:p-8">
            <div className="md:col-span-3 h-[60vh] rounded-lg md:h-[60vh] overflow-hidden">
              <RecentMovieSlider />
            </div>
            <div className="md:col-span-3 h-[60vh] rounded-lg md:h-[60vh] overflow-hidden">
              <MostWatchedSlider />
            </div>
            <div className="md:col-span-3 h-[60vh] rounded-lg md:h-[60vh] overflow-hidden">
              <ForYouSlider />
            </div>
            <div className="md:col-span-3 h-[60vh] rounded-lg md:h-[60vh] overflow-hidden">
              <HowToDownload />
            </div>
          </div>

          {showNoResults ? (
            <p>No movie found.</p>
          ) : matchingIndustries?.length > 0 ? (
            matchingIndustries?.map((industry) => {
              const industryMovies =
                searchResults.length > 0
                  ? searchResults.filter(
                      (movie) => movie.industry === industry.industryName
                    )
                  : movieData.filter(
                      (movie) => movie.industry === industry.industryName
                    );
              return (
                <IndividualIndustry
                  key={industry._id}
                  industry={industry}
                  movieData={industryMovies}
                  isLoading={isLoading}
                />
              );
            })
          ) : (
            <div>
              <AnimatedSkeleton count={10} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
