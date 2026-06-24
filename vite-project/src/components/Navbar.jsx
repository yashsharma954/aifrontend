import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1E]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">
            Interview<span className="text-cyan-400">AI</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/auth"
            className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2">
            Log in
          </Link>
          <Link to="/auth"
            className="text-sm bg-blue-600 hover:bg-blue-500 transition-all px-4 py-2 rounded-lg font-medium shadow-lg shadow-blue-600/20">
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}