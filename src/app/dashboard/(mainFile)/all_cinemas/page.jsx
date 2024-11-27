"use client";

import { useContext, useEffect, useState } from "react";
import DashboardMovieCard from "@/components/shared/DashboardMovieCard";
import base_url from "@/providers/links/BASE_URL";
import axios from "axios";
import Swal from "sweetalert2";
import DashboardHeader from "@/components/dashboard/shared/DashboardHeader";
import { ThemeContext } from "@/providers/colors/GlobalColors";
import TypographyWrapper from "@/components/shared/TypographyWrapper";


const AllCinemas = () => {
  const { colors, typography } = useContext(ThemeContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [movieData, setMovieData] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Filters state
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [industry, setIndustry] = useState("");

  const [filterItems, setFilterItems] = useState([
    { label: "Release Year", options: [] },
    { label: "Genre", options: [] },
    { label: "Industry", options: [] },
  ]);

  // Fetch movies with pagination, search query, and filters
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);

      try {
        let response;
        const params = {
          page: currentPage,
          limit: itemsPerPage,
          movieName: searchQuery,
          releaseYear,
          genre,
          industry,
        };

        if (searchQuery) {
          // Fetch movies using the search API with filters
          response = await axios.get(`${base_url}/movies/search`, { params });
        } else {
          // Fetch movies using the regular movies API with filters
          response = await axios.get(`${base_url}/movies`, { params });
        }

        setMovieData(response.data.movies);
        setTotalMovies(response.data.pagination?.totalItems || 0);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, searchQuery, releaseYear, genre, industry, itemsPerPage]);

  // Fetch filter options (Release Year, Genre, Industry)
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [releaseYearsRes, genresRes, industriesRes] = await Promise.all([
          axios.get(`${base_url}/movies/release-years`),
          axios.get(`${base_url}/genre`),
          axios.get(`${base_url}/industry`),
        ]);

        const releaseYears = releaseYearsRes?.data?.releaseYears || [];
        const genres = genresRes?.data?.map((genre) => genre.genreName) || [];
        const industries =
          industriesRes?.data?.map((industry) => industry.industryName) || [];

        setFilterItems((prev) =>
          prev.map((item) => {
            if (item.label === "Release Year") {
              return { ...item, options: releaseYears };
            }
            if (item.label === "Genre") {
              return { ...item, options: genres };
            }
            if (item.label === "Industry") {
              return { ...item, options: industries };
            }
            return item;
          })
        );
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilters();
  }, []);

  // Reset filters to default (empty)
  const handleResetFilters = () => {
    setReleaseYear("");
    setGenre("");
    setIndustry("");
    setSearchQuery(""); // Reset search query as well
    setCurrentPage(1); // Reset to the first page
  };

  // Delete movie
  const handleDeleteMovie = async (movieId) => {
    const confirmationResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmationResult.isConfirmed) {
      try {
        await axios.delete(`${base_url}/movies/${movieId}`);
        setMovieData((prevMovies) =>
          prevMovies.filter((movie) => movie._id !== movieId)
        );
        setTotalMovies((prevTotal) => prevTotal - 1);
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page on search submit
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === "Release Year") {
      setReleaseYear(value);
    } else if (filterType === "Genre") {
      setGenre(value);
    } else if (filterType === "Industry") {
      setIndustry(value);
    }
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const totalPages = Math.ceil(totalMovies / itemsPerPage);

  return (
    <TypographyWrapper>
      <DashboardHeader title={"All Cinemas"} count={totalMovies} />

      {/* Search Bar */}
      <div className="flex justify-center mt-4">
        <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearch}
            className="input input-bordered w-full"
          />
          <div className="flex space-x-2 mt-2">
            <button type="submit" className="btn btn-sm btn-primary">
              Search
            </button>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn btn-sm btn-secondary"
            >
              Reset Search
            </button>
          </div>
        </form>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center mt-4 gap-4">
        {filterItems.map((filter) => (
          <div
            key={filter.label}
            className="flex flex-col items-center w-full sm:w-auto"
          >
            <label className="mb-1">{filter.label}</label>
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={(e) => handleFilterChange(filter.label, e.target.value)}
              value={
                filter.label === "Release Year"
                  ? releaseYear
                  : filter.label === "Genre"
                  ? genre
                  : industry
              }
            >
              <option value="">All {filter.label}</option>
              {filter.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Reset Filters Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleResetFilters}
          className="btn btn-sm btn-secondary"
        >
          Reset Filters
        </button>
      </div>

      {/* Movies List */}
      {isLoading ? (
        <div className="text-center my-10">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : movieData.length > 0 ? (
        <div
          className="grid grid-cols-1 gap-4 my-5 p-4 rounded-md"
          style={{ backgroundColor: colors.mo_primary }}
        >
          {movieData.map((movie, index) => (
            <DashboardMovieCard
              key={index}
              movie={movie}
              onDelete={() => handleDeleteMovie(movie._id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center my-10">
          <p>No movies found.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalMovies > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-sm btn-accent"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-accent"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </TypographyWrapper>
  );
};

export default AllCinemas;
