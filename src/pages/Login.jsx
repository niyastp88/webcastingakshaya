import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const [data, setData] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(loginAdmin(data));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4 relative">
      {/*  Top Left Link  */}
      <Link to="/" className="absolute top-4 left-4">
        <span className="bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-sm sm:text-base font-medium hover:bg-white/30 transition shadow-sm">
          ← Registration Form
        </span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Akshaya Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              required
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
