import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { ETHIOPIAN_REGIONS } from "../data/ethiopianRegions";
import type { AcademicStream } from "../types/user";

export default function SignUp() {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Primary mode
  const [registerWith, setRegisterWith] = useState<"moe" | "email">("moe");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [moeId, setMoeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [region, setRegion] = useState("Addis Ababa");
  const [zone, setZone] = useState("Bole Subcity");
  const [customZone, setCustomZone] = useState("");
  const [isCustomZone, setIsCustomZone] = useState(false);
  const [stream, setStream] = useState<AcademicStream>("natural");
  const [score, setScore] = useState<number | "">("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available zones for current region
  const availableZones = useMemo(() => {
    const found = ETHIOPIAN_REGIONS.find((r) => r.region === region);
    return found ? found.zones : [];
  }, [region]);

  // Handle Region Change
  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion);
    setIsCustomZone(false);
    const found = ETHIOPIAN_REGIONS.find((r) => r.region === newRegion);
    if (found && found.zones.length > 0) {
      setZone(found.zones[0]);
    } else {
      setZone("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!moeId.trim()) {
      setErrorMessage("Ministry of Education (MoE) ID card number is required.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    const finalZone = isCustomZone ? customZone.trim() : zone;
    if (!finalZone) {
      setErrorMessage("Please specify your zone or subcity.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await register({
        fullName: fullName.trim(),
        moeId: moeId.trim(),
        email: email.trim(),
        password,
        region,
        zone: finalZone,
        stream,
        score: score === "" ? undefined : Number(score),
        phoneNumber: phoneNumber.trim(),
      });

      if (!res.success) {
        setErrorMessage(res.error || "Failed to create account.");
      } else {
        // Successfully registered and logged in -> redirect to Home page
        navigate("/", { replace: true });
      }
    } catch {
      setErrorMessage("An unexpected error occurred while creating your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      {/* Header */}
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
          Create Grade 12 Student Account
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1 max-w-lg mx-auto">
          Register with your Ministry of Education ID or Email to access all Ethiopian university data, historical cut-offs, and matching tools.
        </p>
      </div>

      {/* Returning user notice */}
      <div className="mb-5 bg-linear-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 border border-sky-400/30 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs text-white">
        <div>
          <span className="font-bold text-sky-300 block">Already created an account?</span>
          <span className="text-slate-200">Sign in directly with your MoE ID or Email.</span>
        </div>
        <Link
          to="/login"
          className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl whitespace-nowrap transition shadow-xs text-xs"
        >
          Sign In Here →
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 text-slate-800">
        {/* Method Switch */}
        <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setRegisterWith("moe")}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              registerWith === "moe"
                ? "bg-white text-sky-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🪪 Register with MoE ID Card
          </button>
          <button
            type="button"
            onClick={() => setRegisterWith("email")}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              registerWith === "email"
                ? "bg-white text-sky-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ✉️ Register with Email
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
            <span className="font-bold text-base leading-none">⚠️</span>
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <span>👤 Candidate Details</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Full Name (as registered with MoE) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Chala Abera Mengistu"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  MoE ID / Admission Card No. *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MOE-928174 or 9281740"
                  value={moeId}
                  onChange={(e) => setMoeId(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Issued on your Grade 12 National Exam admission slip.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address {registerWith === "email" ? "*" : "(Optional)"}
                </label>
                <input
                  type="email"
                  required={registerWith === "email"}
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Location & Academic Profile */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <span>📍 Region, Zone & Academic Stream</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Region */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Region / Administration *
                </label>
                <select
                  value={region}
                  onChange={(e) => handleRegionChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs cursor-pointer"
                >
                  {ETHIOPIAN_REGIONS.map((r) => (
                    <option key={r.region} value={r.region}>
                      {r.region} ({r.amharicName})
                    </option>
                  ))}
                </select>
              </div>

              {/* Zone / Subcity */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Zone / Subcity *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomZone(!isCustomZone)}
                    className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 cursor-pointer"
                  >
                    {isCustomZone ? "Select from list" : "Type other zone"}
                  </button>
                </div>

                {isCustomZone ? (
                  <input
                    type="text"
                    required
                    placeholder="Enter zone name"
                    value={customZone}
                    onChange={(e) => setCustomZone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
                  />
                ) : (
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs cursor-pointer"
                  >
                    {availableZones.map((z) => (
                      <option key={z} value={z}>
                        {z}
                      </option>
                    ))}
                    <option value="Other">Other / Not Listed</option>
                  </select>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stream */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Academic Stream *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStream("natural")}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      stream === "natural"
                        ? "bg-sky-50 border-sky-500 text-sky-800 shadow-xs"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    🧪 Natural Science
                  </button>
                  <button
                    type="button"
                    onClick={() => setStream("social")}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      stream === "social"
                        ? "bg-amber-50 border-amber-500 text-amber-800 shadow-xs"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    📚 Social Science
                  </button>
                </div>
              </div>

              {/* Grade 12 Score */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Exam Score (Optional)
                </label>
                <input
                  type="number"
                  min="200"
                  max="600"
                  placeholder="e.g. 410 (can edit later)"
                  value={score}
                  onChange={(e) => {
                    const val = e.target.value;
                    setScore(val === "" ? "" : Number(val));
                  }}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                placeholder="+251 91 123 4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
              />
            </div>
          </div>

          {/* Security */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <span>🔒 Password Protection</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-600 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-linear-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-sm shadow-lg shadow-sky-600/25 transition-all transform active:scale-[0.99] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account & Enter Platform →</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-600 font-medium">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-sky-600 hover:text-sky-700 font-bold hover:underline"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
