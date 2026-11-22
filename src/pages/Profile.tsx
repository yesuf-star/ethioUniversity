import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { ETHIOPIAN_REGIONS } from "../data/ethiopianRegions";
import { useUniversities } from "../hooks/useUniversities";
import type { AcademicStream, UserProfile } from "../types/user";

interface EditFormProps {
  user: UserProfile;
  onSave: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
}

function ProfileEditForm({ user, onSave, onCancel }: EditFormProps) {
  const [fullName, setFullName] = useState(user.fullName);
  const [moeId, setMoeId] = useState(user.moeId);
  const [email, setEmail] = useState(user.email);
  const [region, setRegion] = useState(user.region || "Addis Ababa");
  const [zone, setZone] = useState(user.zone || "Bole Subcity");
  const [customZone, setCustomZone] = useState("");
  const [isCustomZone, setIsCustomZone] = useState(false);
  const [stream, setStream] = useState<AcademicStream>(user.stream || "natural");
  const [score, setScore] = useState<number | "">(user.score ?? "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl || "");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableZones = useMemo(() => {
    const found = ETHIOPIAN_REGIONS.find((r) => r.region === region);
    return found ? found.zones : [];
  }, [region]);

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

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("Image file is too large. Please select a photo under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setAvatarUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Full name cannot be blank.");
      return;
    }

    if (!moeId.trim()) {
      setErrorMessage("Ministry of Education ID is required.");
      return;
    }

    const finalZone = isCustomZone ? customZone.trim() : zone;
    if (!finalZone) {
      setErrorMessage("Please select or enter your zone/subcity.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await onSave({
        fullName: fullName.trim(),
        moeId: moeId.trim(),
        email: email.trim(),
        region,
        zone: finalZone,
        stream,
        score: score === "" ? undefined : Number(score),
        phoneNumber: phoneNumber.trim(),
        avatarUrl: avatarUrl.trim(),
      });

      if (!res.success) {
        setErrorMessage(res.error || "Failed to save profile changes.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
          <span className="font-bold text-base leading-none">⚠️</span>
          <div className="flex-1 font-medium">{errorMessage}</div>
        </div>
      )}

      {/* Profile Photo Upload */}
      <div className="space-y-2 pb-4 border-b border-slate-100">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Student Profile Photo
        </label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl text-slate-400">👤</span>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl cursor-pointer transition shadow-xs">
                <span>📁 Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>
              {avatarUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-xs rounded-xl transition border border-rose-200 cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Upload a clear passport or portrait photo (PNG, JPG under 2MB).
            </p>
          </div>
        </div>
      </div>

      {/* Candidate Details */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Basic Student Details
        </h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
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
              value={moeId}
              onChange={(e) => setMoeId(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Region & Zone (Ethiopia) */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Location: Region & Zone (Ethiopia)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Region *
            </label>
            <select
              value={region}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs cursor-pointer"
            >
              {ETHIOPIAN_REGIONS.map((r) => (
                <option key={r.region} value={r.region}>
                  {r.region} ({r.amharicName})
                </option>
              ))}
            </select>
          </div>

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
                {isCustomZone ? "Select from list" : "Type custom zone"}
              </button>
            </div>

            {isCustomZone ? (
              <input
                type="text"
                required
                placeholder="Enter zone name"
                value={customZone}
                onChange={(e) => setCustomZone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
              />
            ) : (
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs cursor-pointer"
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
      </div>

      {/* Stream & Score */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Academic Stream & Exam Score
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Academic Stream
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
                🧪 Natural
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
                📚 Social
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Exam Score (out of 600)
            </label>
            <input
              type="number"
              min="200"
              max="600"
              placeholder="e.g. 415"
              value={score}
              onChange={(e) => {
                const val = e.target.value;
                setScore(val === "" ? "" : Number(val));
              }}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
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
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-600/25 transition cursor-pointer flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <span>Save Changes</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { mergedUniversities } = useUniversities();

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Calculate matching universities based on user's current score & stream
  const eligibleUniversities = useMemo(() => {
    if (!user || !user.score) return [];
    return mergedUniversities.filter((uni) => {
      const cutOff =
        user.stream === "natural"
          ? uni.minCutOff?.natural
          : uni.minCutOff?.social;
      return cutOff && cutOff > 0 && user.score! >= cutOff;
    });
  }, [user, mergedUniversities]);

  if (!user) {
    return null;
  }

  const handleSave = async (updates: Partial<UserProfile>) => {
    const res = await updateProfile(updates);
    if (res.success) {
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
    return res;
  };

  const initials = user.fullName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Top Banner Alert on Save */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">✅</span>
            <span className="font-semibold">
              Profile updated successfully! Your information and photo have been saved.
            </span>
          </div>
          <button
            onClick={() => setSaveSuccess(false)}
            className="text-emerald-700 hover:text-emerald-900 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Grid: Left Digital ID Card & Quick Stats / Right Details or Edit Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN: Student Digital ID Card Preview */}
        <div className="space-y-6">
          <div className="bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-indigo-500/20 relative overflow-hidden">
            {/* Background Ethiopian Color Accents */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 via-yellow-400 to-red-500" />
            <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />

            {/* MoE Badge & Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-sm flex items-center justify-center">
                  <img
                    src="/logos/ethiopian.jpg"
                    alt="Ethiopia MoE"
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xs font-black tracking-wider text-amber-300 uppercase leading-tight">
                    Federal Dem. Rep. of Ethiopia
                  </h3>
                  <p className="text-[10px] text-slate-300 font-medium">
                    Ministry of Education • Grade 12 Candidate
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                VERIFIED ID
              </span>
            </div>

            {/* Avatar & Student Name */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-lg border-2 border-white/30 shrink-0 overflow-hidden">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  initials || "ST"
                )}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold text-white truncate leading-snug">
                  {user.fullName}
                </h2>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-1 rounded-md bg-white/10 text-white font-mono text-xs font-semibold">
                  <span>ID:</span>
                  <span className="text-amber-300 font-bold">{user.moeId}</span>
                </div>
              </div>
            </div>

            {/* Region & Zone Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-white/10 my-3">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                  Region
                </span>
                <span className="font-semibold text-slate-100 flex items-center gap-1 mt-0.5 truncate">
                  📍 {user.region}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                  Zone / Subcity
                </span>
                <span className="font-semibold text-slate-100 flex items-center gap-1 mt-0.5 truncate">
                  🏙️ {user.zone}
                </span>
              </div>
            </div>

            {/* Stream & Score */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                  Stream
                </span>
                <span className="font-semibold text-sky-300 mt-0.5 inline-block">
                  {user.stream === "natural"
                    ? "🧪 Natural Science"
                    : "📚 Social Science"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                  Exam Score
                </span>
                <span className="font-extrabold text-amber-300 text-sm mt-0.5 inline-block">
                  {user.score ? `${user.score} / 600` : "Not Recorded"}
                </span>
              </div>
            </div>

            {/* Card Footer Barcode mockup */}
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-mono">ETH-G12-{user.moeId}</span>
              <span className="tracking-widest font-mono text-slate-500">
                |||| | ||||| || |||
              </span>
            </div>
          </div>

          {/* Quick Match Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">
                🎓 University Eligibility
              </h3>
              {user.score && (
                <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  {eligibleUniversities.length} Qualified
                </span>
              )}
            </div>

            {user.score ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Based on your score of <strong className="text-slate-900">{user.score}</strong> in{" "}
                  <strong className="text-slate-900 capitalize">{user.stream} Science</strong>, you meet historic cut-off criteria for{" "}
                  <strong className="text-sky-600 font-extrabold">{eligibleUniversities.length}</strong> Ethiopian higher education institutions!
                </p>
                <Link
                  to="/matcher"
                  className="block text-center py-2.5 px-4 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-xl text-xs transition border border-sky-200 cursor-pointer"
                >
                  ⚡ Explore Matched Universities
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Add your Grade 12 entrance exam score to calculate matching universities instantly!
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full text-center py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition cursor-pointer"
                >
                  ✏️ Add Exam Score
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Profile Information or Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {isEditing ? "Edit Student Profile" : "Grade 12 Student Profile"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {isEditing
                    ? "Update your personal details, photo, home region, zone, and entrance exam credentials."
                    : "Manage your Ethiopian Ministry of Education registration details."}
                </p>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>✏️</span>
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <ProfileEditForm
                user={user}
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              /* ================= READ-ONLY VIEW ================= */
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Full Name
                    </span>
                    <span className="text-base font-extrabold text-slate-900 block">
                      {user.fullName}
                    </span>
                  </div>

                  {/* MoE ID Card */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Ministry of Education ID Card
                    </span>
                    <span className="text-base font-mono font-extrabold text-sky-700 block">
                      {user.moeId}
                    </span>
                  </div>

                  {/* Region */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Region / Administration
                    </span>
                    <span className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span>📍</span>
                      <span>{user.region}</span>
                    </span>
                  </div>

                  {/* Zone / Subcity */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Zone / Subcity
                    </span>
                    <span className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span>🏙️</span>
                      <span>{user.zone}</span>
                    </span>
                  </div>

                  {/* Email */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Email Address
                    </span>
                    <span className="text-sm font-medium text-slate-800 break-all block">
                      {user.email || "No email provided"}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Phone Number
                    </span>
                    <span className="text-sm font-medium text-slate-800 block">
                      {user.phoneNumber || "Not specified"}
                    </span>
                  </div>

                  {/* Stream */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Academic Stream
                    </span>
                    <span className="text-sm font-bold text-slate-900 block capitalize">
                      {user.stream === "natural"
                        ? "🧪 Natural Science Stream"
                        : "📚 Social Science Stream"}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Grade 12 Entrance Score
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-emerald-600">
                        {user.score ? user.score : "—"}
                      </span>
                      {user.score && (
                        <span className="text-xs text-slate-500">
                          (out of 600)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Helpful Guide Notice */}
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/80 text-sky-900 text-xs sm:text-sm flex items-start gap-3">
                  <span className="text-lg">💡</span>
                  <div className="leading-relaxed">
                    <strong>Ethiopian Placement Tip:</strong> Your Region (<strong>{user.region}</strong>) and Zone (<strong>{user.zone}</strong>) may determine regional affirmative action or proximity preferences for certain university placements by the Ministry of Education. Keeping this updated ensures accurate guidance.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
