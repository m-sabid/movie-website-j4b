"use client";

import AnimatedSkeleton from "@/components/shared/AnimatedSkeleton";
import NavWithoutSearch from "@/components/shared/NavWithoutSearch";
import base_url from "@/providers/links/BASE_URL";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [moByID, setMoByID] = useState([]);
  const [adCounter, setAdCounter] = useState(0); // To track the number of times ads are shown

  useEffect(() => {
    // Fetch Movie by ID
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${base_url}/movies/${params.movieByID}`
        );
        setMoByID(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();

    // Function to load the ad script
    const loadAdScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//pl24956270.profitablecpmrate.com/1c/f8/0e/1cf80e212b0d05010f6799de00162585.js";
      document.body.appendChild(script);

      // Cleanup: Remove the script when the component is unmounted
      return () => {
        document.body.removeChild(script);
      };
    };

    // Increment adCounter every time an ad is shown
    const interval = setInterval(() => {
      if (adCounter < 5) {
        setAdCounter((prevCount) => prevCount + 1);
        loadAdScript();
      } else {
        clearInterval(interval); // Stop after 5 ads have been shown
      }
    }, 5000); // Set the interval for ad calls (e.g., every 5 seconds)

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [adCounter, params.movieByID]);

  return (
    <div>
      <NavWithoutSearch />
      <div className="bg-gray-600 min-h-[100vh] md:p-0 p-2">
        <div className="md:w-[90%] mx-auto text-white">
          {moByID?.movieName ? (
            <>
              <div className="flex flex-col gap-2 items-center justify-center">
                <h4 className="text-4xl text-center text-white font-bold py-2">
                  {moByID.movieName}
                </h4>
                <sup className="bg-blue-500 rounded-full px-2 text-sm">
                  {moByID.releaseYear}
                </sup>
              </div>
              <hr />
              <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                <div className="w-full h-[80vh] col-span-1 md:col-span-2 relative my-2 rounded-md overflow-hidden">
                  <Image
                    src={moByID.poster}
                    alt={moByID.movieName}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <div className="col-span-1 md:col-span-4">
                  <ul className="flex flex-col flex-wrap gap-2 my-2">
                    <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
                      <b>Country:</b> {moByID.country}
                    </li>
                    <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
                      <b>Directed By:</b> {moByID.directedBy}
                    </li>
                    <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md flex flex-wrap gap-2">
                      <b>Genre:</b>
                      {moByID.genre?.map((dt, index) => (
                        <span
                          key={index}
                          className="bg-gray-300 px-2 rounded-full text-gray-600"
                        >
                          {dt}
                        </span>
                      ))}
                    </li>
                    <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md flex flex-wrap gap-2">
                      <b>Language:</b>
                      {moByID.language?.map((dt, index) => (
                        <span
                          key={index}
                          className="bg-gray-300 px-2 rounded-full text-gray-600"
                        >
                          {dt}
                        </span>
                      ))}
                    </li>
                    <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
                      <b>Star Cast:</b> {moByID.starCast}
                    </li>
                    <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
                      <b>IMDB Rating:</b> {moByID.imdbRating}
                    </li>
                    <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
                      <b>Industry:</b> {moByID.industry}
                    </li>
                    <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
                      <b>Plot:</b> {moByID.plot}
                    </li>
                  </ul>

                  <div className="flex mt-5">
                    <a
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default behavior

                        // Check if the user has clicked the download button before
                        const hasClickedBefore =
                          localStorage.getItem("downloadClicked");

                        if (!hasClickedBefore) {
                          // If not clicked before, open the ad link in a new tab
                          window.open(
                            "https://www.profitablecpmrate.com/wvas51y8ux?key=7ad6354dcd2ff79e0080feadcb8fb636",
                            "_blank"
                          );

                          // Mark that the user clicked the download button once
                          localStorage.setItem("downloadClicked", "true");
                        } else {
                          // If clicked before, open the download link in a new tab
                          window.open(moByID.downloadLink, "_blank");
                        }
                      }}
                      className="bg-green-500 text-gray-600 font-bold px-2 py-3 w-full text-center uppercase rounded-md hover:bg-green-800 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full h-[100vh] md:h-[450vh] col-span-1 md:col-span-2 relative my-2 rounded-md overflow-hidden">
                <Image
                  src={moByID.screenShort}
                  alt={moByID.movieName}
                  layout="fill"
                  loading="lazy"
                />
              </div>
            </>
          ) : (
            <div className="h-[100vh] flex justify-center items-center">
              <AnimatedSkeleton count={1} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
