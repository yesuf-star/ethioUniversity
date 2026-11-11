import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
                  <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
                    Select Ethiopian University
                  </div>
          <p className="text-sm leading-relaxed">
            Data-driven university selection portal for Grade 12 students in
            Ethiopia.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/directory" className="hover:text-white transition">
                University Directory
              </Link>
            </li>
            <li>
              <Link to="/matcher" className="hover:text-white transition">
                Score Matcher
              </Link>
            </li>
            <li>
              <Link to="/compare" className="hover:text-white transition">
                Compare
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition">
                Guide & FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Official MoE Portal</h4>
          <a
            href="https://student.ethernet.edu.et"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition"
          >
            student.ethernet.edu.et ↗
          </a>
        </div>
      </div>
      <p className="text-center pb-4">
        &copy; {new Date().getFullYear()} Nejm Developer All Rights Reserved
      </p>
    </footer>
  );
}
