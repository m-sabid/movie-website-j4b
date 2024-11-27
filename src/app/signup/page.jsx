"use client";

import { useContext, useState } from "react";
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
import TypographyWrapper from "@/components/shared/TypographyWrapper";

const Page = () => {
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { createUser, googleSignIn } = useContext(AuthContext);
  const { movies, fetchMoviesByIndustry, loading } = useContext(AllMoviesContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const lastMovie = movies[0];
  const bgImage = lastMovie?.poster;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validatePassword = (value) => {
    if (value.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(value)) return "Password must contain a capital letter";
    if (!/[!@#$%^&*]/.test(value))
      return "Password must contain a special character";
    return "";
  };

  const onSubmit = async (data) => {
    const { name, email, password, confirmPassword, profile } = data;
    const error = validatePassword(password);

    if (error || password !== confirmPassword) return;

    try {
      const profileImage = profile[0];
      const formData = new FormData();
      formData.append("image", profileImage);

      const imageUploadToken = "01f1da67b6a17d75237a16f95e14bfed";
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageUploadToken}`,
        formData
      );
      const profilePicture = response.data.data.url;

      const userData = { name, email, password, profilePicture };
      await axios.post(`${base_url}/users/sing_up`, userData);
      await createUser(email, password, name, profilePicture);

      Swal.fire({
        title: "Success!",
        text: "User created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => router.push("/"));
    } catch (error) {
      console.error("Error during user creation:", error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Google signup error:", error);
    }
  };

  return (
    <TypographyWrapper>
    <div className="relative min-h-[100vh] flex flex-col items-center justify-center">
      <div className="fixed top-0 w-full z-50">
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
        <div className="fixed z-10 min-h-screen w-full bg-black bg-opacity-70"></div>
      </div>

      <div className="container mx-auto mt-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-500 w-full md:w-3/5 mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-md bg-opacity-50 backdrop-blur-md"
        >
          {/* Name */}
          <div className="mb-4 col-span-2">
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
          <div className="mb-4 col-span-2">
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

          {/* Profile Picture */}
          <div className="mb-4 col-span-2">
            <label htmlFor="profile" className="block text-white font-bold">
              Profile Picture
            </label>
            <input
              type="file"
              {...register("profile")}
              className="file-input file-input-bordered file-input-accent w-full"
              />
          </div>

          {/* Password */}
          <div className="mb-4 w-full col-span-2">
            <label htmlFor="password" className="block text-white font-bold">
              Password
            </label>
            <div className="relative bg-white rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: true })}
                className="input input-bordered w-full pr-10"
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
          <div className="mb-4 w-full col-span-2">
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
                className="input input-bordered w-full pr-10"
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

          {/* Google Signup */}
          <div className="col-span-2 text-white text-center">
            <div className="divider">OR</div>
            <button
              type="button"
              className="bg-red-500 text-white rounded py-2 px-4 flex items-center justify-center gap-4 hover:bg-red-600 mt-2"
              onClick={handleGoogleSignup}
              >
              <FaGoogle /> Sign Up with Google
            </button>
            <div className="my-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Go to login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
              </TypographyWrapper>
  );
};

export default Page;
