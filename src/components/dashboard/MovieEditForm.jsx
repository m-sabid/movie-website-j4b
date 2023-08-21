import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import base_url from "@/providers/links/BASE_URL";
import Swal from "sweetalert2";
import Image from "next/image";
import { useRouter } from "next/navigation";


const MovieEditForm = ({ moByID, allLanguage, allGenre, allIndustry }) => {
  const movie = moByID;
  const router = useRouter();


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  //
  //
  console.log("movie.language:", movie.industry);

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    setValue("movieName", moByID.movieName);
    setValue("directedBy", moByID.directedBy);
    setValue("releaseYear", moByID.releaseYear);

    // Set selected languages and genres from moByID
    setSelectedLanguages(moByID.language);
    setSelectedGenres(moByID.genre);

    setValue("industry", moByID.industry);
    setValue("country", moByID.country);
    setValue("starCast", moByID.starCast);
    setValue("imdbRating", moByID.imdbRating);
    setValue("downloadLink", moByID.downloadLink);
    setValue("plot", moByID.plot);
  }, [moByID, setValue]);

  const handleLanguageSelect = (e) => {
    const selectedLanguage = e.target.value;
    if (!selectedLanguages.includes(selectedLanguage)) {
      setSelectedLanguages([...selectedLanguages, selectedLanguage]);
      setValue("language", [...selectedLanguages, selectedLanguage]); // Update form field value
    }
  };

  const handleGenreSelect = (e) => {
    const selectedGenre = e.target.value;
    if (!selectedGenres.includes(selectedGenre)) {
      setSelectedGenres([...selectedGenres, selectedGenre]);
    }
  };

  const handleTagRemove = (language) => {
    setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
  };

  const handleGenreRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((gen) => gen !== genre));
  };
  //
  //

  const onSubmit = async (data) => {
    // TODO:
    // setIsDisable(true);

    try {
      const imageUploadToken = "01f1da67b6a17d75237a16f95e14bfed"; // Replace with your ImageBB API key
      const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;

      // Check if new poster image is provided, and upload if necessary
      let posterImageUrl = moByID.poster;
      if (data.poster.length !== 0) {
        const posterImage = data.poster[0];
        const posterFormData = new FormData();
        posterFormData.append("image", posterImage);
        const posterResponse = await axios.post(
          imageHostingUrl,
          posterFormData
        );
        posterImageUrl = posterResponse.data.data.url;
      }

      // Check if new screenShort image is provided, and upload if necessary
      let screenShortImageUrl = moByID.screenShort;
      if (data.screenShort.length !== 0) {
        const screenShortImage = data.screenShort[0];
        const screenShortFormData = new FormData();
        screenShortFormData.append("image", screenShortImage);
        const screenShortResponse = await axios.post(
          imageHostingUrl,
          screenShortFormData
        );
        screenShortImageUrl = screenShortResponse.data.data.url;
      }

      // Combine the image URLs with the rest of the form data
      const formDataWithImages = {
        ...data,
        poster: posterImageUrl,
        screenShort: screenShortImageUrl,
        language: selectedLanguages,
        genre: selectedGenres,
      };

      // Send the form data to the API endpoint using axios
      const response = await axios.patch(
        `${base_url}/movies/${moByID._id}`,
        formDataWithImages
      );

      if (response.status === 200) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Movie updated successfully.",
        });
        router.push("/dashboard/all_cinemas");
      }
    } catch (error) {
      // Handle errors if the API call fails or image upload fails
      console.error("Error sending data:", error);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: { error },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-500 rounded-md w-full p-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="movieName" className="block text-white font-bold">
            Movie Name
          </label>
          <input
            type="text"
            {...register("movieName")}
            defaultValue={moByID.movieName}
            placeholder="Movie Name"
            className="input input-bordered input-accent w-full"
          />
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="directedBy" className="block text-white font-bold">
            Directed by
          </label>
          <input
            type="text"
            {...register("directedBy")}
            defaultValue={moByID.directedBy}
            placeholder="Directed by"
            className="input input-bordered input-accent w-full"
          />
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="releaseYear" className="block text-white font-bold">
            Release Year
          </label>
          <select
            {...register("releaseYear")}
            className="input input-bordered w-full"
            defaultValue={movie.releaseYear}
          >
            <option disabled value="">
              Select the release year
            </option>
            {Array.from(
              { length: 50 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="language" className="block text-white font-bold">
            Language
          </label>
          <select
            {...register("language")}
            onChange={handleLanguageSelect}
            className="input input-bordered w-full"
            value={moByID.language}
          >
            <option disabled value="">
              Select a language
            </option>
            {allLanguage?.map((language) => {
              return (
                <option key={language._id} value={language.languageName}>
                  {language.languageName}
                </option>
              );
            })}
          </select>

          <div className="mt-2">
            {selectedLanguages?.map((language) => (
              <div
                key={language}
                className="inline-flex items-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm mr-2 mt-2"
              >
                {language}
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => handleTagRemove(language)}
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="genre" className="block text-white font-bold">
            Genre
          </label>
          <select
            {...register("genre")}
            onChange={handleGenreSelect}
            className="input input-bordered w-full"
            defaultValue=""
          >
            <option disabled value="">
              Select a genre
            </option>
            {allGenre?.map((genre) => {
              return (
                <option key={genre._id} value={genre.genreName}>
                  {genre.genreName}
                </option>
              );
            })}
          </select>

          <div className="mt-2">
            {selectedGenres?.map((genre) => (
              <div
                key={genre}
                className="inline-flex items-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm mr-2 mt-2"
              >
                <span className="capitalize">{genre}</span>
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => handleGenreRemove(genre)}
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="industry" className="block text-white font-bold">
            Industry
          </label>
          <select
            {...register("industry")}
            className="input input-bordered w-full"
            defaultValue={movie?.industry}
          >
            <option disabled value="">
              Select an industry
            </option>
            {allIndustry?.map((industry) => {
              return (
                <option key={industry._id} value={industry.industryName}>
                  {industry.industryName}
                </option>
              );
            })}
          </select>
          <span>{movie?.industry}</span>
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="country" className="block text-white font-bold">
            Country
          </label>
          <input
            type="text"
            {...register("country")}
            defaultValue={moByID.country}
            placeholder="Country"
            className="input input-bordered input-accent w-full"
          />
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="starCast" className="block text-white font-bold">
            Star Cast (Comma-separated)
          </label>
          <input
            type="text"
            {...register("starCast")}
            defaultValue={moByID.starCast}
            placeholder="Star Cast"
            className="input input-bordered input-accent w-full"
          />
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="imdbRating" className="block text-white font-bold">
            IMDB Rating
          </label>
          <input
            type="number"
            step="0.1"
            {...register("imdbRating")}
            defaultValue={moByID.imdbRating}
            placeholder="IMDB Rating"
            className="input input-bordered input-accent w-full"
          />
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="downloadLink" className="block text-white font-bold">
            Download Link
          </label>
          <input
            type="text"
            {...register("downloadLink")}
            defaultValue={moByID.downloadLink}
            placeholder="Download Link"
            className="input input-bordered input-accent w-full"
          />
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <div className="w-full h-[30vh] relative rounded-md overflow-hidden">
            <Image
              src={moByID.poster}
              alt="Description of the image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <label htmlFor="poster" className="block text-white font-bold">
            Poster
          </label>
          <input
            type="file"
            {...register("poster")}
            className="file-input file-input-bordered file-input-accent w-full"
          />
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <div className="w-full h-[30vh] relative rounded-md overflow-hidden">
            <Image
              src={moByID.screenShort}
              alt="Description of the image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <label htmlFor="screenShort" className="block text-white font-bold">
            Screen Short
          </label>
          <input
            type="file"
            {...register("screenShort")}
            className="file-input file-input-bordered file-input-accent w-full"
          />
        </div>

        <div className="mb-4 col-span-2 md:col-span-2">
          <label htmlFor="plot" className="block text-white font-bold">
            Plot
          </label>
          <textarea
            {...register("plot")}
            defaultValue={moByID.plot}
            placeholder="Plot"
            className="textarea textarea-accent w-full h-32"
          />
        </div>
      </div>

      <input type="submit" value="Update" className="btn btn-primary w-full" />
    </form>
  );
};

export default MovieEditForm;
