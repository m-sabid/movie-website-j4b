import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import base_url from "@/providers/links/BASE_URL";
import Swal from "sweetalert2";

const MovieForm = ({ allGenre, allLanguage, allIndustry }) => {
  const { register, handleSubmit, reset, errors } = useForm();
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleLanguageSelect = (e) => {
    const selectedLanguage = e.target.value;
    if (!selectedLanguages.includes(selectedLanguage)) {
      setSelectedLanguages([...selectedLanguages, selectedLanguage]);
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

  const onSubmit = async (data) => {
    try {
      const imageUploadToken = "01f1da67b6a17d75237a16f95e14bfed"; // Replace with your ImageBB API key
      const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;

      // Upload the poster image to ImageBB
      const posterImage = data.poster[0]; // Assuming data.poster is the file object from the form
      const posterFormData = new FormData();
      posterFormData.append("image", posterImage);

      const posterResponse = await axios.post(imageHostingUrl, posterFormData);
      const posterImageUrl = posterResponse.data.data.url;

      // Upload the screenShort image to ImageBB
      const screenShortImage = data.screenShort[0]; // Assuming data.screenShort is the file object from the form
      const screenShortFormData = new FormData();
      screenShortFormData.append("image", screenShortImage);

      const screenShortResponse = await axios.post(
        imageHostingUrl,
        screenShortFormData
      );
      const screenShortImageUrl = screenShortResponse.data.data.url;

      // Get selected languages and genres from state
      const selectedLanguagesArray = selectedLanguages;
      const selectedGenresArray = selectedGenres;

      // Combine the image URLs with the rest of the form data
      const formDataWithImagesAndArrays = {
        ...data,
        poster: posterImageUrl,
        screenShort: screenShortImageUrl,
        language: selectedLanguagesArray,
        genre: selectedGenresArray,
      };

      // Send the form data to the API endpoint using axios
      const response = await axios.post(
        `${base_url}/movies`,
        formDataWithImagesAndArrays
      );

      // console.log("API Response:", response.data.success);

      if (response.data.success) {
        reset();
        setSelectedLanguages([]);
        setSelectedGenres([]);
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Movie created successfully.",
        });
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
            {...register("movieName", { required: true })}
            placeholder="Movie Name"
            className="input input-bordered input-accent w-full"
          />
          {errors?.movieName && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="directedBy" className="block text-white font-bold">
            Directed by
          </label>
          <input
            type="text"
            {...register("directedBy", { required: true })}
            placeholder="Directed by"
            className="input input-bordered input-accent w-full"
          />
          {errors?.directedBy && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="releaseYear" className="block text-white font-bold">
            Release Year
          </label>
          <select
            {...register("releaseYear", { required: true })}
            className="input input-bordered w-full"
            defaultValue=""
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
            {/* This example provides options for the last 50 years.
                You can customize it to show a different range. */}
          </select>
          {errors?.releaseYear && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="language" className="block text-white font-bold">
            Language
          </label>
          <select
            {...register("language", { required: true })}
            onChange={handleLanguageSelect}
            className="input input-bordered w-full"
            defaultValue=""
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
            {/* Add more language options as needed */}
          </select>
          {errors?.language && (
            <span className="text-red-600">This field is required</span>
          )}

          <div className="mt-2">
            {selectedLanguages.map((language) => (
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
        {/* Genre */}

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="genre" className="block text-white font-bold">
            Genre
          </label>
          <select
            {...register("genre", { required: true })}
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
          {errors?.genre && (
            <span className="text-red-600">This field is required</span>
          )}

          <div className="mt-2">
            {selectedGenres.map((genre) => (
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

        {/* Genre */}

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="industry" className="block text-white font-bold">
            Industry
          </label>
          <select
            {...register("industry", { required: true })}
            className="input input-bordered w-full"
            defaultValue=""
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
            {/* Add more industry options as needed */}
          </select>
          {errors?.industry && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="country" className="block text-white font-bold">
            Country
          </label>
          <input
            type="text"
            {...register("country", { required: true })}
            placeholder="Country"
            className="input input-bordered input-accent w-full"
          />
          {errors?.country && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="starCast" className="block text-white font-bold">
            Star Cast (Comma-separated)
          </label>
          <input
            type="text"
            {...register("starCast", { required: true })}
            placeholder="Star Cast"
            className="input input-bordered input-accent w-full"
          />
          {errors?.starCast && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="imdbRating" className="block text-white font-bold">
            IMDB Rating
          </label>
          <input
            type="number"
            step="0.1"
            {...register("imdbRating", { required: true })}
            placeholder="IMDB Rating"
            className="input input-bordered input-accent w-full"
          />
          {errors?.imdbRating && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="poster" className="block text-white font-bold">
            Poster
          </label>
          <input
            type="file"
            {...register("poster", { required: true })}
            className="file-input file-input-bordered file-input-accent w-full"
          />
          {errors?.poster && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="downloadLink" className="block text-white font-bold">
            Download Link
          </label>
          <input
            type="text"
            {...register("downloadLink", { required: true })}
            placeholder="Download Link"
            className="input input-bordered input-accent w-full"
          />
          {errors?.downloadLink && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="screenShort" className="block text-white font-bold">
            Screen Short
          </label>
          <input
            type="file"
            {...register("screenShort", { required: true })}
            className="file-input file-input-bordered file-input-accent w-full"
          />
          {errors?.screenShort && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4 col-span-2 md:col-span-2">
          <label htmlFor="plot" className="block text-white font-bold">
            Plot
          </label>
          <textarea
            {...register("plot", { required: true })}
            placeholder="Plot"
            className="textarea textarea-accent w-full h-32"
          />
          {errors?.plot && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      </div>

      <input type="submit" value="Submit" className="btn btn-primary w-full" />
    </form>
  );
};

export default MovieForm;
