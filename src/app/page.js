"use client";

import { useContext, useState } from "react";
import HeroSection from "@/components/pages/HomePage/HeroSection";
import SearchBarOnHeroSection from "@/components/pages/HomePage/SearchBarOnHeroSection";
import JoinTelegram from "@/components/shared/JoinTelegram";
import { AllMoviesContext } from "@/providers/data/AllMoviesData";
import MainNav from "@/components/pages/HomePage/MainNav";
import { ThemeContext } from "@/providers/colors/GlobalColors";
import IndividualIndustry from "@/components/pages/HomePage/IndividualIndustry";
import NoData from "@/components/shared/NoData";
import SocialLinksForHeroSection from "@/components/pages/HomePage/SocialLinksForHeroSection";
import SecondaryNav from "@/components/pages/HomePage/SecondaryNav";
import RecentMovieSlider from "@/components/pages/HomePage/RecentMovieSlider";
import MostWatchedSlider from "@/components/pages/HomePage/MostWatchedSlider";
import ForYouSlider from "@/components/pages/HomePage/ForYouSlider";
import HowToDownload from "@/components/pages/HomePage/HowToDownload";
import MovieCart from "@/components/shared/MovieCart";
import FilterMovie from "@/components/pages/HomePage/FilterMovie";

export default function Home() {
  const { colors } = useContext(ThemeContext);
  const { industries, searchResults, searchLoading } =
    useContext(AllMoviesContext);
  return (
    <>
      <div className="min-h-screen max-w-full ">
        <MainNav />
        <HeroSection />
        <div className="absolute text-center mt-20 w-full">
          <SearchBarOnHeroSection />
        </div>
        <div className="absolute w-full bottom-0">
          <div className="md:pb-0 pb-24">
            <JoinTelegram />
          </div>
          <div className="md:flex">
            <SocialLinksForHeroSection />
          </div>
          <SecondaryNav />
        </div>
      </div>

      {/* Search Results or Default Content */}
      {/* Search Results or Default Content */}
      <div
        id="all_movies"
        className="container mx-auto p-4"
        style={{ backgroundColor: colors.mo_primary }}
      >
        {searchResults && searchResults.length > 0 ? (
          // Show search results only
          <div className="grid px-10 mx-auto grid-cols-2 md:grid-cols-4 gap-4">
            {searchResults.map((result, index) => (
              <div key={result._id}>
                <MovieCart movie={result} />
              </div>
            ))}
          </div>
        ) : searchLoading ? (
          // Loading state with no results
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : (
          // Default content when no search results or search query
          <div
            className="mx-auto pb-8"
            style={{ backgroundColor: colors.mo_primary }}
          >
            <div
              className="container mx-auto"
              style={{ backgroundColor: colors.mo_primary }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-5 p-2 md:p-8">
                <div className="md:col-span-3 h-[60vh] rounded-lg overflow-hidden">
                  <RecentMovieSlider />
                </div>
                <div className="md:col-span-3 h-[60vh] rounded-lg overflow-hidden">
                  <MostWatchedSlider />
                </div>
                <div className="md:col-span-3 h-[60vh] rounded-lg overflow-hidden">
                  <ForYouSlider />
                </div>
                <div className="md:col-span-3 h-[60vh] rounded-lg overflow-hidden">
                  <HowToDownload />
                </div>
              </div>
            </div>
            {/* Filter */}
            <FilterMovie />
            {industries.length > 0 ? (
              industries.map((industry) => (
                <IndividualIndustry key={industry} industry={industry} />
              ))
            ) : (
              <NoData message="No data found" />
            )}
          </div>
        )}
      </div>
    </>
  );
}
