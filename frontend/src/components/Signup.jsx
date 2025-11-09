import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate(); // ✅ initialize navigation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:5000/user/signup", userInfo);
      console.log(res.data);

      if (res.data) {
        toast.success("Signup Successful! Please login.");
        localStorage.setItem("Users", JSON.stringify(res.data.user));

        // ✅ redirect after success
        setTimeout(() => {
          navigate("/"); // redirect to homepage or login page
        }, 1000);
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md text-black border border-gray-200">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full mb-2 px-4 py-3 rounded-lg border border-gray-300 
                       text-white placeholder-gray-500 focus:outline-none 
                       focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mb-2">{errors.name.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-2 px-4 py-3 rounded-lg border border-gray-300 
                       text-white placeholder-gray-500 focus:outline-none 
                       focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mb-2">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Create a password"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 
                       text-white placeholder-gray-500 focus:outline-none 
                       focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mb-2">{errors.password.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 rounded-lg text-white font-semibold 
                       hover:bg-blue-700 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
