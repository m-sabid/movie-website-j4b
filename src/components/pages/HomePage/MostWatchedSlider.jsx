import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { AllMoviesContext } from "@/providers/data/AllMoviesData";
import { FiPlayCircle } from "react-icons/fi";
import Link from "next/link";

const MostWatchedSlider = () => {
  const { mostWatched } = useContext(AllMoviesContext);
  // Function to shuffle the array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Shuffle the movie data and take the first 5 elements
  const randomMovies = shuffleArray(mostWatched).slice(0, 5);

  return (
    <div
      className="swiper-container relative"
      style={{ width: "100%", height: "100%" }}
    >
      <div
        className="absolute top-0 left-0 w-full text-white text-2xl font-bold p-2 z-10"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <h3 className="border-b-2">Most Watched</h3>
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5500,
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
        {randomMovies.map((movie, index) => (
          <SwiperSlide
            key={index}
            className="swiper-slide"
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <Image
                src={movie.poster}
                alt={movie.name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
              <div
                className="absolute inset-0 bg-black opacity-50"
                style={{ width: "100%", height: "100%" }}
              ></div>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ width: "100%", height: "100%", zIndex: 9 }}
              >
                <Link href={`/movies/${movie._id}`}>
                  <div className="v-icon absolute z-20">
                    <FiPlayCircle size={50} />
                  </div>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MostWatchedSlider;
