"use client";

import DashboardMovieCard from "@/components/shared/DashboardMovieCard";
import base_url from "@/providers/links/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";

const AllCinemas = () => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get(`${base_url}/movies`);
        setMovieData(response.data); // Assuming response.data is the array of Cinemas
      } catch (error) {
        console.error("Error fetching Cinemas:", error);
      }
    };

    fetchCinemas();
  }, []);

  return (
    <div>
      <h2 className="bg-gray-500 rounded-md text-white text-center text-3xl font-bold border-b-2 p-4">
        All Cinemas - {movieData.length}
      </h2>

      {movieData.length > 0 ? (
        movieData.map((movie) => {
          return (
            <div key={movie._id}>
              <DashboardMovieCard movie={movie} />
            </div>
          );
        })
      ) : (
        <div className="text-center my-10">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default AllCinemas;
