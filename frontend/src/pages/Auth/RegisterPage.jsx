import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../Services/authService.js";
import { BrainCircuit, Mail, Lock,User, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      toast.error("Password must be at least 6 characters long");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await authService.register(username, email, password);
      toast.success("Registered successfully! Please Login");
      navigate("/login");
    } catch (error) {
      setError(
        error.message || "Failed to register.Please try again",
      );
      toast.error(error.message || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fafafa] font-sans relative overflow-hidden">
      {/* Background dot pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>

      <div className="relative z-10 w-full max-w-[420px] px-6 flex flex-col items-center">
        {/* Card */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full p-8 sm:p-10 mb-8 border border-gray-100">

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-[#05a676] p-3.5 rounded-[1.25rem] shadow-[0_8px_16px_rgba(5,166,118,0.3)] mb-5">
              <BrainCircuit className="w-8 h-8 text-white relative z-10" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Create an account</h1>
            <p className="text-gray-500 text-sm">Start your AI-powered learning experience</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Username field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 tracking-wider">USERNAME</label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === "username" ? "text-[#05a676]" : "text-gray-400"}`}
                >
                  <User className="h-5 w-5" strokeWidth={2} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                  className={`block w-full pl-12 pr-4 py-3 border border-2 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#05a676] sm:text-sm transition-all duration-200 outline-none ${focusedField === "username" ? "border-[#05a676]" : "border-gray-200"}`}
                  placeholder="yourusername"
                  required
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 tracking-wider">EMAIL</label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === "email" ? "text-[#05a676]" : "text-gray-400"}`}
                >
                  <Mail className="h-5 w-5" strokeWidth={2} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`block w-full pl-12 pr-4 py-3 border border-2 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#05a676] sm:text-sm transition-all duration-200 outline-none ${focusedField === "email" ? "border-[#05a676]" : "border-gray-200"}`}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 tracking-wider">PASSWORD</label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === "password" ? "text-[#05a676]" : "text-gray-400"}`}
                >
                  <Lock className="h-5 w-5" strokeWidth={2} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className={`block w-full pl-12 pr-4 py-3 border border-2 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#05a676] sm:text-sm transition-all duration-200 outline-none ${focusedField === "password" ? "border-[#05a676]" : "border-gray-200"}`}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="text-center">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-[#0aa676] hover:bg-[#088c63] text-white font-medium py-3.5 px-4 rounded-xl shadow-[0_8px_16px_rgba(10,166,118,0.25)] transition-all duration-200 transform hover:-translate-y-0.5 mt-2 flex items-center justify-center"
            >
              <span className="text-[15px]">{loading ? "Creating account..." : "Create account"}</span>
              {!loading && <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={2} />}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 mb-6 border-t border-gray-100 w-full max-w-[85%] mx-auto"></div>

          {/* Footer inside card */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#05a676] hover:text-[#048861] font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer outside card */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};


export default RegisterPage