import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../Services/authService.js";
import { useAuth } from "../../components/context/AuthContext.jsx";
import { BrainCircuit, Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("alextest@gmail.com");
  const [password, setPassword] = useState("test@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, user } = await authService.login(email, password);
      login(token, user);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.message || "Failed to login.Please check your credentials",
      );
      toast.error(error.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 linear-to-br from-primary to-secondary">
      <div className=" absolute insert-0 bg-[radial-gradient(#e5eeb,transplant_px)] bg-size [16px_16px] bg-opacity-30 ">
        <div className=" relative  w-full max-w-md px-6">
          <div className=" bg-white/10 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-lg shadow-slate-200">
            {/* Header */}
            <div className=" text-center mb-10">
              <BrainCircuit className=" inline-flex items-center justify-center w-16 h-16 bg-linear-to-bg from-emerald-500 to-primary toteal-500 text-white rounded-full mt-10" strokeWidth={2} />
            </div>
          </div>

          <h1 className="">Welcome Back</h1>
          <p className="">Sign in to continue your journey</p>
        </div>

        {/* form */}
        <div className="">
          {/* Email field */}
          <label className="">Email</label>

          <div className="relative">
            <div
              className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === "email"
                ? "text-emerald-500"
                : "text-slate-400"
                }`}
            >
              <Mail className="h-5 w-5" />
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password field */}
          <label className="">Password</label>

          <div className="relative">
            <div
              className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === "password"
                ? "text-primary"
                : "text-gray-400"
                }`}
            >
              <Lock className="h-5 w-5" strokeWidth={2} />
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="********"
            />
          </div>
        </div>

        {/* error message */}
        {error && (
          <div className="mt-4">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          <span className="flex items-center justify-center">
            {loading ? "Signing in..." : "Sign in"}
            <ArrowRight className="h-5 w-5 ml-2" strokeWidth={2.5} />
          </span>
        </button>


        {/* footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:text-primary/90 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        {/* subtitle footer text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            By continuing you agree to our  Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;
