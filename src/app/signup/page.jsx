"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import base_url from "@/providers/links/BASE_URL";
import { useEffect, useState } from "react";

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
    setValue,
  } = useForm();

  const [bgImage, setBgImage] = useState([]);

  useEffect(() => {
    //  Fetch Movie by ID
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${base_url}/movies`);
        const lastMovie = response.data[response.data.length - 1];
        setBgImage(lastMovie.poster);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  console.log(bgImage);

  const onSubmit = async (data) => {
    try {
      const imageUploadToken = "01f1da67b6a17d75237a16f95e14bfed"; // Replace with your ImageBB API key
      const profilePhotoUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;

      // Upload the profile image to ImageBB
      const profileImage = data.profile[0]; // Assuming data.profile is the file object from the form
      const profileFormData = new FormData();
      profileFormData.append("image", profileImage);

      const profileResponse = await axios.post(
        profilePhotoUrl,
        profileFormData
      );
      const profileImageUrl = profileResponse.data.data.url;

      // Combine the image URLs with the rest of the form data
      const formDataWithImagesAndArrays = {
        ...data,
        profile: profileImageUrl,
      };

      // Send the form data to the API endpoint using axios
      const response = await axios.post(
        `${base_url}/movies`,
        formDataWithImagesAndArrays
      );

      // console.log("API Response:", response.data.success);

      if (response.data.success) {
        reset();
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
    <div className="relative min-h-[100vh] flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <div className="relative z-10 min-h-screen bg-black bg-opacity-70"></div>
      </div>

      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-500 rounded-md w-full p-4 bg-opacity-50 backdrop-blur-md"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4 col-span-2 md:col-span-1">
              <label htmlFor="firstName" className="block text-white font-bold">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="First Name"
                className="input input-bordered input-accent w-full"
              />
              {errors?.firstName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
