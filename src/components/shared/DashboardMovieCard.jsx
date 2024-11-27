import { ThemeContext } from "@/providers/colors/GlobalColors";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import TypographyWrapper from "./TypographyWrapper";

const DashboardMovieCard = ({ movie, onDelete }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <TypographyWrapper>
      <div
        className="rounded-md p-3 text-white border-3 border-gray-700 hover:scale-[102%] transform transition-all duration-300"
        style={{ backgroundColor: colors.mo_secondary }}
      >
        <h4 className="text-xl">
          {movie.movieName} -{" "}
          <span className="bg-blue-500 rounded-full px-2 text-sm">
            {movie.releaseYear}
          </span>
        </h4>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div className="w-full h-[30vh] col-span-1 relative my-2 rounded-md overflow-hidden">
            <Image
              src={movie.poster}
              alt={movie.movieName}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          </div>
          <div className="col-span-3">
            <ul className="flex flex-wrap gap-2 my-2">
              <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
                <b>Country:</b> {movie.country}
              </li>
              <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
                <b>Directed By:</b> {movie.directedBy}
              </li>
              <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md flex flex-wrap gap-2">
                <b>Genre:</b>
                {movie.genre.map((dt, index) => (
                  <span
                    key={index}
                    className="px-2 rounded-full text-gray-600"
                    style={{backgroundColor:colors.mo_badges_secondary}}
                  >
                    {dt}
                  </span>
                ))}
              </li>
              <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
                <b>IMDB Rating:</b> {movie.imdbRating}
              </li>
              <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
                <b>Industry:</b> {movie.industry}
              </li>
            </ul>

            <div className="flex gap-2 mt-5">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={onDelete}
              >
                Delete
              </button>
              <Link
                href={`all_cinemas/${movie._id}`}
                className="bg-orange-500 text-white px-2 py-1 rounded-md"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>

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
      </div>
    </TypographyWrapper>
  );
};

export default DashboardMovieCard;
