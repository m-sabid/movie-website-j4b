import React, { useState } from "react";
import { useForm } from "react-hook-form";

const MovieForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleLanguageSelect = (e) => {
    const selectedLanguage = e.target.value;
    if (!selectedLanguages.includes(selectedLanguage)) {
      setSelectedLanguages([...selectedLanguages, selectedLanguage]);
    }
  };

  const handleTagRemove = (language) => {
    setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
  };

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
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
          <label htmlFor="releaseDate" className="block text-white font-bold">
            Release Date
          </label>
          <input
            type="date"
            {...register("releaseDate", { required: true })}
            className="input input-bordered input-accent w-full"
          />
          {errors?.releaseDate && (
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
          >
            <option value="">Select a language</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
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

        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="industry" className="block text-white font-bold">
            Industry
          </label>
          <select
            {...register("industry", { required: true })}
            className="input input-bordered w-full"
          >
            <option value="">Select an industry</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
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
