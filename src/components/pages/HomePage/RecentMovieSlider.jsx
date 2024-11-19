import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { FiPlayCircle } from "react-icons/fi";
import Link from "next/link";
import { AllMoviesContext } from "@/providers/data/AllMoviesData";

const RecentMovieSlider = () => {
  const { recentMovies } = useContext(AllMoviesContext);

  return (
    <div
      className="swiper-container relative"
      style={{ width: "100%", height: "100%" }}
    >
      <div
        className="absolute top-0 left-0 w-full text-white text-2xl font-bold p-2 z-10"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <h3 className="border-b-2">Most Recent</h3>
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
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
        {recentMovies.map((movie, index) => (
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
                loading="lazy" // Lazy load images
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

export default RecentMovieSlider;
