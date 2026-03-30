import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleShow = (field) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

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
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 manrope">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            onChange={handleChange}
            className="border p-1.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="admin@gmail.com"
            onChange={handleChange}
            className="border p-1.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={show.password ? "password" : "text"}  
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full border p-1.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => toggleShow("password")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
             
              {show.password ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={show.confirmPassword ? "password" : "text"}  
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={handleChange}
              className="w-full border p-1.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => toggleShow("confirmPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {show.confirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white py-2 rounded-4xl hover:bg-blue-700 transition font-medium"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>

      <style>
        {`
          input::-ms-reveal,
          input::-ms-clear {
            display: none;
          }
        `}
      </style>
    </div>
  );
}