import { useState } from "react";

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs = [
    {
      id: 1,
      category: "Generations",
      question: "How are Ethiopian University Generations classified?",
      answer:
        "1st Generation universities are long-standing research centers established prior to 2007. 2nd, 3rd, and 4th Generations focus on regional development, applied tech, and specialized fields.",
    },
    {
      id: 2,
      category: "Placement",
      question:
        "How does the Ministry of Education (MoE) run student placement?",
      answer:
        "Placement is calculated based on Grade 12 national exam results, your choice preferences, affirmative action quotas, and university capacity.",
    },
    {
      id: 3,
      category: "Cut-Off Trends",
      question: "Are university cut-off scores fixed every year?",
      answer:
        "No. Cut-off scores vary annually depending on total exam performance distribution and stream competition.",
    },
    {
      id: 4,
      category: "Official Portal",
      question: "Where can I officially verify my university placement?",
      answer:
        "Official placements are published on the Ministry of Education portal at student.ethernet.edu.et.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Ministry Guidelines & FAQ
        </h1>
        <p className="text-sm sm:text-base text-slate-800 mt-1">
          Essential answers regarding university tiers, national cut-offs, and
          official placement portal access.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition cursor-pointer"
              >
                <div>
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                    {faq.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {faq.question}
                  </h3>
                </div>
                <span className="text-xl font-bold text-slate-400">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
