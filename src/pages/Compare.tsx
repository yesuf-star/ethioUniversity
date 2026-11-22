import { useState } from "react";
import { useUniversities } from "../hooks/useUniversities";
import UniversityCard from "../components/UniversityCard";
import UniversityCardSkeleton from "../components/UniversityCardSkeleton";
import { getUniversityFacilities } from "../utils/facilityDefaults";

export default function Compare() {
  const { mergedUniversities, loading } = useUniversities();
  const [selectedIdA, setSelectedIdA] = useState<string>(
    mergedUniversities[0]?.id || ""
  );
  const [selectedIdB, setSelectedIdB] = useState<string>(
    mergedUniversities[1]?.id || ""
  );

  const uniA =
    mergedUniversities.find((u) => u.id === selectedIdA) ||
    mergedUniversities[0];
  const uniB =
    mergedUniversities.find((u) => u.id === selectedIdB) ||
    mergedUniversities[1];

  const facA = uniA ? getUniversityFacilities(uniA) : null;
  const facB = uniB ? getUniversityFacilities(uniB) : null;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Side-by-Side Comparison
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-1.5">
          Select any two Ethiopian universities to compare their campuses, generations, historical cut-offs, water accessibility, and living conditions directly.
        </p>
      </div>

      {/* Institution Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            First Institution (Uni A)
          </label>
          <select
            value={selectedIdA || uniA?.id}
            onChange={(e) => setSelectedIdA(e.target.value)}
            className="w-full p-4 rounded-2xl border border-slate-300 bg-white font-bold text-slate-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-xs"
          >
            {mergedUniversities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.generation})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Second Institution (Uni B)
          </label>
          <select
            value={selectedIdB || uniB?.id}
            onChange={(e) => setSelectedIdB(e.target.value)}
            className="w-full p-4 rounded-2xl border border-slate-300 bg-white font-bold text-slate-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
          >
            {mergedUniversities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.generation})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comprehensive Differentiating Comparison Table */}
      {uniA && uniB && facA && facB && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md overflow-x-auto space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span>⚖️ Detailed 12+ Point Direct Head-to-Head Criteria</span>
            </h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
              Grade 12 Decision Metric
            </span>
          </div>

          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="py-4 px-4 text-xs sm:text-sm font-extrabold uppercase text-slate-600 tracking-wider bg-slate-50/80 rounded-tl-2xl w-1/4">
                  Criteria
                </th>
                <th className="py-4 px-4 text-sm sm:text-base font-black text-sky-800 bg-sky-50/70 w-[37.5%]">
                  {uniA.name}
                  <span className="block text-[11px] font-semibold text-sky-600 font-sans mt-0.5">
                    📍 {uniA.city} • {uniA.generation}
                  </span>
                </th>
                <th className="py-4 px-4 text-sm sm:text-base font-black text-indigo-800 bg-indigo-50/70 rounded-tr-2xl w-[37.5%]">
                  {uniB.name}
                  <span className="block text-[11px] font-semibold text-indigo-600 font-sans mt-0.5">
                    📍 {uniB.city} • {uniB.generation}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm sm:text-base font-medium text-slate-700">
              {/* 1. Generation Tier */}
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  🏛️ Generation Tier
                </td>
                <td className="py-3.5 px-4 font-bold text-sky-900">
                  <span className="inline-block px-3 py-1 rounded-xl bg-sky-100/80 text-sky-800 text-xs sm:text-sm font-extrabold">
                    {uniA.generation}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-indigo-900">
                  <span className="inline-block px-3 py-1 rounded-xl bg-indigo-100/80 text-indigo-800 text-xs sm:text-sm font-extrabold">
                    {uniB.generation}
                  </span>
                </td>
              </tr>

              {/* 2. Established Year */}
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  📅 Established Year
                </td>
                <td className="py-3.5 px-4 text-slate-800 font-semibold">
                  {uniA.establishedYear} (Maturity: {new Date().getFullYear() - uniA.establishedYear} years)
                </td>
                <td className="py-3.5 px-4 text-slate-800 font-semibold">
                  {uniB.establishedYear} (Maturity: {new Date().getFullYear() - uniB.establishedYear} years)
                </td>
              </tr>

              {/* 3. Distance from Addis Ababa */}
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  🚗 Distance from Addis Ababa
                </td>
                <td className="py-3.5 px-4 text-slate-900 font-bold">
                  {uniA.distanceFromAddis} km
                </td>
                <td className="py-3.5 px-4 text-slate-900 font-bold">
                  {uniB.distanceFromAddis} km
                </td>
              </tr>

              {/* 4. Climate & Temperature */}
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  🌤️ Climate & Temperature
                </td>
                <td className="py-3.5 px-4 text-slate-800">
                  {uniA.climate}
                </td>
                <td className="py-3.5 px-4 text-slate-800">
                  {uniB.climate}
                </td>
              </tr>

              {/* 5. Natural Science Cut-Off */}
              <tr className="hover:bg-slate-50/60 transition bg-emerald-50/30">
                <td className="py-3.5 px-4 font-bold text-emerald-950">
                  🧪 Natural Science Cut-Off
                </td>
                <td className="py-3.5 px-4 font-extrabold text-base sm:text-lg text-emerald-700">
                  {uniA.minCutOff.natural}+
                </td>
                <td className="py-3.5 px-4 font-extrabold text-base sm:text-lg text-emerald-700">
                  {uniB.minCutOff.natural}+
                </td>
              </tr>

              {/* 6. Social Science Cut-Off */}
              <tr className="hover:bg-slate-50/60 transition bg-indigo-50/30">
                <td className="py-3.5 px-4 font-bold text-indigo-950">
                  📚 Social Science Cut-Off
                </td>
                <td className="py-3.5 px-4 font-extrabold text-base sm:text-lg text-indigo-700">
                  {uniA.minCutOff.social > 0 ? `${uniA.minCutOff.social}+` : "N/A (Engineering/Tech Focus)"}
                </td>
                <td className="py-3.5 px-4 font-extrabold text-base sm:text-lg text-indigo-700">
                  {uniB.minCutOff.social > 0 ? `${uniB.minCutOff.social}+` : "N/A (Engineering/Tech Focus)"}
                </td>
              </tr>

              {/* 7. Water & Shower Reliability */}
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  💧 Water Access & Showers
                </td>
                <td className="py-3.5 px-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {facA.waterSupply}
                </td>
                <td className="py-3.5 px-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {facB.waterSupply}
                </td>
              </tr>

              {/* 8. Wi-Fi & Internet Infrastructure */}
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  📶 Wi-Fi & E-Library Access
                </td>
                <td className="py-3.5 px-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {facA.wifi}
                </td>
                <td className="py-3.5 px-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {facB.wifi}
                </td>
              </tr>

              {/* 9. Standby Generator & Power */}
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  ⚡ Power Outages & Generator
                </td>
                <td className="py-3.5 px-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {facA.electricity}
                </td>
                <td className="py-3.5 px-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {facB.electricity}
                </td>
              </tr>

              {/* 10. Student Population Size */}
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  👥 Student Body Size
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  {uniA.studentPopulation || "15,000+"}
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  {uniB.studentPopulation || "15,000+"}
                </td>
              </tr>

              {/* 11. Key Academic Programs */}
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  🎓 Leading Departments
                </td>
                <td className="py-3.5 px-4 text-xs sm:text-sm text-slate-700">
                  {uniA.departments?.slice(0, 4).join(", ") || "Engineering, Health, Natural Sciences"}
                </td>
                <td className="py-3.5 px-4 text-xs sm:text-sm text-slate-700">
                  {uniB.departments?.slice(0, 4).join(", ") || "Engineering, Health, Natural Sciences"}
                </td>
              </tr>

              {/* 12. Healthcare & Hospital */}
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  🏥 Health Clinic & Hospital
                </td>
                <td className="py-3.5 px-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {facA.healthcare}
                </td>
                <td className="py-3.5 px-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {facB.healthcare}
                </td>
              </tr>

              {/* 13. Surrounding Town & Languages */}
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  🌍 Local Town & Languages
                </td>
                <td className="py-3.5 px-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Languages:</strong>{" "}
                  {uniA.community?.primaryLanguages?.join(", ") || "Amharic, English"}
                  <br />
                  <span className="text-slate-500 mt-1 block">
                    {uniA.community?.marketAccess || "Commercial town access"}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Languages:</strong>{" "}
                  {uniB.community?.primaryLanguages?.join(", ") || "Amharic, English"}
                  <br />
                  <span className="text-slate-500 mt-1 block">
                    {uniB.community?.marketAccess || "Commercial town access"}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Directory-Style Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UniversityCardSkeleton />
          <UniversityCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {uniA && <UniversityCard university={uniA} index={0} />}
          {uniB && <UniversityCard university={uniB} index={1} />}
        </div>
      )}
    </div>
  );
}
