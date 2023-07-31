import React from "react";
import { useForm } from "react-hook-form";

const MovieForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-800 rounded-md w-full p-4"
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
          <label htmlFor="plot" className="block text-white font-bold">
            Plot
          </label>
          <textarea
            {...register("plot", { required: true })}
            placeholder="Plot"
            className="textarea textarea-accent w-full"
          />
          {errors?.plot && (
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
            defaultValue="english" // Use defaultValue instead of defaultChecked
            className="input input-bordered input-accent w-full"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            {/* Add more language options as needed */}
          </select>
          {errors?.language && (
            <span className="text-red-500">This field is required</span>
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
            Poster URL
          </label>
          <input
            type="text"
            {...register("poster", { required: true })}
            placeholder="Poster URL"
            className="input input-bordered input-accent w-full"
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
            Screen Short URL
          </label>
          <input
            type="text"
            {...register("screenShort", { required: true })}
            placeholder="Screen Short URL"
            className="input input-bordered input-accent w-full"
          />
          {errors?.screenShort && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      </div>

      <input type="submit" value="Submit" className="btn btn-primary w-full" />
    </form>
  );
};

export default MovieForm;
