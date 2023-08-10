import Image from "next/image";
import React from "react";

const DashboardMovieCard = ({ movie }) => {
  console.log(movie.poster);
  return (
      <div className="col-span-1 md:col-span-5">
    <div className="md:px-5 px-2 grid grid-cols-1 md:grid-cols-5 gap-4 bg-blue-300">
        <div>
          <h1>{movie.movieName}</h1>
          <div className="w-full h-[35vh] relative">
            <Image
              src={movie.poster}
              alt={movie.movieName}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <h1>{movie.releaseYear}</h1>
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
    </div>
  );
};

export default DashboardMovieCard;
