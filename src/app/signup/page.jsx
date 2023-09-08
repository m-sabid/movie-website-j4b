"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import base_url from "@/providers/links/BASE_URL";
import { AuthContext } from "@/providers/firebase/AuthProvider";
import { AllMoviesContext } from "@/providers/data/AllMoviesData";
import Link from "next/link";
import SecondaryNav from "@/components/pages/HomePage/SecondaryNav";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { createUser, googleSignIn } = useContext(AuthContext);
  const { movieData } = useContext(AllMoviesContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const lastMovie = movieData[0];
  const bgImage = lastMovie?.poster;

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const validatePassword = (value) => {
    let error = "";

    if (value.length < 6) {
      error = "Password must be at least 6 characters long";
    } else if (!/[A-Z]/.test(value)) {
      error = "Password must contain a capital letter";
    } else if (!/[!@#$%^&*]/.test(value)) {
      error = "Password must contain a special character";
    }

    setPasswordError(error);
  };

  //
  const onSubmit = async (data) => {
    try {
      const {
        name,
        email,
        password,
        age,
        confirmPassword,
        photo,
        gender,
        mobileNumber,
      } = data;

      validatePassword(password);

      if (passwordError || password !== confirmPassword) {
        // Display an error message for password mismatch
        return;
      }

      const imageUploadToken = "01f1da67b6a17d75237a16f95e14bfed"; // Replace with your ImageBB API key
      const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;

      // Upload the profile image to ImageBB
      const profileImage = data.profile[0];
      const profileFormData = new FormData();
      profileFormData.append("image", profileImage);

      const photoResponse = await axios.post(imageHostingUrl, profileFormData);
      const profilePicture = photoResponse.data.data.url;

      await createUser(email, password, name, profilePicture);

      const saveUser = {
        name,
        email,
        mobileNumber,
        age,
        profilePicture,
        gender,
        password,
        confirmPassword
      }

      console.log(saveUser, "___saveUser");

      await axios.post(`http://localhost:5000/users`, saveUser);

      // reset();
      Swal.fire({
        title: "Success!",
        text: "User created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // router.push("/");
      });
    } catch (error) {
      console.error("Error sending user data to server:", error);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      const result = await googleSignIn();

      // Access the user's name and email from the Google sign-in result
      const { displayName, email, profilePicture } = result.user;

      // Save the user's name and email to the server or wherever necessary
      const saveUser = { name: displayName, email, profilePicture };

      // Send user data to the server
      fetch(`${base_url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then((data) => {
          reset();
          Swal.fire({
            title: "Success!",
            text: "User created successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            router.push("/");
          });
        })
        .catch((error) => {
          console.error("Error sending user data to server:", error);
        });
    } catch (error) {
      console.error("Error signing up with Google:", error);
    }
  };

  return (
    <>
      <div className="relative min-h-[100vh] flex flex-col items-center justify-center">
        <div className="fixed top-0 w-full">
          <SecondaryNav />
        </div>
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

        <div className="container mx-auto mt-20">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-500 w-full md:w-3/5 mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-2 rounded-md bg-opacity-50 backdrop-blur-md"
          >
            {/* Name */}
            <div className="mb-4 col-span-1">
              <label htmlFor="name" className="block text-white font-bold">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="input input-bordered input-accent w-full"
              />
              {errors?.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* Email */}
            <div className="mb-4 col-span-1">
              <label htmlFor="email" className="block text-white font-bold">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input input-bordered input-accent w-full"
              />
              {errors?.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* Mobile Number */}
            <div className="mb-4 col-span-1">
              <label
                htmlFor="mobileNumber"
                className="block text-white font-bold"
              >
                Mobile Number
              </label>
              <input
                type="text"
                {...register("mobileNumber")}
                placeholder="Mobile Number"
                className="input input-bordered input-accent w-full"
              />
            </div>

            {/* Age */}
            <div className="mb-4 col-span-1">
              <label htmlFor="age" className="block text-white font-bold">
                Birth Date
              </label>
              <input
                type="date"
                {...register("age")}
                placeholder="Age"
                className="input input-bordered input-accent w-full"
              />
            </div>

            {/* Profile Picture */}
            <div className="mb-4 col-span-1">
              <label htmlFor="profile" className="block text-white font-bold">
                Profile Picture
              </label>
              <input
                type="file"
                {...register("profile")}
                className="file-input file-input-bordered file-input-accent w-full"
              />
            </div>

            {/* Gender */}
            <div className="mb-4 col-span-1">
              <label htmlFor="gender" className="block text-white font-bold">
                Gender
              </label>
              <select
                {...register("gender")}
                className="select select-accent w-full"
              >
                <option disabled selected>
                  Select Your Gender
                </option>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </select>
            </div>

            {/* Password */}
            <div className="mb-4 col-span-1 w-full">
              <label htmlFor="password" className="block text-white font-bold">
                Password
              </label>
              <div className="relative bg-white rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", { required: true })}
                  className="input input-bordered w-full max-w-xs pr-10"
                  onChange={(e) => validatePassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <BsEyeSlashFill className="text-gray-500" />
                  ) : (
                    <BsEyeFill className="text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4 col-span-1 w-full">
              <label
                htmlFor="confirmPassword"
                className="block text-white font-bold"
              >
                Confirm Password
              </label>
              <div className="relative bg-white rounded-lg">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                  className="input input-bordered w-full max-w-xs pr-10"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <BsEyeSlashFill className="text-gray-500" />
                  ) : (
                    <BsEyeFill className="text-gray-500" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500">Passwords do not match</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-4 col-span-2">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary w-full"
              />
            </div>
            {/*  */}
            <div className="col-span-1 md:col-span-2 text-white">
              <div className="divider">OR</div>
              <div className="flex flex-col justify-center text-center">
                <div className="col-span-2 mx-auto">
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded py-2 px-4 flex items-center justify-center gap-4 hover:bg-red-600 mt-2"
                    onClick={handleGoogleSignup}
                  >
                    <FaGoogle /> Sign Up with Google
                  </button>
                </div>
                <div className="text-white my-4">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-500 hover:underline">
                    Go to login
                  </Link>
                </div>
              </div>
            </div>
            {/*  */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
