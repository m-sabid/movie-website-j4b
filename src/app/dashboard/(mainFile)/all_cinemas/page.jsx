"use client";

import { useEffect, useState } from "react";
import DashboardMovieCard from "@/components/shared/DashboardMovieCard";
import base_url from "@/providers/links/BASE_URL";
import axios from "axios";
import Swal from "sweetalert2";

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
        // Update the movieData state to remove the deleted movie
        setMovieData((prevMovieData) =>
          prevMovieData.filter((movie) => movie._id !== movieId)
        );
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };

  return (
    <div>
      <h2 className="bg-gray-500 rounded-md text-white text-center text-3xl font-bold border-b-2 p-4">
        All Cinemas - {movieData.length}
      </h2>

      {movieData.length > 0 ? (
        <div className="bg-gray-500 grid grid-cols-1 md:grid-cols-4 gap-4 my-5 p-4 rounded-md">
          {movieData?.map((movie, index) => (
            <DashboardMovieCard
              key={index}
              movie={movie}
              onDelete={() => handleDeleteMovie(movie._id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center my-10">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default AllCinemas;
