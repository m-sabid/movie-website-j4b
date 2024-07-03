import Image from "next/image";
import React from "react";
import { FiPlayCircle } from "react-icons/fi";

const HowToDownload = () => {
  return (
    <div className="md:col-span-6 col-span-12 relative h-full">
      <div
        className="absolute bottom-0 left-0 w-full text-white text-2xl font-bold p-2 z-10"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <h3 className="border-b-2">How To Download</h3>
      </div>
      <label
        htmlFor="my-modal-4"
        className="btn bg-gray-200 border-none min-h-full w-full relative overflow-hidden shadow-lg"
      >
        <div className="v-icon absolute z-20">
          <FiPlayCircle />
        </div>

        <Image
          src={"https://i.ibb.co/s2DjTBq/How-To-download.png"}
          alt="How to download"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
        />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="relative h-full w-10/12 overflow-hidden" htmlFor="">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/JNKZN8uq1H8?controls=0&amp;start=21"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </label>
      </label>
    </div>
  );
};

export default HowToDownload;
