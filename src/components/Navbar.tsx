import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Directory", path: "/directory" },
    { name: "Score Matcher", path: "/matcher" },
    { name: "Compare", path: "/compare" },
    { name: "Guide & FAQ", path: "/faq" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LOGO ON THE LEFT */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white text-base font-bold shadow-md group-hover:scale-105 transition-transform overflow-hidden p-0.5">
            <img
              src="/logos/ethiopian.jpg"
              alt="Ethiopia"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight block leading-none">
              EthioUniversityInfo
            </span>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block">
              Grade 12 Portal
            </span>
          </div>
        </NavLink>

        {/* 5 PAGE LINKS ON THE RIGHT (DESKTOP) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-sky-50 text-sky-700 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* AUTHENTICATION BUTTONS / PROFILE (DESKTOP) */}
        <div className="hidden md:flex items-center gap-2.5">
          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition ${
                    isActive
                      ? "bg-sky-100/70 text-sky-900 font-bold"
                      : "hover:bg-slate-100 text-slate-800"
                  }`
                }
              >
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-xs overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    getInitials(user.fullName) || "ST"
                  )}
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold leading-tight truncate max-w-[110px]">
                    {user.fullName.split(" ")[0]}
                  </span>
                  <span className="block text-[10px] text-slate-500 font-mono leading-none">
                    {user.moeId}
                  </span>
                </div>
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 text-xs font-semibold transition cursor-pointer"
                title="Sign out of student portal"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-xl text-slate-700 hover:text-sky-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-xs transition"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
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
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2">
          {/* Main nav items */}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-xl text-sm font-medium ${
                  isActive
                    ? "bg-sky-50 text-sky-700 font-bold"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Mobile Auth items */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            {user ? (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-sky-50 text-sky-900 font-bold text-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      getInitials(user.fullName) || "ST"
                    )}
                  </div>
                  <div>
                    <div className="leading-tight">{user.fullName}</div>
                    <div className="text-[10px] text-sky-700 font-mono">
                      ID: {user.moeId} • {user.region}
                    </div>
                  </div>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-rose-600 font-semibold hover:bg-rose-50 rounded-xl"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2 px-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2 px-3 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-500"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
