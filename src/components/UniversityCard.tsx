// src/components/UniversityCard.tsx
import { useState } from "react";
import type { University } from "../types/university";

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
      .slice(0, 2)
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
    : "Local Churches and Mosques";

  const campusList = university.campuses?.length
    ? university.campuses
    : [
        {
          name: `${university.name || "Main"} Campus`,
          isMain: true,
          googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(university.name || "Ethiopia")}`,
          contactNumber: "+251 11 000 0000",
        },
      ];

  // Extract YouTube ID
  const videoId = getYouTubeId(university.videoUrl);

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
        <div className="w-34 h-34 rounded-full border border-slate-200/80 p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden">
          {!imgError && university.logoUrl ? (
            <img
              src={university.logoUrl}
              alt={`${university.name} Logo`}
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-linear-to-tr from-sky-600 to-blue-800 flex items-center justify-center text-white font-extrabold text-lg shadow-inner">
              {getInitials(university.name)}
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
            {showDetails ? "↑ Hide Details" : "↓ Show Details"}
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

      {/* EXPANDABLE DETAILS SECTION */}
      {showDetails && (
        <div className="bg-white/40 border-t border-slate-200/60 p-6 rounded-b-3xl space-y-6 text-left backdrop-blur-xs">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/60 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Distance to AA
              </div>
              <div className="text-base font-extrabold text-sky-700">
                {university.distanceFromAddis ?? 200} km
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/60 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Focus Level
              </div>
              <div className="text-xs font-bold text-slate-800 pt-0.5 leading-tight">
                {university.level || "Higher Education"}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/60 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Students
              </div>
              <div className="text-base font-extrabold text-slate-900">
                {university.studentPopulation || "15,000+"}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/60 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Climate
              </div>
              <div className="text-xs font-bold text-slate-800 pt-0.5">
                {university.climate || "Moderate (18°C)"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Community Context */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  🌍 Community & Local Context
                </h4>
                <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/60 text-xs space-y-2 text-slate-700 shadow-xs">
                  <div>
                    <strong>Languages:</strong> {languages}
                  </div>
                  <div>
                    <strong>Markets:</strong> {markets}
                  </div>
                  <div>
                    <strong>Worship Facilities:</strong> {worship}
                  </div>
                </div>
              </div>

              {/* 📹 Campus Video Tour Snapshot Section */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  📹 Campus Video Tour
                </h4>
                {videoId ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200/60 shadow-md">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`${university.name} Video Tour`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/60 text-xs text-slate-400 font-semibold text-center shadow-xs">
                    No video tour available for this institution.
                  </div>
                )}
              </div>
            </div>

            {/* Campuses & Contacts */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                📍 Campuses ({campusList.length}) & Contacts
              </h4>
              <div className="space-y-2">
                {campusList.map((campus, idx) => (
                  <div
                    key={idx}
                    className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">
                        {campus.name}
                      </div>
                      <div className="text-slate-400 text-[10px]">
                        {campus.isMain ? "Main Campus" : "Branch Campus"}
                      </div>
                      {campus.contactNumber && (
                        <div className="text-sky-700 font-medium text-[11px] mt-0.5">
                          📞 {campus.contactNumber}
                        </div>
                      )}
                      {/* Telegram Channel Link */}
                      {campus.telegramUrl && (
                        <div className="mt-1">
                          <a
                            href={campus.telegramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200/80 hover:bg-sky-100 font-bold text-[10px] transition"
                          >
                            ✈️ Join Telegram Channel
                          </a>
                        </div>
                      )}
                    </div>
                    <a
                      href={campus.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block self-start sm:self-center px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-[11px] hover:bg-emerald-100 transition"
                    >
                      Map Location ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState } from 'react';
// import type{ University } from '../types/university';

// interface Props {
//   university: University;
//   index?: number;
//   onCompareToggle?: (uni: University) => void;
//   isCompared?: boolean;
// }

// const CARD_BG_GRADIENTS = [
//   'bg-gradient-to-br from-slate-50 to-sky-300/70 border-sky-100',
//   'bg-gradient-to-br from-slate-50 to-indigo-500/70 border-indigo-100',
//   'bg-gradient-to-br from-slate-50 to-emerald-500/70 border-emerald-100',
//   'bg-gradient-to-br from-slate-50 to-amber-500/70 border-amber-100',
//   'bg-gradient-to-br from-slate-50 to-rose-500/70 border-rose-100',
//   'bg-gradient-to-br from-slate-50 to-cyan-500/70 border-cyan-100',
//   'bg-gradient-to-br from-slate-50 to-purple-500/70 border-purple-100',
// ];

// export default function UniversityCard({ university, index = 0, onCompareToggle, isCompared }: Props) {
//   const [showDetails, setShowDetails] = useState(false);
//   const [imgError, setImgError] = useState(false);

//   const bgStyle = CARD_BG_GRADIENTS[index % CARD_BG_GRADIENTS.length];

//   const getInitials = (name: string) => {
//     return (name || 'University')
//       .split(' ')
//       .filter(w => !['of', 'and', 'the'].includes(w.toLowerCase()))
//       .slice(0, 2)
//       .map(w => w[0])
//       .join('')
//       .toUpperCase();
//   };

//   // Safe Fallback Extractors
//   const naturalCutOff = university.minCutOff?.natural ?? 330;
//   const socialCutOff = university.minCutOff?.social ?? 0;
//   const languages = university.community?.primaryLanguages?.length
//     ? university.community.primaryLanguages.join(', ')
//     : 'Amharic, English';
//   const markets = university.community?.marketAccess || 'Local town commercial district';
//   const worship = university.community?.religiousFacilities?.length
//     ? university.community.religiousFacilities.join(', ')
//     : 'Local Churches and Mosques';

//   const campusList = university.campuses?.length
//     ? university.campuses
//     : [
//         {
//           name: `${university.name || 'Main'} Campus`,
//           isMain: true,
//           googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(university.name || 'Ethiopia')}`,
//           contactNumber: '+251 11 000 0000'
//         }
//       ];

//   return (
//     <div
//       className={`rounded-3xl border ${bgStyle} shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col group ${
//         showDetails ? 'md:col-span-2 lg:col-span-3 ring-2 ring-sky-400' : ''
//       }`}
//     >
//       {/* HEADER CONTAINER */}
//       <div className="relative pt-12 pb-4 px-4 flex flex-col items-center justify-center border-b border-slate-200/50 bg-white/50 backdrop-blur-xs rounded-t-3xl">

//         {/* TOP ROW BADGES */}
//         <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
//           <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-900 text-white tracking-wider shadow-xs">
//             {university.generation || 'Public'}
//           </span>

//           <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white text-amber-800 border border-amber-200/80 shadow-xs">
//             ⭐ {university.rating || 4.0}
//           </span>
//         </div>

//         {/* LOGO FRAME */}
//         <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200/80 p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden">
//           {!imgError && university.logoUrl ? (
//             <img
//               src={university.logoUrl}
//               alt={`${university.name} Logo`}
//               className="w-full h-full object-contain"
//               onError={() => setImgError(true)}
//               loading="lazy"
//             />
//           ) : (
//             <div className="w-full h-full rounded-xl bg-linear-to-tr from-sky-600 to-blue-800 flex items-center justify-center text-white font-extrabold text-lg shadow-inner">
//               {getInitials(university.name)}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* CARD BODY */}
//       <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
//         <div className="text-center space-y-1">
//           <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
//             {university.name}
//           </h3>
//           <p className="text-xs font-semibold text-slate-500">{university.amharicName || 'የኢትዮጵያ ዩኒቨርሲቲ'}</p>

//           <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
//             <span className="text-xs font-medium text-slate-600">📍 {university.city || 'Ethiopia'}</span>
//             <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/80 text-slate-800 border border-slate-200/80 shadow-xs">
//               🚗 {university.distanceFromAddis ?? 200} km from AA
//             </span>
//           </div>
//         </div>

//         {/* CUT-OFF SUMMARY */}
//         <div className="bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/60 text-xs flex justify-between items-center font-medium shadow-xs">
//           <span className="text-emerald-700">Natural: <strong>{naturalCutOff}+</strong></span>
//           <span className="text-indigo-700">Social: <strong>{socialCutOff > 0 ? `${socialCutOff}+` : 'N/A'}</strong></span>
//         </div>

//         {/* ACTIONS */}
//         <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/50">
//           <button
//             type="button"
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowDetails((prev) => !prev);
//             }}
//             className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
//               showDetails
//                 ? 'bg-slate-900 text-white'
//                 : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200/60'
//             }`}
//           >
//             {showDetails ? '↑ Hide Details' : '↓ Show Details'}
//           </button>

//           {onCompareToggle ? (
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onCompareToggle(university);
//               }}
//               className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
//                 isCompared
//                   ? 'bg-amber-500 text-white'
//                   : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200/60'
//               }`}
//             >
//               {isCompared ? 'Added' : '+ Compare'}
//             </button>
//           ) : (
//             <a
//               href={university.website || '#'}
//               target="_blank"
//               rel="noreferrer"
//               className="w-full text-center py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-white/80 hover:bg-white border border-slate-200/60 transition flex items-center justify-center gap-1"
//             >
//               Official Site ↗
//             </a>
//           )}
//         </div>
//       </div>

//       {/* 🟢 EXPANDABLE DETAILS SECTION */}
//       {showDetails && (
//         <div className="bg-white/90 border-t border-slate-200/80 p-6 rounded-b-3xl space-y-6 text-left">

//           {/* Key Metrics Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//             <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
//               <div className="text-[10px] font-bold text-slate-400 uppercase">Distance to AA</div>
//               <div className="text-base font-extrabold text-sky-700">{university.distanceFromAddis ?? 200} km</div>
//             </div>
//             <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
//               <div className="text-[10px] font-bold text-slate-400 uppercase">Focus Level</div>
//               <div className="text-xs font-bold text-slate-800 pt-0.5 leading-tight">{university.level || 'Higher Education'}</div>
//             </div>
//             <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
//               <div className="text-[10px] font-bold text-slate-400 uppercase">Students</div>
//               <div className="text-base font-extrabold text-slate-900">{university.studentPopulation || '15,000+'}</div>
//             </div>
//             <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
//               <div className="text-[10px] font-bold text-slate-400 uppercase">Climate</div>
//               <div className="text-xs font-bold text-slate-800 pt-0.5">{university.climate || 'Moderate (18°C)'}</div>
//             </div>
//           </div>

//           {/* Context and Campuses Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
//                 🌍 Community & Local Context
//               </h4>
//               <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200/60 text-[1rem] space-y-2 text-slate-700">
//                 <div><strong>Languages:</strong> {languages}</div>
//                 <div><strong>Markets:</strong> {markets}</div>
//                 <div><strong>Worship Facilities:</strong> {worship}</div>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
//                 📍 Campuses ({campusList.length}) & Contacts
//               </h4>
//               <div className="space-y-2">
//                 {campusList.map((campus, idx) => (
//                   <div key={idx} className="bg-slate-100 p-3.5 rounded-2xl border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[1rem]">
//                     <div>text
//                       <div className="font-bold text-slate-900">{campus.name}</div>
//                       <div className="text-slate-400 text-[10px]">{campus.isMain ? 'Main Campus' : 'Branch Campus'}</div>
//                       {campus.contactNumber && (
//                         <div className="text-sky-700 font-medium text-[11px] mt-0.5">
//                           📞 {campus.contactNumber}
//                         </div>
//                       )}
//                     </div>
//                     <a
//                       href={campus.googleMapsUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="inline-block self-start sm:self-center px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-[11px] hover:bg-emerald-100 transition"
//                     >
//                       Map Location ↗
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
