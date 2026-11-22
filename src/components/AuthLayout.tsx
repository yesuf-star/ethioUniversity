import { Outlet, Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Footer from "./Footer";

export default function AuthLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If already logged in, redirect straight to the Home page
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans bg-linear-to-b from-slate-950 via-slate-900 to-indigo-950">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-sky-500 to-blue-600 flex items-center justify-center p-0.5 shadow-md">
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
              <span className="text-lg font-black text-white tracking-tight block leading-none">
                EthioUniversityInfo
              </span>
              <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase block mt-0.5">
                Ministry of Education • Grade 12 Candidate Portal
              </span>
            </div>
          </div>

          {/* Quick tab switcher between Register & Login */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1 rounded-2xl">
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-sky-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`
              }
            >
              1. Create Account
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-sky-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`
              }
            >
              2. Sign In
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main Content Form */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
