"use client";

import { useEffect, useState, createContext } from "react";
import base_url from "../links/BASE_URL";
import axios from "axios";

// Create the context
export const AllMoviesContext = createContext([]);

const AllMoviesProvider = ({ children }) => {
  const [movieData, setMovieData] = useState([]);
  const [favoriteMovieData, setFavoriteMovieData] = useState([]);
  const [filmIndustries, setFilmIndustries] = useState([]);

  // Trending Movies Data
  useEffect(() => {
    // Fetch all movies
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${base_url}/movies`);

        // Reverse the order of the response data array
        const reversedMovies = response.data.reverse();

        setMovieData(reversedMovies);
      } catch (error) {
        console.error("Error fetching Movies:", error);
      }
    };
    fetchMovies();

    // const options = {
    //   method: "GET",
    //   headers: {
    //     accept: "application/json",
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTBjOGY3OTQzOGNkZTdmMGU4ZTg3OGUwZGVjNGI1MCIsInN1YiI6IjY0YjQyZDY2MGJiMDc2MDBjYWY5MThkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Of8UeBjQUXHKvcYcq9cjoeM-zzrSJrab1wW-ZZ1SeI8",
    //   },
    // };

    // fetch("https://api.themoviedb.org/3/trending/movie/day", options)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setMovieData(response.results);
    //   })

    //   .catch((err) => console.error(err));
  }, []);

  // Fetch Industry
  useEffect(() => {
    const fetchIndustry = async () => {
      try {
        const response = await axios.get(`${base_url}/industry`);
        setFilmIndustries(response.data);
      } catch (error) {
        console.error("Error fetching Industry:", error);
      }
    };
    fetchIndustry();
  }, []);

  //   Favorite Movies
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTBjOGY3OTQzOGNkZTdmMGU4ZTg3OGUwZGVjNGI1MCIsInN1YiI6IjY0YjQyZDY2MGJiMDc2MDBjYWY5MThkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Of8UeBjQUXHKvcYcq9cjoeM-zzrSJrab1wW-ZZ1SeI8",
      },
    };

    fetch("https://api.themoviedb.org/3/tv/changes", options)
      .then((response) => response.json())
      .then((response) => {
        setFavoriteMovieData(response.results);
      })
      .catch((err) => console.error(err));
  }, []);

  // Exported Data
  const movieDataInfo = {
    movieData,
    filmIndustries,
  };

  return (
    <AllMoviesContext.Provider value={movieDataInfo}>
      {children}
    </AllMoviesContext.Provider>
  );
};

export default AllMoviesProvider;
