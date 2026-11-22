import type { University, CampusFacilities } from "../types/university";

/**
 * Truly honest, realistic campus living conditions for Ethiopian universities.
 * Vital information for Grade 12 entrants: covers water access for showers & laundry,
 * Wi-Fi realities, power cuts, backup generator limitations, dorm crowding, and food.
 */
export function getUniversityFacilities(uni: University): CampusFacilities {
  if (uni.facilities) {
    return {
      wifi:
        uni.facilities.wifi ||
        "High-speed EthERNet fiber connection in Central E-Library and ICT Hall; dorm rooms have NO Wi-Fi (students use Ethio Telecom 4G data).",
      waterSupply:
        uni.facilities.waterSupply ||
        "Scheduled morning and evening tap water via campus reservoir tanks. Unheated cold showers; laundry done during morning tap hours with jerrycans.",
      electricity:
        uni.facilities.electricity ||
        "Connected to national EEP grid with regular load-shedding. Standby generator powers central library and labs only; dorm rooms stay dark during blackouts.",
      dormitory:
        uni.facilities.dormitory ||
        "Standard governmental dorms (4–6 students per room, metal bunk beds, individual lockers; students must bring own padlocks).",
      cafeteria:
        uni.facilities.cafeteria ||
        "Subsidized student dining hall serving 3 meals daily (Injera with Shiro/Misir/vegetables; meat sauce 1-2 times weekly; fasting options) + private cafes.",
      healthcare:
        uni.facilities.healthcare ||
        "24/7 campus first-aid clinic for outpatient triage and basic prescriptions; serious emergencies transferred via campus ambulance to town hospital.",
      bankingAndTransport:
        uni.facilities.bankingAndTransport ||
        `Commercial Bank of Ethiopia (CBE) branch/ATM at main gate; Telebirr accepted everywhere; continuous Bajaj/Minibus connection to central ${uni.city || "town"}.`,
      security:
        uni.facilities.security ||
        "Enclosed compound with 24/7 security guards; mandatory student digital ID verification at entrance gates; generally peaceful study environment.",
    };
  }

  const id = uni.id?.toLowerCase() || "";
  const name = (uni.name || "").toLowerCase();

  // 1. SEMERA UNIVERSITY (Afar - Arid, Extreme Heat)
  if (id.includes("smu-26") || name.includes("semera")) {
    return {
      wifi: "Confined to the air-conditioned Central ICT Hall and Digital Library. Student dorm rooms have ZERO Wi-Fi; students rely heavily on Ethio Telecom 4G mobile packages.",
      waterSupply:
        "⚠️ SEVERE SHORTAGE & SCALDING TAPS: Water is strictly rationed and flows for only 1–2 hours in early mornings (6:00 AM – 7:30 AM). Mid-day tap water is scalding hot due to 38°C–42°C pipe exposure. Showers and clothes washing require storing water in buckets/jerrycans. Tap water has high mineral salinity; students must budget for bottled/filtered drinking water.",
      electricity:
        "High local air conditioning load triggers frequent power fluctuations. Standby diesel generators keep server rooms and central ICT lab fans operational during blackouts; dorms remain unpowered.",
      dormitory:
        "4 to 6 students per room. Rooms become intensely hot in the afternoon and evening (temperatures exceed 36°C); portable rechargeable desk fans and mosquito nets are essential.",
      cafeteria:
        "Government-subsidized meals (breakfast, lunch, dinner). Fresh Injera with Shiro, lentils, and cabbage; cold drinking water stations are set up during peak meal hours.",
      healthcare:
        "Campus clinic manages heat exhaustion, dehydration, and malaria prevention; emergency cases transferred to Dubti Referral Hospital via campus ambulance.",
      bankingAndTransport:
        "CBE branch & ATM near the administrative gate; Bajaj service links the campus directly to Semera town center (5–10 minutes).",
      security:
        "Fenced desert compound with 24/7 security guards; strict student ID inspection at the main entrance gate.",
    };
  }

  // 2. KEBRI DEHAR & JIGJIGA UNIVERSITIES (Somali Region - Arid & Water Rationed)
  if (id.includes("kdu-46") || id.includes("jju-22") || name.includes("jigjiga") || name.includes("kebri dehar")) {
    return {
      wifi: "Fast optical fiber available in the E-library and ICT computer center. Dorm rooms have no Wi-Fi coverage; mobile internet (Ethio Telecom 4G) is required.",
      waterSupply:
        "⚠️ RATIONED WATER SUPPLY: Tap water runs on an alternate-day or morning-only schedule (6:30 AM – 8:30 AM). Showers are strictly bucket/jerrycan baths; laundry is washed during designated tank-filling hours. Keeping 20L plastic jerrycans in dorms is customary.",
      electricity:
        "Local town grid experiences frequent power outages. Campus backup generators prioritize digital libraries and science laboratories; personal power banks and rechargeable study lamps are essential.",
      dormitory:
        "4 to 6 students per dorm room. Warm climate; ceiling fans installed in select blocks. Students should bring padlocks for storage lockers and mosquito netting.",
      cafeteria:
        "Standard Ethiopian university menu (Injera with Shiro, lentils, and seasonal stew; meat sauce served twice weekly). Private tea and Somali-style cafe kiosks nearby.",
      healthcare:
        "24-hour campus outpatient clinic with primary care nurses; severe medical cases referred to Karamara Hospital (Jigjiga) or Kebri Dehar Hospital.",
      bankingAndTransport:
        "CBE branch and ATM located at the university gate; bajajs operate continuously between the campus and central commercial avenues.",
      security:
        "Secure perimeter wall with 24/7 student ID checkpoints; calm and orderly university compound.",
    };
  }

  // 3. DEBRE BERHAN UNIVERSITY (Highland Cold)
  if (id.includes("dbu-19") || name.includes("debre berhan")) {
    return {
      wifi: "High-speed EthERNet optical fiber connection in the grand Central E-Library and postgraduate research wings. Dormitory rooms have NO Wi-Fi; students use 4G mobile data.",
      waterSupply:
        "❄️ FREEZING MOUNTAIN WATER: Continuous municipal water with campus overhead tanks, but NO water heaters exist in student dorms. Morning tap water drops to 8°C–12°C, making showers and hand-washing clothes physically freezing. Heavy jackets and thermal blankets are mandatory.",
      electricity:
        "Cold weather and thunderstorms trigger regular local grid cuts. Standby industrial generators automatically illuminate the central library and laboratory corridors; dorm bedrooms remain in the dark.",
      dormitory:
        "4 to 6 students per dorm room with metal bunk beds. Nighttime temperatures can drop to 6°C–8°C; extra woolen blankets, warm socks, and heavy hoodies are absolute necessities.",
      cafeteria:
        "Subsidized dining hall serving hot tea with bread for breakfast; hot Injera with Shiro, Misir, and meat sauce (twice weekly) for lunch and dinner.",
      healthcare:
        "On-campus 24-hour medical clinic providing outpatient consultations and respiratory/cold medications; Asrat Woldeyes Health Campus hospital nearby for advanced care.",
      bankingAndTransport:
        "CBE branch and ATM right by the campus gate; frequent minibuses and bajajs connect to central Debre Berhan Piazza (10–15 minutes).",
      security:
        "Enclosed highland campus with 24/7 security police; strict digital student ID screening at all entrances.",
    };
  }

  // 4. DEBARK UNIVERSITY (Simien Mountain Ridge - Extreme Cold)
  if (id.includes("dku-48") || name.includes("debark")) {
    return {
      wifi: "Localized broadband connection inside the Central ICT lab and library. Zero Wi-Fi in student dorm rooms; mobile internet is needed for room study.",
      waterSupply:
        "❄️ BITTERLY COLD MOUNTAIN WATER: Water is pumped from mountain boreholes on a morning and evening schedule. Taps are ice-cold (often 5°C–8°C); there is NO hot shower system. Washing heavy clothes by hand is physically demanding, and laundry takes 1–2 days to dry due to highland mist.",
      electricity:
        "Highland grid outages occur multiple times per week. Standby generator powers the ICT lab and administration; students must carry personal rechargeable desk lamps.",
      dormitory:
        "4 to 6 students per room. Located near the Simien Mountains (2,800m+ elevation); dorms are extremely cold at night. Entrants must bring heavy blankets, thermal jackets, and winter beanies.",
      cafeteria:
        "Government-subsidized student dining hall with standard fasting and non-fasting Injera rotations; hot tea kiosks outside dorms.",
      healthcare:
        "Campus clinic provides primary care and altitude/cold illness treatment; referral to Debark Primary Hospital for acute conditions.",
      bankingAndTransport:
        "CBE ATM near campus; local bajajs and shared vans connect to Debark town center along the Gondar highway.",
      security:
        "Guarded compound with 24/7 checkpoints; peaceful rural mountain academic environment.",
    };
  }

  // 5. WOLKITE UNIVERSITY (Gubre Main Campus - Remote Well Water)
  if (id.includes("wku-34") || name.includes("wolkite")) {
    return {
      wifi: "EthERNet broadband connection in the Central Library and ICT Building. Dormitory rooms have NO Wi-Fi; students rely on Ethio Telecom 4G/LTE mobile data.",
      waterSupply:
        "⚠️ REMOTE WELL SUPPLY: Main campus is located at Gubre (15 km from Wolkite town). Water is pumped from deep campus boreholes to elevated tanks and released to dorms on morning (6:00 AM – 8:30 AM) and evening schedules. Students keep 20-liter plastic jerrycans in dorm rooms for daily washing. Showers are unheated.",
      electricity:
        "Local grid load-shedding is frequent. Campus generators power central study halls and streetlights, but dorm bedrooms stay dark during power cuts (rechargeable lamps required).",
      dormitory:
        "Standard 4 to 6 students per room with metal bunk beds. Pleasant moderate climate; personal padlocks required for clothing lockers.",
      cafeteria:
        "Subsidized dining hall serving Injera with Shiro, lentils, and seasonal stew; private cafeteria kiosks available inside the compound.",
      healthcare:
        "Campus clinic operates 24/7 for outpatient triage; serious cases transferred by campus ambulance to Wolkite University Teaching Hospital in town.",
      bankingAndTransport:
        "CBE branch and ATM on-campus; continuous Bajaj and minibus shuttles commute between Gubre campus and Wolkite town (25–35 minutes, 20–30 ETB).",
      security:
        "Gated compound with 24/7 campus security; mandatory student ID checks at all gates.",
    };
  }

  // 6. WERABE UNIVERSITY (4th Gen Growing Campus)
  if (id.includes("wru-47") || name.includes("werabe")) {
    return {
      wifi: "Fiber broadband available inside the Central E-Library and computer labs. Student dormitories do NOT have Wi-Fi coverage; mobile data is necessary in dorms.",
      waterSupply:
        "SCHEDULED MORNING & EVENING WATER: Municipal and campus reservoir water is released to student blocks between 6:30 AM – 9:00 AM and 5:30 PM – 7:30 PM. Showers are basic and unheated; keeping 1–2 jerrycans in dorms for personal washing is standard practice.",
      electricity:
        "Grid power interruptions happen 2–3 times a week. Campus diesel generators provide backup power strictly to the library, ICT labs, and administrative perimeter.",
      dormitory:
        "4 to 6 students per room in newly constructed dorm blocks. Metal bunk beds, study tables, and metal lockers (bring your own padlock).",
      cafeteria:
        "Subsidized student dining hall with standard rotating menu (Injera with Shiro, lentils, and meat sauce on designated days; fasting options).",
      healthcare:
        "Campus health station open 24 hours for first aid and routine medication; Werabe Comprehensive Specialized Hospital is located nearby for referrals.",
      bankingAndTransport:
        "CBE branch and ATM located adjacent to the campus entrance; bajajs link the campus to Werabe town center within 5 minutes.",
      security:
        "Walled compound guarded 24/7 with strict digital student ID screening; peaceful learning environment.",
    };
  }

  // 7. ADDIS ABABA UNIVERSITY (aau-1 - 1st Gen Flagship)
  if (id.includes("aau-1") || name.includes("addis ababa university")) {
    return {
      wifi: "High-speed 1Gbps EthERNet optical fiber in Kennedy Library, Arat Kilo Science Library, and ICT labs. Dorm Wi-Fi is patchy or congested; most students use 4G/5G mobile data packages in bedrooms.",
      waterSupply:
        "Municipal water line supported by heavy-duty underground reservoirs and elevated tanks. Running water is available daily for showers and washing, though upper floors in older dorms experience lower pressure during the 7:00 AM – 8:30 AM morning rush. Showers are unheated (cold water only). Laundry wash basins are provided in each block.",
      electricity:
        "Backed by high-output automatic industrial diesel generators that illuminate libraries, laboratory complexes, and street pathways within 2 minutes of a grid cut.",
      dormitory:
        "4 to 6 students per room (some older Sidist Kilo and Arat Kilo blocks host up to 6–8 students). Metal bunk beds and personal lockers; quiet reading rooms open 24 hours.",
      cafeteria:
        "Government-subsidized student dining halls at each campus (Injera with Shiro, lentils, and meat wot on Thursdays/Sundays; dedicated fasting alternatives). Numerous affordable private student cafes.",
      healthcare:
        "On-campus student clinic at Sidist Kilo and Arat Kilo; direct ambulance link to Tikur Anbessa (Black Lion) Specialized Hospital for all advanced medical care.",
      bankingAndTransport:
        "Multiple CBE branches and ATMs right on-campus; Light Rail Transit (LRT) and Minibus taxis provide immediate access to all subcities in Addis Ababa.",
      security:
        "Strict digital student ID scanning at all gates; 24/7 federal and campus security personnel.",
    };
  }

  // 8. JIMMA UNIVERSITY (ju-2 - 1st Gen Water Pioneer)
  if (id.includes("ju-2") || name.includes("jimma university")) {
    return {
      wifi: "High-speed fiber connectivity in the Central Library, JiT (Jimma Institute of Technology), and College of Public Health. Dorm rooms rely on Ethio Telecom 4G/LTE mobile data.",
      waterSupply:
        "EXCELLENT NATURAL WATER SUPPLY: Jimma University possesses among the most dependable water systems in Ethiopia, powered by local protected springs, deep boreholes, and high-capacity storage towers. Running water is available daily for showers and laundry (unheated cold showers).",
      electricity:
        "Reliable grid connection supported by standby diesel generators for academic halls, science laboratories, and hospital units during regional outages.",
      dormitory:
        "Lush, green, park-like compound. 4 to 6 students per dorm room; metal bunk beds, personal lockers, and spacious outdoor study gardens.",
      cafeteria:
        "Subsidized student cafeteria serving 3 balanced meals daily (fresh Injera, Shiro, seasonal vegetables, and scheduled meat sauce). Famous student union coffee cafes on campus.",
      healthcare:
        "Jimma University Medical Center (JUMC) is a premier tertiary teaching hospital located adjacent to campus, providing immediate access to comprehensive specialized medical care.",
      bankingAndTransport:
        "CBE branch and multiple ATMs on campus; Bajajs and city minibuses connect Main Campus and JiT to Jimma town center continuously.",
      security:
        "Walled compound with 24/7 security personnel and mandatory student digital ID verification; renowned for peaceful community relations.",
    };
  }

  // 9. BAHIR DAR UNIVERSITY (bdu-3 - Lake Tana / Blue Nile Hub)
  if (id.includes("bdu-3") || name.includes("bahir dar")) {
    return {
      wifi: "Fast optical fiber across BiT (Poly), Peda (Education), and Sebatamit (Agriculture) digital libraries and ICT centers. Dormitory bedrooms have NO Wi-Fi; students use 4G mobile data.",
      waterSupply:
        "DEDICATED LAKE TANA & BOREHOLE WATER: Multi-campus water distribution with high-volume overhead reservoirs. Scheduled morning and afternoon running water ensures daily showers and clothes washing. Warm, pleasant climate makes unheated showers comfortable.",
      electricity:
        "Connected to regional hydropower grid. Standby industrial generators power central e-libraries, research laboratories, and compound lighting during blackouts.",
      dormitory:
        "4 to 6 students per room. Poly and Peda campuses feature tree-lined boulevards and lakeside breezes; students should bring personal padlocks for clothes lockers.",
      cafeteria:
        "Subsidized dining halls on every campus serving breakfast, lunch, and dinner (standard Injera menu with fasting options) + lively lakeside cafes.",
      healthcare:
        "Student clinics on Poly, Peda, and Sebatamit campuses; Felege Hiwot Comprehensive Specialized Hospital and Tibebe Ghion Specialized Hospital accessible 24/7.",
      bankingAndTransport:
        "CBE branches and ATMs at Poly and Peda gates; abundant Bajajs connecting all campuses to Bahir Dar downtown (5–15 minutes, 10–20 ETB).",
      security:
        "Gated perimeters with 24/7 security guards and digital student ID inspections; peaceful university environment.",
    };
  }

  // 10. HARAMAYA UNIVERSITY (hu-6 - Ancient Agriculture Hub)
  if (id.includes("hu-6") || name.includes("haramaya")) {
    return {
      wifi: "EthERNet broadband connection in the Central Library, College of Agriculture, and Veterinary complexes. Dorm rooms have no Wi-Fi coverage; mobile data is necessary in dorms.",
      waterSupply:
        "⚠️ BOREHOLE DEPENDENT WATER: Due to historical recession of Lake Haramaya, campus relies on deep groundwater boreholes pumped to central towers. Water is distributed on a scheduled basis (early morning 6:00 AM – 9:00 AM and evening 5:00 PM – 7:30 PM). Storing 1–2 water containers in dorm rooms is customary. Showers are unheated.",
      electricity:
        "Regional grid load-shedding occurs periodically. Campus generators power central libraries and administrative zones; dorm bedrooms remain unpowered during cuts.",
      dormitory:
        "Spacious historic campus. 4 to 6 students per dorm room; metal bunk beds, individual lockers, and 24-hour reading rooms.",
      cafeteria:
        "Subsidized student cafeteria serving 3 meals daily (fresh Injera with Shiro, lentils, and scheduled meat dishes; vegetarian/fasting options).",
      healthcare:
        "Campus health center provides 24-hour primary care; Hiwot Fana Comprehensive Specialized Hospital in Harar (30 mins away) handles advanced referrals.",
      bankingAndTransport:
        "CBE branch & ATM on campus; shared minibuses connect the campus continuously to Harar (20 km) and Dire Dawa (40 km).",
      security:
        "Enclosed, self-contained campus town with 24/7 security gates and mandatory student ID checks.",
    };
  }

  // 11. HAWASSA UNIVERSITY (haw-5 - Rift Valley Hub)
  if (id.includes("haw-5") || name.includes("hawassa")) {
    return {
      wifi: "High-speed fiber connectivity in the Central Digital Library, IoT, and College of Agriculture. Dorm bedrooms do NOT have Wi-Fi; students rely on Ethio Telecom 4G/LTE.",
      waterSupply:
        "RELIABLE CITY & BOREHOLE WATER: Hawassa has good municipal water pressure supplemented by campus reservoir tanks. Cold running water is accessible daily for morning showers and clothes washing. Lake breeze provides pleasant warm-moderate temperatures.",
      electricity:
        "Connected to national grid with standby generators powering main study halls, laboratories, and street lighting during occasional outages.",
      dormitory:
        "4 to 6 students per dorm room with metal bunk beds and clothes lockers. Pleasant, warm Rift Valley climate; peaceful lakeside setting.",
      cafeteria:
        "Subsidized dining halls serving standard student menu (fresh Injera with Shiro/Misir; meat dishes twice weekly; fasting alternatives).",
      healthcare:
        "24-hour campus outpatient clinic; Hawassa University Comprehensive Specialized Hospital is located directly adjacent for emergency and tertiary care.",
      bankingAndTransport:
        "CBE branches and ATMs at Main Campus and IoT; continuous Bajajs connect the campus to Hawassa Piazza and Lake Hawassa promenade.",
      security:
        "Guarded compound with 24/7 uniformed security and digital student ID verification; peaceful study environment.",
    };
  }

  // 12. SCIENCE & TECH UNIVERSITIES (AASTU & ASTU)
  if (id.includes("aastu") || id.includes("astu") || name.includes("science and technology")) {
    return {
      wifi: "Dedicated high-speed 1Gbps research fiber in digital innovation hubs, computational labs, and Central E-Libraries. Dorm Wi-Fi signal is limited or congested; students rely on 4G/5G mobile packages.",
      waterSupply:
        "GOOD ON-CAMPUS WATER INFRASTRUCTURE: Multiple deep wells and high-capacity overhead reservoir towers ensure daily running water for showers and clothes washing, though peak morning hours (7:00 AM – 8:30 AM) experience heavy tap demand. Showers are unheated.",
      electricity:
        "Industrial standby generators back up high-tech laboratories, computer data centers, and digital libraries during national grid load shedding.",
      dormitory:
        "Modern student dorm blocks hosting 4 to 6 students per room with metal bunk beds, personal lockers, and quiet study corridors.",
      cafeteria:
        "Subsidized student dining hall with standard national menu (Injera with Shiro, lentils, and meat sauce on designated days; fasting alternatives).",
      healthcare:
        "24/7 on-campus medical clinic providing outpatient treatment and prescription medications; ambulance transfers to referral hospitals for major emergencies.",
      bankingAndTransport:
        "CBE branch and ATM on-campus; direct public transport and minibuses connect AASTU to Addis Ababa and ASTU to Adama downtown.",
      security:
        "Modern gated compound with 24/7 security checkpoints and digital student ID screening; technology-focused academic atmosphere.",
    };
  }

  // 13. REGIONAL 2ND GENERATION UNIVERSITIES (Wollo, Debre Markos, Wolaita Sodo, Ambo, Wollega, Dire Dawa, Madda Walabu, Dilla, Arba Minch, etc.)
  if (uni.generation === "2nd Gen") {
    return {
      wifi: "Optical fiber connection active inside the Central Digital Library and ICT Lab Hall. Student dorm rooms have NO Wi-Fi; students rely on Ethio Telecom 4G mobile data packages.",
      waterSupply:
        "SCHEDULED MORNING & EVENING WATER: Water is pumped to elevated campus tanks and released to dorms in the morning (6:00 AM – 9:00 AM) and evening (5:00 PM – 7:30 PM). Unheated cold showers; communal outdoor wash basins for clothes. Keeping 1–2 personal plastic jerrycans in dorm rooms is strongly recommended.",
      electricity:
        "Town grid outages happen 1–3 times weekly. Campus generators illuminate central libraries and exam halls during power cuts; student dorm bedrooms remain in the dark (rechargeable study lamps essential).",
      dormitory:
        "Standard governmental student housing (4 to 6 students per room with metal bunk beds and individual clothes lockers; students must bring own padlocks).",
      cafeteria:
        "Government-subsidized student dining hall providing 3 meals daily (fresh Injera with Shiro, lentils, and cabbage; meat sauce twice weekly; fasting options).",
      healthcare:
        "24-hour campus outpatient clinic staffed by health officers and nurses for first aid and basic medication; emergency ambulance link to town referral hospital.",
      bankingAndTransport:
        `CBE branch or ATM located at the main campus gate; Bajajs and minibuses provide continuous transport to central ${uni.city || "town"}.`,
      security:
        "Enclosed compound with 24/7 campus security guards; mandatory student digital ID verification at entrance gates.",
    };
  }

  // 14. REGIONAL 3RD & 4TH GENERATION UNIVERSITIES (Bonga, Jinka, Raya, Injibara, Dembi Dolo, Selale, Wachamo, Mekdela Amba, Oda Bultum, Borena, etc.)
  return {
    wifi: "Confined strictly to the Central ICT building and digital library hall. Student dormitories have ZERO Wi-Fi; students must rely on personal 4G mobile data packages.",
    waterSupply:
      "⚠️ SCHEDULED TIMETABLE WATER: Campus water is pumped from local boreholes/springs to elevated towers and distributed to dorms strictly during morning hours (6:00 AM – 8:30 AM) and late afternoon (5:30 PM – 7:00 PM). NO running water outside these windows. Students must keep 10L–20L jerrycans in dorms for personal washing. Showers are unheated; laundry is washed during the morning tap window.",
    electricity:
      "Regular local town grid power outages. Campus diesel generator operates strictly for the central e-library, science labs, and perimeter security lights; dorm rooms remain in the dark during blackouts (rechargeable desk lamps and power banks are vital).",
    dormitory:
      "4 to 6 students per room in standard concrete dorm blocks. Metal bunk beds and storage lockers (bring your own padlock); quiet campus atmosphere.",
    cafeteria:
      "Subsidized dining hall serving 3 meals daily (breakfast bread with hot tea; lunch and dinner Injera with Shiro, lentils, and seasonal stew; meat sauce on scheduled days; fasting options).",
    healthcare:
      "Campus clinic open 24/7 for basic triage, fever treatment, and first aid; acute emergencies transferred to the nearest zonal hospital via campus ambulance.",
    bankingAndTransport:
      `Commercial Bank of Ethiopia (CBE) branch or ATM near the main gate; Telebirr accepted widely; local bajajs connect campus to central ${uni.city || "town"}.`,
    security:
      "Gated walled compound with 24/7 uniformed campus guards; student digital ID required at all entrances.",
  };
}
