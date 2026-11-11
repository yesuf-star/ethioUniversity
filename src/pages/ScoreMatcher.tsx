import React, { useState } from "react";
import { useUniversities } from "../hooks/useUniversities";
import type { StreamType, University } from "../types/university";
import UniversityCard from "../components/UniversityCard";

export default function ScoreMatcher() {
  const { mergedUniversities } = useUniversities();
  const [score, setScore] = useState<number | "">("");
  const [stream, setStream] = useState<StreamType>("natural");
  const [matches, setMatches] = useState<University[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (score === "" || Number(score) < 200 || Number(score) > 600) return;

    const numScore = Number(score);

    const filtered = mergedUniversities.filter((u) => {
      const cutOff =
        stream === "natural" ? u.minCutOff?.natural : u.minCutOff?.social;
      return cutOff && cutOff > 0 && numScore >= cutOff;
    });

    setMatches(filtered);
    setHasCalculated(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Grade 12 Score Matcher
        </h1>
        <p className="text-base sm:text-lg text-slate-800">
          Enter your national exam score to find approximately universities
          where your total score meets historic cut-off requirements.
        </p>
      </div>

      <form
        onSubmit={handleMatch}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Grade 12 Score (200 - 600)
            </label>
            <input
              type="number"
              min="200"
              max="600"
              required
              placeholder="e.g. 385"
              value={score}
              onChange={(e) => {
                const val = e.target.value;
                setScore(val === "" ? "" : Number(val));
              }}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Academic Stream
            </label>
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value as StreamType)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-base bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="natural">Natural Science Stream</option>
              <option value="social">Social Science Stream</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition cursor-pointer"
        >
          Calculate Eligible Universities
        </button>
      </form>

      {hasCalculated && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-slate-900">
              Matched Institutions ({matches.length})
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              {stream.toUpperCase()} Stream (Score: {score})
            </span>
          </div>

          {matches.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center text-amber-800 text-sm">
              No universities matched a score of <strong>{score}</strong> for
              the {stream} science stream. Try entering a higher score or
              testing the other stream.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matches.map((uni) => (
                <UniversityCard key={uni.id} university={uni} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
