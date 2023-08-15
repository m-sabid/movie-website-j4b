import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardMovieCard = ({ movie, onDelete }) => {
  console.log(movie);
  return (
    <Link
      href=""
      className="rounded-md p-3 bg-gray-600 text-white border-3 border-gray-700 hover:scale-105 hover:translate-y-0.5 transform transition-all duration-300"
    >
      <h4 className="text-xl">
        {movie.movieName} -{" "}
        <span className="bg-blue-500 rounded-full px-2 text-sm">
          {movie.releaseYear}
        </span>
      </h4>
      <hr />
      <div className="w-full h-32 relative my-2 rounded-md overflow-hidden">
        <Image
          src={movie.poster}
          alt={movie.movieName}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <ul>
        <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
          <b>Country:</b> {movie.country}
        </li>
        <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
          <b>Directed By:</b> {movie.directedBy}
        </li>
        <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md flex flex-wrap gap-2">
          <b>Genre:</b> 
          {movie.genre.map((dt, index) => (
            <span key={index} className="bg-gray-300 px-2 rounded-full text-gray-600">{dt}</span>
          ))}
        </li>
        <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
          <b>IMDB Rating:</b> {movie.imdbRating}
        </li>
        <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
          <b>Industry:</b> {movie.industry}
        </li>
      </ul>

      <button
        className="bg-red-500 text-white px-2 py-1 rounded-md"
        onClick={onDelete}
      >
        Delete
      </button>

      {/* {
    country
    directedBy
    
    downloadLink
    
    genre
   
    imdbRating
 
    industry
 
    language

    movieName
   
    plot
 
    poster

    releaseYear
 
    screenShort

    starCast
 
} */}
    </Link>
  );
};

export default DashboardMovieCard;
