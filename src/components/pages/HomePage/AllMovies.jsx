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
    <Link href={`/movies/${movie._id}`}>
      <div
        className="min-h-[40vh] relative bg-gray-600 rounded-md overflow-hidden"
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverOut}
      >
        <div className="w-full min-h-[40vh] relative">
          <Image
            src={movie.poster}
            alt="Description of the image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div
          className={`p-2 absolute w-full bg-gray-800 bg-opacity-90 text-white ${
            hovered
              ? "transform bottom-0 transition-all duration-500"
              : "transform translate-y-full bottom-16 transition-all duration-300"
          }`}
        >
          <h3 className="font-semibold text-center py-2">
            {movie.movieName.length <= 40
              ? movie.movieName
              : `${movie.movieName.substring(0, 40)}...`}
          </h3>
          <hr />
          <div className="uppercase text-xs text-white flex flex-wrap">
            {movie.genre.map((dt, index) => (
              <span key={index} className="bg-gray-700 rounded-sm mr-1 my-[2px] px-1">
                {dt},
              </span>
            ))}
          </div>
          <ul className="text-xs">
            <li>
              <b>Country:</b> {movie.country}
            </li>
            <li>
              <b>Directed By:</b> {movie.directedBy}
            </li>
            <li>
              <b>IMDB Rating:</b> {movie.imdbRating}
            </li>
            <li>
              <b>Industry:</b> {movie.industry}
            </li>
          </ul>
        </div>
        {/*  */}
      </div>
    </Link>
  );
};

export default AllMovies;
