import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FaCalendar, FaIcons, FaHospital } from "react-icons/fa";
import base_url from "@/providers/links/BASE_URL";
import MovieCart from "@/components/shared/MovieCart";
import { ThemeContext } from "@/providers/colors/GlobalColors";
import { FaArrowRotateLeft } from "react-icons/fa6";
import AnimatedSkeleton from "@/components/shared/AnimatedSkeleton";

const FilterMovie = () => {
  const { colors } = useContext(ThemeContext);

  const [filterItems, setFilterItems] = useState([
    {
      id: 1,
      icon: <FaCalendar className="text-xl md:text-2xl" />,
      label: "Release Year",
      color: "mo_tertiary",
      options: [],
    },
    {
      id: 2,
      icon: <FaIcons className="text-xl md:text-2xl" />,
      label: "Genre",
      color: "mo_quaternary",
      options: [],
    },
    {
      id: 3,
      icon: <FaHospital className="text-xl md:text-2xl" />,
      label: "Industry",
      color: "mo_badges_primary",
      options: [],
    },
  ]);

  const [selectedFilters, setSelectedFilters] = useState({});
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const fetchMovies = async (page = 1) => {
    try {
      setIsLoading(true);

      const params = { page, limit: 12 };

      if (selectedFilters["Release Year"]) {
        params.releaseYear = selectedFilters["Release Year"];
      }
      if (selectedFilters["Genre"]) {
        params.genre = selectedFilters["Genre"];
      }
      if (selectedFilters["Industry"]) {
        params.industry = selectedFilters["Industry"];
      }

      const res = await axios.get(`${base_url}/movies`, { params });

      setFilteredMovies(res.data.movies || []);
      setPagination(
        res.data.pagination || { currentPage: 1, totalPages: 1, totalItems: 0 }
      );
    } catch (err) {
      console.error("Error fetching movies:", err);
      alert("Failed to fetch movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDropdownChange = (label, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleApplyFilters = () => {
    if (Object.keys(selectedFilters).length === 0) {
      alert("Please select at least one filter before applying.");
      return;
    }
    fetchMovies(1); // Reset to first page when applying new filters
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
    setFilteredMovies([]);
    setPagination({ currentPage: 1, totalPages: 1, totalItems: 0 });
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= pagination.totalPages) {
      fetchMovies(page);
    }
  };

  const generatePagination = () => {
    const buttons = [];
    const startPage = Math.max(1, pagination.currentPage - 2);
    const endPage = Math.min(pagination.totalPages, pagination.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`md:px-3 px-2 py-1 border rounded ${
            i === pagination.currentPage
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

  const handleNext = () => {
    const nextPage = pagination.currentPage + 3;
    if (nextPage <= pagination.totalPages) {
      handlePageChange(nextPage);
    }
  };

  const handlePrevious = () => {
    const prevPage = pagination.currentPage - 3;
    if (prevPage > 0) {
      handlePageChange(prevPage);
    }
  };

  return (
    <div
      className="p-4 md:p-6 rounded-lg shadow-md flex flex-col gap-6"
      style={{ backgroundColor: colors.mo_secondary }}
    >
      {/* Filter Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filterItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center p-4 rounded-md"
            style={{
              backgroundColor: colors[item.color],
              color: colors.mo_primaryText,
            }}
          >
            <div className="flex items-center justify-center rounded-full p-2 mb-2">
              {item.icon}
            </div>
            <p className="text-sm md:text-base font-medium mb-2">
              {item.label}
            </p>
            <select
              className="w-full px-2 py-1 text-sm md:text-base rounded-md focus:outline-none focus:ring focus:ring-offset-2"
              style={{
                backgroundColor: colors.mo_secondary,
                color: colors.mo_primaryText,
              }}
              value={selectedFilters[item.label] || ""}
              onChange={(e) => handleDropdownChange(item.label, e.target.value)}
            >
              <option value="" disabled>
                Select {item.label}
              </option>
              {item.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Apply/Reset Filters Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleResetFilters}
          className="px-6 py-2 flex items-center gap-1 text-white text-sm md:text-base font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
          style={{
            backgroundColor: colors.mo_danger,
          }}
        >
          <FaArrowRotateLeft /> Reset Filters
        </button>
        <button
          onClick={handleApplyFilters}
          className="px-6 py-2 text-white text-sm md:text-base font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
          style={{
            backgroundColor: colors.mo_primary,
          }}
        >
          Apply Filters
        </button>
      </div>

      {/* Movie Grid */}
      {isLoading ? (
        <AnimatedSkeleton count={25} />
      ) : (
        <>
          {filteredMovies.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-4">
                Filtered Movies: {pagination.totalItems}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {filteredMovies.map((movie) => (
                  <MovieCart key={movie._id} movie={movie} />
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handlePrevious}
                  disabled={pagination.currentPage <= 1}
                  className={`px-4 py-2 rounded-md font-semibold ${
                    pagination.currentPage <= 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
                >
                  Previous
                </button>
                {generatePagination()}
                <button
                  onClick={handleNext}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className={`px-4 py-2 rounded-md font-semibold ${
                    pagination.currentPage >= pagination.totalPages
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FilterMovie;
