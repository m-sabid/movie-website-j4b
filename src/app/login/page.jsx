"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { AuthContext } from "@/providers/firebase/AuthProvider";
import Link from "next/link";
import SecondaryNav from "@/components/pages/HomePage/SecondaryNav";

const Login = () => {
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, googleSignIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;

      validatePassword(password);

      if (passwordError) {
        // Display an error message for an invalid password
        return;
      }

      // Call your login function with email and password
      await login(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();

      // Access the user's name and email from the Google sign-in result
      const { displayName, email } = result.user;
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <>
      <div className="relative min-h-[100vh] flex flex-col items-center justify-center">
        <div className="fixed top-0 w-full">
          <SecondaryNav />
        </div>

        <div className="container mx-auto mt-20">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-500 w-full md:w-2/5 mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-2 rounded-md bg-opacity-50 backdrop-blur-md"
          >
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

            {/* Password */}
            <div className="mb-4 col-span-2 w-full">
              <label htmlFor="password" className="block text-white font-bold">
                Password
              </label>
              <div className="relative bg-white rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", { required: true })}
                  className="input input-bordered w-full pr-10"
                  onChange={(e) => validatePassword(e.target.value)}
                  placeholder="Password"
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

            {/* Submit Button */}
            <div className="mb-4 col-span-2">
              <input
                type="submit"
                value="Login"
                className="btn btn-primary w-full"
              />
            </div>

            {/* Google Login */}
            <div className="col-span-1 md:col-span-2 text-white">
              <div className="divider">OR</div>
              <div className="flex flex-col justify-center text-center">
                <div className="col-span-2 mx-auto">
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded py-2 px-4 flex items-center justify-center gap-4 hover:bg-red-600 mt-2"
                    onClick={handleGoogleLogin}
                  >
                    <FaGoogle /> Login with Google
                  </button>
                </div>
                <div className="text-white my-4">
                  {"Don't have an account?"}
                  <Link
                    href="/signup"
                    className="text-blue-500 hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
