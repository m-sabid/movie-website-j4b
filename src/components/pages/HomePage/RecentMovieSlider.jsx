import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

const movies = [
  {
    name: "Inception",
    details:
      "A thief who steals corporate secrets through the use of dream-sharing technology.",
    poster:
      "https://www.joblo.com/wp-content/uploads/2010/05/inception-poster-quad-1.jpg",
    year: 2010,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
  },
  {
    name: "The Dark Knight",
    details:
      "Batman sets out to dismantle the remaining criminal organizations that plague Gotham City.",
    poster:
      "https://www.wallpaperflare.com/static/735/898/350/batman-dark-knight-poster-wallpaper.jpg",
    year: 2008,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
  },
  {
    name: "Pulp Fiction",
    details: "Interconnected stories of criminals and lowlifes in Los Angeles.",
    poster:
      "https://www.filmonpaper.com/wp-content/uploads/2014/01/PulpFiction_quad_UK-1.jpg",
    year: 1994,
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
  },
  {
    name: "The Shawshank Redemption",
    details:
      "Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.",
    poster:
      "https://justalrightreviewsdotcom.files.wordpress.com/2016/07/the-shawshank-redemption.png?w=940",
    year: 1994,
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
  },
  {
    name: "Fight Club",
    details:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club.",
    poster:
      "https://c4.wallpaperflare.com/wallpaper/995/81/141/fight-club-edward-norton-brad-pitt-movies-wallpaper-preview.jpg",
    year: 1999,
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
  },
];

const RecentMovieSlider = () => {
  return (
    <div className="swiper-container" style={{ width: "100%", height: "100%" }}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination]}
        className="swiper-wrapper"
        style={{ width: "100%", height: "100%" }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide
            key={index}
            className="swiper-slide"
            style={{ width: "100%", height: "100%" }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <Image
                src={movie.poster}
                alt={movie.name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecentMovieSlider;
