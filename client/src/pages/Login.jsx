import { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-3 manrope">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">
          <div className="mb-5 text-center">
            <h2 className="text-2xl font-semibold text-blue-600">
              Welcome back 👋
            </h2>
            <p className="text-gray-500 text-sm">Log in to continue</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                autoComplete="off"
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-3 pt-4.5 pb-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <label
                className="absolute left-3 top-2 text-xs text-gray-500 transition-all
                peer-placeholder-shown:top-3.5 
                peer-placeholder-shown:text-sm 
                peer-placeholder-shown:text-gray-400
                peer-focus:top-2 
                peer-focus:text-xs 
                peer-focus:text-blue-500
                peer-not-placeholder-shown:top-2 
                peer-not-placeholder-shown:text-xs"
              >
                 admin@gmail.com
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                autoComplete="new-password"
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-3 pt-4.5  pb-2 pr-10 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <label
                className="absolute left-3 top-2 text-xs text-gray-500 transition-all
                peer-placeholder-shown:top-3.5 
                peer-placeholder-shown:text-sm 
                peer-placeholder-shown:text-gray-400
                peer-focus:top-2 
                peer-focus:text-xs 
                peer-focus:text-blue-500
                peer-not-placeholder-shown:top-2 
                peer-not-placeholder-shown:text-xs"
              >
                mahi@07
              </label>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 rounded-4xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Log In
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </motion.div>

      <style>
        {`
          input::-ms-reveal,
          input::-ms-clear {
            display: none;
          }

          input[type="password"]::-webkit-credentials-auto-fill-button {
            display: none !important;
          }
        `}
      </style>
    </div>
  );
}
