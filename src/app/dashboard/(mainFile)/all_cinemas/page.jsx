"use client";

import { useEffect, useState } from "react";
import DashboardMovieCard from "@/components/shared/DashboardMovieCard";
import base_url from "@/providers/links/BASE_URL";
import axios from "axios";
import Swal from "sweetalert2";

const AllCinemas = () => {
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get(`${base_url}/movies`);
        setMovieData(response.data); // Assuming response.data is the array of Movies
      } catch (error) {
        console.error("Error fetching Movies:", error);
      }
    };

    fetchCinemas();
  }, []);

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
        // Update the movieData state to remove the deleted movie
        setMovieData((prevMovieData) =>
          prevMovieData.filter((movie) => movie._id !== movieId)
        );
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentMovies = movieData.slice(firstIndex, lastIndex);

  return (
    <div>
      <h2 className="bg-gray-500 rounded-md text-white text-center text-3xl font-bold border-b-2 p-4">
        All Cinemas - {movieData.length}
      </h2>

      {currentMovies.length > 0 ? (
        <div className="bg-gray-500 grid grid-cols-1 gap-4 my-5 p-4 rounded-md">
          {currentMovies.map((movie, index) => (
            <DashboardMovieCard
              key={index}
              movie={movie}
              onDelete={() => handleDeleteMovie(movie._id)}
              onEdit={() => handelEdit(movie._id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center my-10">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <nav className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm btn-accent"
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentMovies.length < itemsPerPage}
            className="btn btn-sm btn-accent"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AllCinemas;
