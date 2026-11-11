import { useState, useMemo } from "react";
import { useUniversities } from "../hooks/useUniversities";
import type { GenerationType } from "../types/university";
import UniversityCard from "../components/UniversityCard";

type DataStoreMode = "INTEGRATED" | "PURE_API";

export default function Directory() {
  const { mergedUniversities, apiOnlyUniversities, loading, isLive } =
    useUniversities();

  const [storeMode, setStoreMode] = useState<DataStoreMode>("INTEGRATED");
  const [selectedCategory, setSelectedCategory] =
    useState<GenerationType>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const activeDataset =
    storeMode === "INTEGRATED" ? mergedUniversities : apiOnlyUniversities;

  const filteredUniversities = useMemo(() => {
    return activeDataset.filter((uni) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        uni.name.toLowerCase().includes(q) ||
        uni.city.toLowerCase().includes(q) ||
        uni.amharicName.includes(q) ||
        uni.departments.some((d) => d.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === "ALL" || uni.generation === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [activeDataset, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            University Directory
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${isLive ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
          >
            {isLive ? "● Live API Active" : "○ Offline Cache Mode"}
          </span>
        </div>
        <p className="text-sm font-semibold sm:text-base text-slate-800 mt-2">
          "Explore higher education institutions across Ethiopia with real-time
          campus data, cutoff scores, and local community insights. Filter
          universities by generation, view official Telegram channels and
          websites,locations, nubers of campuses, and more informations search
          by region, or switch between local and cloud datasets to find the
          perfect academic fit."
        </p>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by institution name, city, department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <select
          value={storeMode}
          onChange={(e) => setStoreMode(e.target.value as DataStoreMode)}
          className="px-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold bg-sky-50 text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
        >
          <option value="INTEGRATED">API + Local Integrated Data</option>
          <option value="PURE_API">Pure API Fetched Data Only</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value as GenerationType)
          }
          className="px-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
        >
          <option value="ALL">All Categories & Tiers</option>
          <option value="1st Gen">1st Generation</option>
          <option value="2nd Gen">2nd Generation</option>
          <option value="3rd Gen">3rd Generation</option>
          <option value="4th Gen">4th Generation</option>
          <option value="Specialized">Specialized Institutions</option>
        </select>
      </div>

      <div className="flex justify-between items-center text-xs font-bold text-slate-700 px-1">
        <span>
          Showing {filteredUniversities.length} of {activeDataset.length}{" "}
          Universities
        </span>
        <span>
          Storage Key:{" "}
          {storeMode === "INTEGRATED"
            ? "ethiopia_uni_portal_integrated_v9"
            : "ethiopia_uni_portal_api_only_v9"}
        </span>
      </div>

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-slate-600 animate-pulse">
            Loading university records...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((uni, idx) => (
            <UniversityCard key={uni.id} university={uni} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
