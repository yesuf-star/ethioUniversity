import { useState, useEffect } from "react";
import type { University, ExternalApiUniversity } from "../types/university";
import { INITIAL_LOCAL_DB } from "../data/localDatabase";

const STORAGE_INTEGRATED_KEY = "ethiopia_uni_portal_integrated_v9";
const STORAGE_API_ONLY_KEY = "ethiopia_uni_portal_api_only_v9";
const API_URL =
  "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";

export function useUniversities() {
  const [mergedUniversities, setMergedUniversities] = useState<University[]>(
    () => {
      try {
        const cached = localStorage.getItem(STORAGE_INTEGRATED_KEY);
        return cached ? (JSON.parse(cached) as University[]) : INITIAL_LOCAL_DB;
      } catch {
        return INITIAL_LOCAL_DB;
      }
    },
  );

  const [apiOnlyUniversities, setApiOnlyUniversities] = useState<University[]>(
    () => {
      try {
        const cached = localStorage.getItem(STORAGE_API_ONLY_KEY);
        return cached ? (JSON.parse(cached) as University[]) : [];
      } catch {
        return [];
      }
    },
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    async function syncUniversityData(): Promise<void> {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Network response error: ${res.status}`);

        const rawData = (await res.json()) as ExternalApiUniversity[];
        const ethiopianRecords = rawData.filter(
          (u: ExternalApiUniversity) => u.country === "Ethiopia",
        );

        const pureApiMapped: University[] = ethiopianRecords.map(
          (item: ExternalApiUniversity, index: number) => ({
            id: `pure-api-${index}`,
            name: item.name,
            amharicName: "የኢትዮጵያ ዩኒቨርሲቲ",
            logoUrl: "",
            website: item.web_pages[0] || "https://ethernet.edu.et",
            city: item["state-province"] || "Ethiopia",
            distanceFromAddis: 250,
            establishedYear: 2005,
            generation: index % 2 === 0 ? "2nd Gen" : "3rd Gen",
            level: "Public University",
            rating: 4.2,
            climate: "Moderate (18°C)",
            minCutOff: { natural: 330, social: 315 },
            departments: [
              "Computer Science",
              "Business Administration",
              "Natural Sciences",
            ],
            studentPopulation: "20,000+",
            community: {
              primaryLanguages: ["Amharic", "English"],
              marketAccess: "Town commercial center",
              religiousFacilities: ["Local churches and mosques"],
            },
            campuses: [
              {
                name: "Main Campus",
                isMain: true,
                googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(item.name)}`,
                contactNumber: "+251 11 000 0000",
              },
            ],
          }),
        );

        setApiOnlyUniversities(pureApiMapped);
        localStorage.setItem(
          STORAGE_API_ONLY_KEY,
          JSON.stringify(pureApiMapped),
        );

        const uniqueUniMap = new Map<string, University>();

        INITIAL_LOCAL_DB.forEach((localItem: University) => {
          const normKey = localItem.name
            .toLowerCase()
            .replace(/university/g, "")
            .trim();
          uniqueUniMap.set(normKey, localItem);
        });

        pureApiMapped.forEach((apiItem: University) => {
          const normKey = apiItem.name
            .toLowerCase()
            .replace(/university/g, "")
            .trim();

          let existingKey: string | undefined;
          for (const key of uniqueUniMap.keys()) {
            if (key.includes(normKey) || normKey.includes(key)) {
              existingKey = key;
              break;
            }
          }

          if (existingKey) {
            const existing = uniqueUniMap.get(existingKey);
            if (existing) {
              uniqueUniMap.set(existingKey, {
                ...existing,
                website:
                  apiItem.website !== "#" &&
                  apiItem.website !== "https://ethernet.edu.et"
                    ? apiItem.website
                    : existing.website,
              });
            }
          } else {
            uniqueUniMap.set(normKey, apiItem);
          }
        });

        const finalMergedList = Array.from(uniqueUniMap.values());
        setMergedUniversities(finalMergedList);
        localStorage.setItem(
          STORAGE_INTEGRATED_KEY,
          JSON.stringify(finalMergedList),
        );
        setIsLive(true);
      } catch {
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    }

    void syncUniversityData();
  }, []);

  return { mergedUniversities, apiOnlyUniversities, loading, isLive };
}
