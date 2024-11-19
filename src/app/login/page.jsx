"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { AuthContext } from "@/providers/firebase/AuthProvider";
import Link from "next/link";
import SecondaryNav from "@/components/pages/HomePage/SecondaryNav";
import { ThemeContext } from "@/providers/colors/GlobalColors";

const Login = () => {
  const { colors } = useContext(ThemeContext);
  const { login, googleSignIn, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validatePassword = (value) => {
    let error = "";
    if (value.length < 6) error = "Password must be at least 6 characters long";
    else if (!/[A-Z]/.test(value))
      error = "Password must contain a capital letter";
    else if (!/[!@#$%^&*]/.test(value))
      error = "Password must contain a special character";

    setPasswordError(error);
    return !error; // Returns true if no error, false otherwise
  };

  const onSubmit = async ({ email, password }) => {
    if (!validatePassword(password)) return; // Stops if password validation fails

    try {
      await login(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative min-h-[100vh] flex flex-col items-center justify-center">
        <div className="fixed top-0 w-full">
          <SecondaryNav />
        </div>

        <div className="container mx-auto mt-20">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-2/5 mx-auto p-4 grid grid-cols-1 gap-2 rounded-md bg-opacity-50 backdrop-blur-md"
            style={{ backgroundColor: colors.mo_primary }}
          >
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-bold">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="input input-bordered input-accent w-full"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="mb-4 w-full">
              <label htmlFor="password" className="block text-white font-bold">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
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
              {passwordError && (
                <span className="text-red-500">{passwordError}</span>
              )}
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <input
                type="submit"
                value="Login"
                className="btn btn-primary w-full"
              />
            </div>

            {/* Google Login */}
            <div className="text-white">
              <div className="divider">OR</div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="bg-red-500 text-white rounded py-2 px-4 flex items-center gap-4 hover:bg-red-600 mt-2"
                  onClick={handleGoogleLogin}
                >
                  <FaGoogle /> Login with Google
                </button>
              </div>
              <div className="text-center mt-4">
                {"Don't have an account?"}
                <Link
                  href="/signup"
                  className="text-blue-500 hover:underline ml-2"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
