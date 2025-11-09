import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
//import { toast } from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Handle form submission
    const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:5000/user/login", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          //
          toast.success("Login Successful!");
          document.getElementById("my_modal_3").close();
          setTimeout(() => {
        window.location.reload();
      }, 1000);
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <>
      {/* Open Modal Button */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Login
      </button>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box text-white">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* Close button */}
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>

            <h1 className="mt-5 mb-5 text-xl font-semibold">Please Log In</h1>

            {/* Email */}
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mb-2 px-4 py-3 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-300 mb-2">{errors.email.message}</p>
            )}

            {/* Password */}
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mb-4 px-4 py-3 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-300 mb-2">{errors.password.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all"
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-white/80 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-300 hover:text-purple-100 font-medium"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </dialog>
    </>
  );
}

export default Login;
