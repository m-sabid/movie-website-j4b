"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../links/BASE_URL";

export const AllMoviesContext = createContext();

const AllMoviesProvider = ({ children }) => {
  const [industries, setIndustries] = useState([]);
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState({}); // Track loading state per industry
  const [recentMovies, setRecentMovies] = useState([]);
  const [mostWatched, setMostWatched] = useState([]);
  const [moviesForYou, setMoviesForYou] = useState([]);

  // **Search State**
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // This is the search value

  // Fetch all industries (unique names)
  const fetchIndustries = async () => {
    try {
      const res = await axios.get(`${base_url}/movies/industries`);
      const recentMoviesRequest = await axios.get(`${base_url}/movies/recent`);
      const mostWatchedMovies = await axios.get(
        `${base_url}/movies/most-watched`
      );
      const moviesForYouData = await axios.get(`${base_url}/movies/forYou`);

      setIndustries(res.data.industries);
      setMoviesForYou(moviesForYouData.data.movies.reverse());
      setMostWatched(mostWatchedMovies.data.movies.reverse());
      setRecentMovies(recentMoviesRequest.data.movies.reverse());
    } catch (err) {
      console.error("Error fetching industries:", err);
    }
  };

  // Fetch paginated movies with filters
  const fetchMoviesByIndustry = async (industry, page = 1, filters = {}) => {
    try {
      setLoading((prev) => ({ ...prev, [industry]: true }));
      const res = await axios.get(`${base_url}/movies`, {
        params: { industry, page, ...filters },
      });

      setMovies((prev) => ({
        ...prev,
        [industry]: res.data.movies,
      }));

      return res.data.pagination;
    } catch (err) {
      console.error("Error fetching movies by industry:", err);
      return null;
    } finally {
      setLoading((prev) => ({ ...prev, [industry]: false }));
    }
  };

  // **Search Movies**
  const fetchSearchResults = async (query) => {
    if (!query || query.length < 3) {
      setSearchResults([]); // Reset results to null for invalid or short query
      setSearchValue(query); // Reset the search value too
      return;
    }

    try {
      setSearchLoading(true);
      const res = await axios.get(`${base_url}/movies/search`, {
        params: { movieName: query },
      });
      setSearchResults(res.data.movies || []); // Set results or empty array
    } catch (err) {
      console.error("Error fetching search results:", err);
      setSearchResults([]); // Set to empty array on error
    } finally {
      setSearchLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue); // Update the search value
    fetchSearchResults(newValue); // Fetch search results based on the new value
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  return (
    <AllMoviesContext.Provider
      value={{
        industries,
        movies,
        fetchMoviesByIndustry,
        loading,
        recentMovies,
        mostWatched,
        moviesForYou,
        searchResults,
        searchValue, // Provide search value to components
        setSearchValue, // Provide setSearchValue to components
        handleInputChange, // Provide input change handler for search input
        fetchSearchResults,
        searchLoading,
      }}
    >
      {children}
    </AllMoviesContext.Provider>
  );
};

export default AllMoviesProvider;
