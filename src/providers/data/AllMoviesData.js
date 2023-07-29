"use client";

import { useEffect, useState, createContext } from "react";

// Create the context
export const AllMoviesContext = createContext([]);

const AllMoviesProvider = ({ children }) => {
  const [movieData, setMovieData] = useState([]);
  const [favoriteMovieData, setFavoriteMovieData] = useState([]);
  const [filmIndustries, setFilmIndustries] = useState([]);

  // Trending Movies Data
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTBjOGY3OTQzOGNkZTdmMGU4ZTg3OGUwZGVjNGI1MCIsInN1YiI6IjY0YjQyZDY2MGJiMDc2MDBjYWY5MThkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Of8UeBjQUXHKvcYcq9cjoeM-zzrSJrab1wW-ZZ1SeI8",
      },
    };

    fetch("https://api.themoviedb.org/3/trending/movie/day", options)
      .then((response) => response.json())
      .then((response) => {
        setMovieData(response.results);
      })

      .catch((err) => console.error(err));
  }, []);

  //   film Industries
  useEffect(() => {
    fetch("/filmIndustries.json")
      .then((response) => response.json())
      .then((response) => {
        setFilmIndustries(response.cinemas);
      })

      .catch((err) => console.error(err));
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
        console.log(response, "_____response_____");
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
