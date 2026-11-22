import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type LoginTab = "moe" | "email";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithMoeId, loginWithEmail } = useAuth();

  const [activeTab, setActiveTab] = useState<LoginTab>("moe");
  const [moeId, setMoeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (activeTab === "moe") {
        if (!moeId.trim()) {
          setErrorMessage("Please enter your Ministry of Education ID.");
          setIsSubmitting(false);
          return;
        }
        const res = await loginWithMoeId(moeId, password);
        if (!res.success) {
          setErrorMessage(res.error || "Login failed. Please check your credentials.");
        } else {
          navigate(from, { replace: true });
        }
      } else {
        if (!email.trim()) {
          setErrorMessage("Please enter your registered email address.");
          setIsSubmitting(false);
          return;
        }
        const res = await loginWithEmail(email, password);
        if (!res.success) {
          setErrorMessage(res.error || "Login failed. Please check your credentials.");
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-4">
      {/* Informational Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-100 p-2 mb-3">
          <img
            src="/logos/ethiopian.jpg"
            alt="Ethiopian Ministry of Education"
            className="w-full h-full object-contain rounded-xl"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Candidate Portal Sign In
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1 max-w-sm mx-auto">
          Sign in to access comprehensive Ethiopian university directories, cut-off calculators, and placement guides.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 text-slate-800">
        {/* Tab switch between MoE ID and Email */}
        <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab("moe");
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === "moe"
                ? "bg-white text-sky-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🪪 MoE Student ID
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("email");
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === "email"
                ? "bg-white text-sky-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ✉️ Email Address
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
            <span className="font-bold text-base leading-none">⚠️</span>
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {activeTab === "moe" ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Ministry of Education ID / Admission Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. MOE-847291 or 8472910"
                  value={moeId}
                  onChange={(e) => setMoeId(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white shadow-xs"
                />
                <span className="absolute right-3.5 top-3 text-slate-400 text-sm">
                  🪪
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                The admission or registration number issued for the Grade 12 National Exam.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white shadow-xs"
                />
                <span className="absolute right-3.5 top-3 text-slate-400 text-sm">
                  ✉️
                </span>
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white shadow-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-linear-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-sm shadow-lg shadow-sky-600/25 transition-all transform active:scale-[0.99] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In & Enter Platform →</span>
            )}
          </button>
        </form>

        {/* Sign up prompt */}
        <div className="mt-6 text-center text-xs text-slate-600 font-medium">
          New Grade 12 candidate?{" "}
          <Link
            to="/signup"
            className="text-sky-600 hover:text-sky-700 font-bold hover:underline"
          >
            Create your Student Account
          </Link>
        </div>
      </div>
    </div>
  );
}
