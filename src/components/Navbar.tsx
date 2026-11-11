import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Directory", path: "/directory" },
    { name: "Score Matcher", path: "/matcher" },
    { name: "Compare", path: "/compare" },
    { name: "Guide & FAQ", path: "/faq" },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LOGO ON THE LEFT */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-linear-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:scale-105 transition-transform">
            <span>
              {" "}
              <img src="/logos/ethiopian.jpg" alt="Et" />
            </span>
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight block leading-none">
              EthioUniversityInfo
            </span>
          </div>
        </NavLink>

        {/* EXACTLY 5 PAGE LINKS ON THE RIGHT (DESKTOP) */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-sky-50 text-sky-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "bg-sky-50 text-sky-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
