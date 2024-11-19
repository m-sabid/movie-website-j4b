import { ThemeContext } from "@/providers/colors/GlobalColors";
import { AllMoviesContext } from "@/providers/data/AllMoviesData";
import React, { useContext, useState } from "react";
import { FaCalendar, FaIcons, FaHospital } from "react-icons/fa";


const filterItems = [
  {
    id: 1,
    icon: <FaCalendar className="text-xl md:text-2xl" />,
    label: "Release Year",
    color: "mo_tertiary", // Using mo_tertiary color
    options: ["2024", "2023", "2022", "2021"], // Dropdown options
  },
  {
    id: 2,
    icon: <FaIcons className="text-xl md:text-2xl" />,
    label: "Genre",
    color: "mo_quaternary", // Using mo_quaternary color
    options: ["Action", "Drama", "Comedy", "Horror"], // Dropdown options
  },
  {
    id: 3,
    icon: <FaHospital className="text-xl md:text-2xl" />,
    label: "Industry",
    color: "mo_badges_primary", // Using mo_badges_primary color
    options: ["Hollywood", "Bollywood", "Korean", "Japanese"], // Dropdown options
  },
];

function FilterMovie() {
  const { colors } = useContext(ThemeContext);
  const { fetchMoviesByIndustry } = useContext(AllMoviesContext); // Use context here

  // State for selected options
  const [selectedFilters, setSelectedFilters] = useState({});

  // Handle dropdown selection
  const handleDropdownChange = (label, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  // Handle Apply button click
  const handleApplyFilters = async () => {
    console.log("Applied Filters:", selectedFilters);

    // Get the selected industry
    const industry = selectedFilters["Industry"];

    // Apply filters
    await fetchMoviesByIndustry(industry, 1, selectedFilters);
  };

  return (
    <div
      className="p-4 md:p-6 rounded-lg shadow-md flex flex-col gap-6"
      style={{ backgroundColor: colors.mo_secondary }}
    >
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
              onChange={(e) =>
                handleDropdownChange(item.label, e.target.value)
              }
            >
              <option value="" disabled selected>
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
      <button
        onClick={handleApplyFilters}
        className="self-center px-6 py-2 text-white text-sm md:text-base font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
        style={{
          backgroundColor: colors.mo_primary,
        }}
      >
        Apply Filters
      </button>
    </div>
  );
}

export default FilterMovie;
