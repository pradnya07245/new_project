import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await registerUser(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-2 manrope">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-[380px]"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            onChange={handleChange}
            className="border p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="admin@gmail.com"
            onChange={handleChange}
            className="border p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="mahi@07"
            onChange={handleChange}
            className="border p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="border p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
            required
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white py-2 rounded-4xl hover:bg-blue-700 transition font-medium"
          >
            Sign Up
          </motion.button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-sm text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
