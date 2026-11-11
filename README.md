🎓 UniSelect Ethiopia (የኢትዮጵያ ዩኒቨርሲቲዎች መረጃ ፖርታል)
UniSelect Ethiopia is a modern, student-centric higher education discovery and score-matching web application designed for Grade 12 national exam candidates in Ethiopia. The platform aggregates comprehensive datasets for all 51+ Ethiopian public and specialized institutions, helping prospective university students make informed academic choices based on cut-off scores, campus locations, local community environments, direct Telegram channels, and embedded video tours.

🌟 Key Features
⚡ Score Matcher Engine: Input Grade 12 national exam scores and stream (Natural or Social Science) to instantly filter and match eligible public universities based on official Ministry of Education (MoE) cut-off requirements.

🗺️ Complete 51+ University Directory: Includes full institutional profiles covering historical cut-offs, student population, establishment year, and climate conditions.

📹 Embedded YouTube Video Tours: Dynamic YouTube URL parsing (supporting standard, short youtu.be, and parameterized links) to render responsive 16:9 campus tour video players directly within card details panels.

✈️ Official Telegram Channel Integration: Direct quick-access buttons to official Telegram channels for main and branch campuses (including JiT, BECO, JUCAVM, Agaro, and Health Sciences campuses).

📍 Interactive Campus Mapping: Multiple campus location listings per university with phone contacts and direct Google Maps navigation links.

🎨 Dynamic Card Aesthetics: Card index-based gradient generation, custom rating badges, generation tag chips, and fallback 2-letter avatar badges when institutional logos fail to load.

🔄 Hybrid Local & Live Data Architecture: Automatic caching in browser localStorage with options to toggle between offline cache mode and live dataset updates.

🏗️ Architecture & Technical Stack
Frontend Framework: React 18+ with TypeScript

Build Tool: Vite

Styling & UI: Tailwind CSS v3/v4 with custom gradients, flex layouts, and glassmorphism backdrop blur (backdrop-blur-xs)

Routing & Optimization:

React Router DOM v6+ Layout Architecture: Centralized RootLayout utilizing <Outlet/> for layout consistency.

Code-Splitting & Lazy Loading: Pages dynamically loaded using React.lazy() and wrapped in <React.Suspense> boundaries with fallback UI loading spinners.

State & Persistence: Custom React hooks (useUniversities) backed by localStorage persistence (ethiopia_uni_portal_integrated_v9).

📁 Project Folder Structure
Plaintext
uni-select-ethiopia/
├── public/
│   ├── hero.png
│   ├── favicon.ico
│   └── logos/
├── src/
│   ├── components/
│   │   ├── UniversityCard.tsx       # Expandable card with YouTube player & Telegram links
│   │   ├── LoadingSpinner.tsx       # Suspense boundary fallback UI
│   │   ├── DirectoryHeader.tsx      # Directory controls and dataset toggle
│   │   └── Navbar.tsx               # Header navigation bar
│   ├── layouts/
│   │   └── RootLayout.tsx           # Global wrapper with Header, Footer & <Outlet />
│   ├── pages/
│   │   ├── Home.tsx                 # 2-column hero grid & featured institutions
│   │   ├── Directory.tsx            # Full university directory & generation filter
│   │   ├── Matcher.tsx              # Exam score matching calculator
│   │   └── UniversityDetails.tsx    # Individual institutional page
│   ├── data/
│   │   └── localDatabase.ts         # Pre-populated dataset (51+ Ethiopian universities)
│   ├── hooks/
│   │   └── useUniversities.ts       # Storage syncing & dataset state management
│   ├── types/
│   │   └── university.ts            # TypeScript interfaces & type definitions
│   ├── routes/
│   │   └── AppRoutes.tsx            # Route configuration with React.lazy & Suspense
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
⚡ Getting Started
Prerequisites
Node.js (v18.0.0 or higher)

pnpm (recommended), npm, or yarn

Installation
Clone the repository:

Bash
git clone https://github.com/your-username/uni-select-ethiopia.git
cd uni-select-ethiopia
Install dependencies:

Bash
pnpm install
# or
npm install
Start the local development server:

Bash
pnpm dev
# or
npm run dev
Open in Browser:
Navigate to http://localhost:5173 to view the application.