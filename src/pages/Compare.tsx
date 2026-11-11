import { useState } from "react";
import { useUniversities } from "../hooks/useUniversities";

export default function Compare() {
  const { mergedUniversities } = useUniversities();
  const [selectedIdA, setSelectedIdA] = useState<string>(
    mergedUniversities[0]?.id || "",
  );
  const [selectedIdB, setSelectedIdB] = useState<string>(
    mergedUniversities[1]?.id || "",
  );

  const uniA = mergedUniversities.find((u) => u.id === selectedIdA);
  const uniB = mergedUniversities.find((u) => u.id === selectedIdB);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Side-by-Side Comparison
        </h1>
        <p className="text-sm sm:text-base text-slate-800 mt-1">
          Select two Ethiopian universities to compare parameters directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={selectedIdA}
          onChange={(e) => setSelectedIdA(e.target.value)}
          className="p-3.5 rounded-2xl border border-slate-200 bg-white font-semibold text-slate-800 cursor-pointer"
        >
          {mergedUniversities.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <select
          value={selectedIdB}
          onChange={(e) => setSelectedIdB(e.target.value)}
          className="p-3.5 rounded-2xl border border-slate-200 bg-white font-semibold text-slate-800 cursor-pointer"
        >
          {mergedUniversities.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[uniA, uniB].map((uni, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4"
          >
            {uni ? (
              <>
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-sky-600 uppercase">
                    {uni.generation}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {uni.name}
                  </h3>
                  <p className="text-xs text-slate-500">{uni.amharicName}</p>
                </div>

                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-400">Rating:</span>
                    <span className="font-semibold">⭐ {uni.rating} / 5</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-400">Established:</span>
                    <span className="font-semibold">{uni.establishedYear}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-semibold">{uni.city}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-400">Climate:</span>
                    <span className="font-semibold">{uni.climate}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-400">Natural Cut-Off:</span>
                    <span className="font-semibold text-emerald-600">
                      {uni.minCutOff.natural}+
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Social Cut-Off:</span>
                    <span className="font-semibold text-indigo-600">
                      {uni.minCutOff.social > 0
                        ? `${uni.minCutOff.social}+`
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-slate-400 text-center py-8">
                Select a university above
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
