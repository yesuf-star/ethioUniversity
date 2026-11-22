import { useState } from "react";
import type { University } from "../types/university";
import { getUniversityFacilities } from "../utils/facilityDefaults";

interface Props {
  university: University;
  index?: number;
  onCompareToggle?: (uni: University) => void;
  isCompared?: boolean;
}

const CARD_BG_GRADIENTS = [
  "bg-gradient-to-br from-slate-50 to-sky-100/70 border-sky-100",
  "bg-gradient-to-br from-slate-50 to-indigo-100/70 border-indigo-100",
  "bg-gradient-to-br from-slate-50 to-emerald-100/70 border-emerald-100",
  "bg-gradient-to-br from-slate-50 to-amber-100/70 border-amber-100",
  "bg-gradient-to-br from-slate-50 to-rose-100/70 border-rose-100",
  "bg-gradient-to-br from-slate-50 to-cyan-100/70 border-cyan-100",
  "bg-gradient-to-br from-slate-50 to-purple-100/70 border-purple-100",
];

// Helper function to extract YouTube Video ID from any URL format
const getYouTubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
  );
  return match ? match[1] : null;
};

export default function UniversityCard({
  university,
  index = 0,
  onCompareToggle,
  isCompared,
}: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [imgError, setImgError] = useState(false);

  const bgStyle = CARD_BG_GRADIENTS[index % CARD_BG_GRADIENTS.length];

  const getInitials = (name: string) => {
    return (name || "University")
      .split(" ")
      .filter((w) => !["of", "and", "the"].includes(w.toLowerCase()))
      .slice(0, 3)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  const naturalCutOff = university.minCutOff?.natural ?? 330;
  const socialCutOff = university.minCutOff?.social ?? 0;
  const languages = university.community?.primaryLanguages?.length
    ? university.community.primaryLanguages.join(", ")
    : "Amharic, English";
  const markets =
    university.community?.marketAccess || "Local town commercial district";
  const worship = university.community?.religiousFacilities?.length
    ? university.community.religiousFacilities.join(", ")
    : "Local Orthodox Churches, Anwar & Local Mosques, Protestant Fellowships";

  const campusList = university.campuses?.length
    ? university.campuses
    : [
        {
          name: `${university.name || "Main"} Campus`,
          isMain: true,
          googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(university.name || "Ethiopia")}`,
          telegramUrl: `https://t.me/${encodeURIComponent((university.name || "EthioUniversity").replace(/\s+/g, "_"))}`,
        },
      ];

  // Extract YouTube ID
  const videoId = getYouTubeId(university.videoUrl);
  const facilities = getUniversityFacilities(university);

  return (
    <div
      className={`rounded-3xl border ${bgStyle} shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col group ${
        showDetails ? "md:col-span-2 lg:col-span-3 ring-2 ring-sky-400" : ""
      }`}
    >
      {/* HEADER CONTAINER */}
      <div className="relative pt-12 pb-4 px-4 flex flex-col items-center justify-center border-b border-slate-200/50 bg-white/50 backdrop-blur-xs rounded-t-3xl">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-900 text-white tracking-wider shadow-xs">
            {university.generation || "Public"}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white text-amber-800 border border-amber-200/80 shadow-xs">
            ⭐ {university.rating || 4.0}
          </span>
        </div>

        {/* LOGO FRAME */}
        <div className="w-28 h-28 rounded-full border-2 border-white/80 p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden bg-white">
          {!imgError && university.logoUrl ? (
            <img
              src={university.logoUrl}
              alt={`${university.name} Logo`}
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-linear-to-tr from-sky-700 via-indigo-700 to-blue-900 flex flex-col items-center justify-center text-white font-black text-sm shadow-inner border border-amber-400/40 p-1">
              <span className="tracking-wider">{getInitials(university.name)}</span>
              <span className="text-[9px] font-mono text-amber-300 font-semibold leading-none mt-0.5">
                EST. {university.establishedYear || "1990"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CARD BODY */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
            {university.name}
          </h3>
          <p className="text-xs font-semibold text-slate-500">
            {university.amharicName || "የኢትዮጵያ ዩኒቨርሲቲ"}
          </p>

          <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
            <span className="text-xs font-medium text-slate-600">
              📍 {university.city || "Ethiopia"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/80 text-slate-800 border border-slate-200/80 shadow-xs">
              🚗 {university.distanceFromAddis ?? 200} km from AA
            </span>
          </div>
        </div>

        {/* CUT-OFF SUMMARY */}
        <div className="bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/60 text-xs flex justify-between items-center font-medium shadow-xs">
          <span className="text-emerald-700">
            Natural: <strong>{naturalCutOff}+</strong>
          </span>
          <span className="text-indigo-700">
            Social:{" "}
            <strong>{socialCutOff > 0 ? `${socialCutOff}+` : "N/A"}</strong>
          </span>
        </div>

        {/* DEPARTMENTS PREVIEW */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Key Programs
          </div>
          <div className="flex flex-wrap gap-1">
            {university.departments?.slice(0, 3).map((dept, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-white/80 rounded-lg text-[10px] font-semibold text-slate-700 border border-slate-200/60"
              >
                {dept}
              </span>
            ))}
            {(university.departments?.length || 0) > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold text-slate-400">
                +{(university.departments?.length || 0) - 3} more
              </span>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/50">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails((prev) => !prev);
            }}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
              showDetails
                ? "bg-slate-900 text-white"
                : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200/60"
            }`}
          >
            {showDetails ? "↑ Hide Details" : "↓ Full Details"}
          </button>

          {onCompareToggle ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCompareToggle(university);
              }}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                isCompared
                  ? "bg-amber-500 text-white"
                  : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200/60"
              }`}
            >
              {isCompared ? "Added" : "+ Compare"}
            </button>
          ) : (
            <a
              href={university.website || "#"}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-white/80 hover:bg-white border border-slate-200/60 transition flex items-center justify-center gap-1"
            >
              Official Site ↗
            </a>
          )}
        </div>
      </div>

      {/* EXPANDABLE FULL DETAILS SECTION */}
      {showDetails && (
        <div className="bg-white/50 border-t border-slate-200/60 p-6 sm:p-8 rounded-b-3xl space-y-8 text-left backdrop-blur-xs">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/60 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Distance to Addis
              </div>
              <div className="text-base font-extrabold text-sky-700">
                {university.distanceFromAddis ?? 200} km
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/60 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Focus Level
              </div>
              <div className="text-xs font-bold text-slate-800 pt-0.5 leading-tight truncate">
                {university.level || "Higher Education"}
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/60 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Student Body
              </div>
              <div className="text-base font-extrabold text-slate-900">
                {university.studentPopulation || "15,000+"}
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/60 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Climate
              </div>
              <div className="text-xs font-bold text-slate-800 pt-0.5">
                {university.climate || "Moderate (18°C)"}
              </div>
            </div>
          </div>

          {/* 🏛️ VITAL CAMPUS LIVING & FACILITIES (Wi-Fi, Water, Power, Dorms, Cafeteria, Health, Transport) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>🏛️ Campus Living, Facilities & Daily Essentials</span>
              </h4>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Vital Student Info
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Wi-Fi & Internet */}
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                  <span className="text-base">📶</span>
                  <span>Wi-Fi & Digital Library</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {facilities.wifi}
                </p>
              </div>

              {/* Water Supply */}
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                  <span className="text-base">💧</span>
                  <span>Water Supply & Sanitation</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {facilities.waterSupply}
                </p>
              </div>

              {/* Electricity & Standby Generators */}
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                  <span className="text-base">⚡</span>
                  <span>Electricity & Standby Generators</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {facilities.electricity}
                </p>
              </div>

              {/* Dormitory Accommodation */}
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                  <span className="text-base">🛏️</span>
                  <span>Dormitory Accommodation</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {facilities.dormitory}
                </p>
              </div>

              {/* Student Cafeteria */}
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                  <span className="text-base">🍽️</span>
                  <span>Student Cafeteria & Dining</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {facilities.cafeteria}
                </p>
              </div>

              {/* Healthcare Clinic */}
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                  <span className="text-base">🏥</span>
                  <span>Health Clinic & Emergency</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {facilities.healthcare}
                </p>
              </div>

              {/* Banking & Transport */}
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                  <span className="text-base">🏧</span>
                  <span>Banking, ATMs & City Transport</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {facilities.bankingAndTransport}
                </p>
              </div>

              {/* Compound Security */}
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                  <span className="text-base">🛡️</span>
                  <span>Compound Security & Atmosphere</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {facilities.security}
                </p>
              </div>
            </div>
          </div>

          {/* TWO COLUMNS: Community & Video Tour on Left / Campuses on Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Community Context */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  🌍 Local Town & Community Context
                </h4>
                <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/70 text-xs space-y-2.5 text-slate-700 shadow-xs">
                  <div>
                    <strong className="text-slate-900">Primary Languages:</strong>{" "}
                    {languages}
                  </div>
                  <div>
                    <strong className="text-slate-900">Local Markets:</strong>{" "}
                    {markets}
                  </div>
                  <div>
                    <strong className="text-slate-900">Worship Centers:</strong>{" "}
                    {worship}
                  </div>
                </div>
              </div>

              {/* 📹 Campus Video Tour Snapshot (2 to 10 Minutes) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    📹 Campus Video Snapshot
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                    2 – 10 Mins Tour
                  </span>
                </div>

                {videoId ? (
                  <div className="space-y-2">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`${university.name} Campus Tour`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>
                    <a
                      href={university.videoUrl || `https://www.youtube.com/watch?v=${videoId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-600 hover:text-sky-700 hover:underline"
                    >
                      <span>▶ Open Video Directly on YouTube ↗</span>
                    </a>
                  </div>
                ) : (
                  <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/70 text-xs text-center space-y-2 shadow-xs">
                    <p className="text-slate-500 font-medium">
                      Explore live student walkthroughs and campus tour videos:
                    </p>
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(university.name + " Ethiopian university campus tour")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition"
                    >
                      ▶ Watch {university.name} Tour on YouTube ↗
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Campuses & Official Telegram Channels */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                📍 Campuses ({campusList.length}) & Telegram Channels
              </h4>
              <div className="space-y-2.5">
                {campusList.map((campus, idx) => {
                  const campusTgLink =
                    campus.telegramUrl ||
                    `https://t.me/${encodeURIComponent(university.name.replace(/\s+/g, "_"))}`;

                  return (
                    <div
                      key={idx}
                      className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-slate-900 text-sm">
                          {campus.name}
                        </div>
                        <div className="text-slate-400 text-[10px] font-semibold">
                          {campus.isMain ? "⭐ Main Campus" : "🏢 Branch Campus"}
                        </div>
                        {/* Telegram Channel Link - Replaces Phone Number for Student Updates */}
                        <div className="pt-1">
                          <a
                            href={campusTgLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/90 font-bold text-[11px] transition shadow-2xs group/tg"
                          >
                            <span className="text-sm">✈️</span>
                            <span>Official Telegram Channel</span>
                            <span className="text-[10px] text-sky-500 group-hover/tg:translate-x-0.5 transition-transform">
                              ↗
                            </span>
                          </a>
                        </div>
                      </div>
                      <a
                        href={campus.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block self-start sm:self-center px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs hover:bg-emerald-100 transition whitespace-nowrap shadow-2xs"
                      >
                        Map Location ↗
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
