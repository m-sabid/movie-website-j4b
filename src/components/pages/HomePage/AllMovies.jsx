// AllMovies.js
import React from "react";
import Image from "next/image";

const AllMovies = ({ movie }) => {
  const tmdbBaseUrl = "https://image.tmdb.org/t/p";
  const posterSize = "w500";

  

  return (
    <div className="h-[50vh] relative bg-gray-800 rounded-md overflow-hidden">
      <div className="w-full h-[35vh] relative">
        <Image
          src={`${tmdbBaseUrl}/${posterSize}${movie.poster_path}`}
          alt="Description of the image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <h2 className="text-white text-center py-2">
        {movie.title.length <= 80
          ? movie.title
          : `${movie.title.substring(0, 80)}...`}
      </h2>
    </div>
  );
};

export default AllMovies;
