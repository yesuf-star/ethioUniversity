import { useNavigate } from "react-router-dom";
import { useUniversities } from "../hooks/useUniversities";
import UniversityCard from "../components/UniversityCard";
import UniversityCardSkeleton from "../components/UniversityCardSkeleton";

export default function Home() {
  const navigate = useNavigate();
  const { mergedUniversities, loading } = useUniversities();

  const totalCount = mergedUniversities.length;
  const popularUniversities = mergedUniversities
    .filter((u) => u.isPopular || u.rating >= 4.7)
    .slice(0, 3);

  return (
    <div className="space-y-12">
      {/* HERO SECTION*/}
      <section className="space-y-6 text-white sm:p-10 lg:p-15">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-indigo-950">
          Find Your Target University in Ethiopia
        </h1>

        <p className="text-slate-900 text-base sm:text-lg font-semibold leading-relaxed max-w-xl">
          Data portal for Grade 12 candidates. Compare historical cut-offs,
          generations, locations, and stream options.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/matcher")}
            className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition cursor-pointer"
          >
            ⚡ Match My Exam Score
          </button>
          <button
            type="button"
            onClick={() => navigate("/directory")}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition cursor-pointer"
          >
            🔍 Browse Directory ({totalCount})
          </button>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-extrabold text-sky-600">
            {totalCount}
          </div>
          <div className="text-xs font-medium text-slate-500 mt-1">
            Institutions Covered
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-extrabold text-sky-600">4 Tiers</div>
          <div className="text-xs font-medium text-slate-500 mt-1">
            Generations (1st - 4th)
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-extrabold text-sky-600">2 Streams</div>
          <div className="text-xs font-medium text-slate-500 mt-1">
            Natural & Social Science
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-extrabold text-emerald-600">100%</div>
          <div className="text-xs font-medium text-slate-500 mt-1">
            MoE Alignment
          </div>
        </div>
      </section>

      {/* FEATURED INSTITUTIONS SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Featured Institutions
            </h2>
            <p className="text-base text-slate-800 mt-1">
              High-demand public research universities
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/directory")}
            className="text-sm font-semibold rounded-2xl bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 transition cursor-pointer"
          >
            View All →
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UniversityCardSkeleton />
            <UniversityCardSkeleton />
            <UniversityCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularUniversities.map((uni, idx) => (
              <UniversityCard key={uni.id} university={uni} index={idx} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
