// AllMovies.js
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AllMovies = ({ movie }) => {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const handleHoverOut = () => {
    setHovered(false);
  };

  return (
    <Link href={`/${movie._id}`}>
      <div
        className="min-h-[50vh] relative bg-gray-600 rounded-md overflow-hidden"
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverOut}
      >
        <div className="w-full min-h-[50vh] relative">
          <Image
            src={movie.poster}
            alt="Description of the image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div
          className={`p-2 absolute w-full bg-gray-800 text-white ${
            hovered
              ? "transform bottom-0 transition-all duration-500"
              : "transform translate-y-full bottom-12 transition-all duration-300"
          }`}
        >
          <h3 className="font-semibold text-center py-2">
            {movie.movieName.length <= 80
              ? movie.movieName
              : `${movie.movieName.substring(0, 80)}...`}
          </h3>
          <hr />
          {movie.genre.map((dt, index) => (
            <span
              key={index}
              className="bg-gray-700 rounded-sm mr-1 uppercase text-sm text-white"
            >
              {dt},
            </span>
          ))}
          <br />
          <b>Country:</b> {movie.country}
          <br />
          <b>Directed By:</b> {movie.directedBy}
          <br />
          <b>IMDB Rating:</b> {movie.imdbRating}
          <br />
          <b>Industry:</b> {movie.industry}
        </div>
        {/*  */}
      </div>
    </Link>
  );
};

export default AllMovies;
