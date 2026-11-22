import { useState, useMemo } from "react";

interface FAQItem {
  id: number;
  category:
    | "Preparation & Packing"
    | "University Transfer"
    | "Academic & Departments"
    | "Finances & Cost-Sharing"
    | "Placement & Cut-Offs";
  question: string;
  isCritical?: boolean;
  badgeText?: string;
  answer: string[];
}

const FAQS: FAQItem[] = [
    // ---------------------------------------------------------
    // 5 CRITICAL & IMPORTANT QUESTIONS FOR GRADE 12 CANDIDATES
    // ---------------------------------------------------------
    {
      id: 1,
      category: "Preparation & Packing",
      question:
        "What essential documents, dorm items, and survival gear must a freshman student pack before leaving home?",
      isCritical: true,
      badgeText: "Must-Read for Freshmen",
      answer: [
        "Packing properly prevents severe delays and stress during campus registration week. Prepare the following three essential categories:",
        "📄 Mandatory Official Documents: Bring your original Grade 12 National Exam admission card and result certificate (plus at least 4 clear photocopies), original Grades 9–12 official student transcript with school stamps, your Kebele ID or National Digital ID card, and 8 to 12 passport-sized photographs with a clear white background.",
        "🛏️ Dormitory & Water Survival Essentials: Bring 2 heavy-duty brass/metal padlocks with spare keys (one for your clothing locker, one for your travel suitcase), a 10L–20L plastic jerrycan (jerikan) or bucket for storing morning washing water (critical for universities with scheduled water), plastic bathroom flip-flops (shida), personal cutlery (spoon, fork, mug for hot tea), and clothes hangers.",
        "🧥 Climate-Specific Gear: If assigned to Highland Cold campuses (such as Debre Berhan, Debark, Gondar, Debre Markos, or Mekdela Amba), heavy thermal duvets, thick blankets, hoodies, and woolen socks are mandatory because student dorms have NO room heating and tap water is ice-cold (6°C–10°C). If assigned to Arid Hot campuses (such as Semera/Afar, Jigjiga, Kebri Dehar, Assosa, or Gambella), pack light breathable cotton clothes, a rechargeable portable desk fan, and mosquito netting.",
        "⚡ Power & Electronics: A high-capacity power bank (20,000mAh+) and a rechargeable LED study desk lamp are vital to keep studying during frequent local grid load-shedding and power blackouts.",
      ],
    },
    {
      id: 2,
      category: "University Transfer",
      question:
        "Can I change or transfer to another university after placement results are published? How does mutual swapping work?",
      isCritical: true,
      badgeText: "Placement Rules",
      answer: [
        "Direct one-sided transfer requests are strictly prohibited by the Ministry of Education (MoE) for first-semester freshman students. However, there are two legitimate, recognized pathways:",
        "🔄 1. Official Mutual Transfer (Swapping / ተቀያያሪ): If you find another student assigned to your preferred university who wishes to attend your placed university in the exact same stream (Natural Science to Natural Science, or Social Science to Social Science) with comparable entrance scores, both universities' registrars and the MoE portal can approve a formal mutual swap during the official window before registration closes.",
        "🏥 2. Severe Verified Medical Grounds: If a student suffers from a documented, severe chronic illness that makes living in the assigned university's altitude or climate life-threatening (e.g. chronic severe bronchial asthma triggered by freezing high-altitude climates like Debre Berhan, or acute cardiac conditions), they may submit authenticated medical board certificates from a government referral hospital to the MoE Grievance Committee for relocation.",
        "♿ 3. Severe Physical Mobility Disabilities: Students requiring specialized wheelchair accessibility or family dependence who were inadvertently placed far from essential support structures can appeal through official regional education bureaus.",
        "⚠️ Scam Alert: Beware of Telegram channels or brokers claiming they can 'hack or bribe the MoE database' to change your university. All official placements and transfers require verified institutional registrar authentication.",
      ],
    },
    {
      id: 3,
      category: "Academic & Departments",
      question:
        "How does department selection work after the Freshman Program? When can I enter Medicine, Engineering, or Law?",
      isCritical: true,
      badgeText: "Career Path",
      answer: [
        "Under the current Ethiopian higher education system, Grade 12 students do NOT join specialized departments (such as Medicine, Software Engineering, or Law) on Day 1:",
        "📚 The Common Freshman Program: All entrants enroll in a standardized freshman year program (Freshman Natural Science or Freshman Social Science) taking foundational courses including Calculus, General Physics, Chemistry, Communicative English, Critical Thinking, Logic, Introduction to Computing/Python, Geography, and Psychology.",
        "🎯 Placement Factors at the End of Freshman Year: Competition for departments is rigorous and based on four key metrics:",
        "1. First-Year Cumulative GPA (CGPA): Accounts for 75% to 85% of total selection weight. Highly sought-after fields (Medicine, Software Engineering, Civil Engineering, Architecture, Pharmacy, and Law) typically require CGPAs between 3.65 and 3.90+.",
        "2. Student Preference Ranking: Candidates rank all available faculties in their university by personal preference.",
        "3. Gender Affirmative Action: Female students receive affirmative action percentage points added to their selection scores to promote gender equity in STEM and specialized professions.",
        "4. Emerging Regional State Quotas: Dedicated percentage quotas are reserved for students originating from emerging regional states (Afar, Somali, Benishangul-Gumuz, Gambella, and pastoralist zones).",
      ],
    },
    {
      id: 4,
      category: "Finances & Cost-Sharing",
      question:
        "What are the realistic monthly living expenses, pocket money, and food costs for a university student?",
      isCritical: true,
      badgeText: "Student Budget",
      answer: [
        "Public university education in Ethiopia is heavily subsidized, making basic survival affordable for all students:",
        "🆓 Free Government-Provided Basics: Tuition, dormitory housing, library facilities, and campus primary clinic healthcare are completely free of charge under the national cost-sharing framework while you study.",
        "🍽️ Cafeteria vs Non-Café Option: The subsidized student cafeteria (ካፌ) provides 3 cooked meals every day (breakfast bread with tea; lunch and dinner fresh Injera with Shiro, lentils, vegetables, and scheduled meat dishes; full fasting alternatives). While students can legally opt for 'Non-Café' (receiving a monthly cash refund of approx. 1,000–1,500 ETB), freshman students are strongly advised to remain in the campus cafeteria plan to avoid inflation, cooking hassles, and food market stress.",
        "💵 Recommended Monthly Pocket Money: A personal monthly budget of 1,200 ETB to 2,500 ETB is generally sufficient for everyday necessities: personal toiletries (soap, shampoo, laundry detergent, toothpaste), photocopies/printing of lecture handouts, local Bajaj transport to town, and mobile phone internet data packages.",
        "📱 Telebirr & CBE Birr: Set up an active Commercial Bank of Ethiopia (CBE) account and Telebirr wallet before traveling. Parents and guardians can transfer allowances instantly without inter-bank transaction fees.",
      ],
    },
    {
      id: 5,
      category: "Finances & Cost-Sharing",
      question:
        "How does the Ethiopian Cost Sharing Agreement (የወጪ መጋራት) work and when must it be repaid?",
      isCritical: true,
      badgeText: "Legal Obligation",
      answer: [
        "The Ethiopian Cost Sharing system enables all eligible Grade 12 students to attend higher education regardless of family income:",
        "📝 Signing the Agreement: During freshman registration week, every government-placed student signs a legally binding Cost Sharing Contract with the Ministry of Education. This contract commits the government to pay 100% of your upfront educational, food, and housing expenses during your entire study duration.",
        "⏳ No Payment While Studying: You do NOT pay any money while you are an active student. Repayment only begins after graduation once you gain formal employment in the public or private sector, or establish a registered business.",
        "💼 Repayment Mechanism: Once employed, employers are mandated by law to deduct a fixed percentage (typically 10% of monthly taxable salary) and remit it to the Ethiopian Ministry of Revenues until your designated share (approximately 15% of actual educational costs) is settled.",
        "📜 Diploma Release: Your official original university degree diploma is retained by the university registrar until cost sharing is cleared or an official employer guarantee is filed. A Temporary Certificate of Graduation (ወቅታዊ ምስክር ወረቀት) is issued immediately upon graduation for employment applications.",
      ],
    },

    // ---------------------------------------------------------
    // ESSENTIAL MINISTRY PLACEMENT & GENERAL GUIDELINES
    // ---------------------------------------------------------
    {
      id: 6,
      category: "Placement & Cut-Offs",
      question: "How are Ethiopian University Generations classified?",
      answer: [
        "Ethiopian public universities are grouped into generations based on their establishment history, infrastructure maturity, and research capacity:",
        "🏛️ 1st Generation (Established before 2007): Includes flagship research centers like Addis Ababa University (1950), Jimma University (1999), Bahir Dar University, University of Gondar, Hawassa University, Haramaya University, Arba Minch University, and Mekelle University. They feature mature faculties, specialized referral hospitals, and high historical cut-off scores.",
        "🏢 2nd Generation (Established 2007–2011): Includes Wollo, Debre Berhan, Debre Markos, Wolaita Sodo, Ambo, Wollega, Dire Dawa, Madda Walabu, and Dilla. They provide comprehensive undergraduate and postgraduate programs across major regional centers.",
        "🏫 3rd & 4th Generation (Established 2011–Present): Emerging institutions such as Wolkite, Werabe, Bonga, Jinka, Raya, Injibara, Selale, and Dembi Dolo, designed to expand equitable higher education and regional technological growth.",
        "🔬 Specialized Institutes: Addis Ababa Science & Technology University (AASTU) and Adama Science & Technology University (ASTU), focused specifically on advanced engineering, innovation, and scientific research.",
      ],
    },
    {
      id: 7,
      category: "Placement & Cut-Offs",
      question:
        "How does the Ministry of Education (MoE) determine candidate placement?",
      answer: [
        "University placement is computed algorithmically through the centralized Ministry of Education (MoE) system based on four key inputs:",
        "1. Grade 12 National Exam Scores: Total score out of 600 determines qualification and tier ranking.",
        "2. Student University Choices: When filling out preference forms, candidates submit an ordered list of universities.",
        "3. Stream Distribution: Separation between Natural Science and Social Science capacities.",
        "4. University Quotas & Affirmative Action: Adjustments for female candidates, emerging regional states, and students with special needs.",
      ],
    },
    {
      id: 8,
      category: "Placement & Cut-Offs",
      question: "Are university cut-off scores identical every year?",
      answer: [
        "No. University cut-off points fluctuate each academic year based on:",
        "• National Exam Difficulty: Overall national grade distribution (average passing rates).",
        "• Total Candidate Performance: The volume of candidates scoring above 350, 400, or 450.",
        "• Stream Demand: Fluctuations in interest between engineering, medicine, and social science faculties.",
        "• Institutional Intake Quotas: Annual bed and laboratory capacity allocated by the Ministry to each university.",
      ],
    },
    {
      id: 9,
      category: "Placement & Cut-Offs",
      question: "Where can I officially verify my university placement results?",
      answer: [
        "Official placements are announced exclusively by the Ministry of Education through official channels:",
        "🌐 Official MoE Placement Portal: Access https://student.ethernet.edu.et or https://eaes.et.",
        "📱 SMS Notification: Official MoE SMS broadcast services (e.g., sending your Registration ID to designated shortcodes such as 9444).",
        "✈️ Official Telegram: Verified Ministry of Education announcement channels (@MoE_Ethiopia).",
      ],
    },
  ];

const CATEGORIES = [
  "ALL",
  "Preparation & Packing",
  "University Transfer",
  "Academic & Departments",
  "Finances & Cost-Sharing",
  "Placement & Cut-Offs",
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory =
        selectedCategory === "ALL" || faq.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.some((line) =>
          line.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-3 shadow-2xs">
          <span>🎓</span>
          <span>Grade 12 Candidate Knowledge Base</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ministry Guidelines & Student FAQ
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 leading-relaxed">
          Critical answers regarding freshman survival packing, university mutual swapping, department selection GPAs, living costs, and cost-sharing contracts.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search questions (e.g. packing, transfer, swapping, medicine, cost sharing, water)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3.5 pl-12 rounded-2xl border border-slate-300 text-sm sm:text-base text-gray-700 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-xs"
          />
          <span className="absolute left-4 top-3.5 text-slate-400 text-base">
            🔍
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-3.5 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat === "ALL" ? "All Questions (9)" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Counter & Expand / Collapse actions */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
        <span>
          Showing {filteredFaqs.length} of {FAQS.length} questions
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpenId(null)}
            className="hover:text-slate-800 transition cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
            <span className="text-3xl">🔎</span>
            <h3 className="font-bold text-slate-800 text-base">
              No matching questions found
            </h3>
            <p className="text-xs text-slate-500">
              Try typing different keywords like &quot;transfer&quot;, &quot;packing&quot;, &quot;cut-off&quot;, or &quot;cafeteria&quot;.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                  isOpen
                    ? "border-sky-300 ring-2 ring-sky-100 shadow-md"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex justify-between items-start gap-4 hover:bg-slate-50/70 transition cursor-pointer"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-extrabold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-lg border border-sky-100 uppercase tracking-wider">
                        {faq.category}
                      </span>
                      {faq.isCritical && (
                        <span className="text-[10px] font-extrabold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                          ⭐ {faq.badgeText || "Critical"}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base transition-colors shrink-0 mt-1 ${
                      isOpen
                        ? "bg-sky-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 bg-slate-50/30 animate-fadeIn">
                    {faq.answer.map((para, i) => (
                      <p
                        key={i}
                        className={
                          para.startsWith("•") ||
                          para.startsWith("1.") ||
                          para.startsWith("2.") ||
                          para.startsWith("3.") ||
                          para.startsWith("4.") ||
                          para.startsWith("📄") ||
                          para.startsWith("🛏️") ||
                          para.startsWith("🧥") ||
                          para.startsWith("⚡") ||
                          para.startsWith("🔄") ||
                          para.startsWith("🏥") ||
                          para.startsWith("♿") ||
                          para.startsWith("⚠️") ||
                          para.startsWith("📚") ||
                          para.startsWith("🎯") ||
                          para.startsWith("🆓") ||
                          para.startsWith("🍽️") ||
                          para.startsWith("💵") ||
                          para.startsWith("📱") ||
                          para.startsWith("📝") ||
                          para.startsWith("⏳") ||
                          para.startsWith("💼") ||
                          para.startsWith("📜") ||
                          para.startsWith("🏛️") ||
                          para.startsWith("🏢") ||
                          para.startsWith("🏫") ||
                          para.startsWith("🔬") ||
                          para.startsWith("🌐")
                            ? "pl-2 border-l-2 border-sky-400 py-0.5 text-slate-800 font-medium"
                            : ""
                        }
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
