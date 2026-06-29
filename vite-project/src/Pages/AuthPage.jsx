import { useState,useEffect } from "react";
import { Link, useNavigate ,useSearchParams} from "react-router-dom";


export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState("login");
  // const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [form, setForm] = useState({ 
    fullName: "", 
    email: "", 
    password: "" 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');

    if (token) {
      localStorage.setItem("token", token);
      
      // User data fetch kar sakte ho agar chahiye (optional but recommended)
      
       if (userId) {
      fetchUserProfile(token);
    } else {
      navigate("/dashboard");
    }
      
    }
  }, [searchParams, navigate]);
  const fetchUserProfile = async (token) => {
  try {
    const response = await fetch("https://aibackend-ocu5.onrender.com/api/v1/user/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log(data);

    if (data.success && data.data) {
      localStorage.setItem("user", JSON.stringify(data.data));
    }

  } catch (error) {
    console.error("Failed to fetch user data:", error);
  } finally {
    navigate("/dashboard");
  }
};
  const handleGoogleLogin = () => {
  window.location.href = "https://aibackend-ocu5.onrender.com/api/v1/user/google";
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!form.email || !form.password) {
    return setError("Email aur password required hai.");
  }
  if (mode === "signup" && !form.fullName) {
    return setError("Full Name required hai.");
  }

  setLoading(true);
  setError("");

  try {
    const baseUrl = "https://aibackend-ocu5.onrender.com";

    const endpoint = mode === "signup" 
      ? `${baseUrl}/api/v1/user/registeruser`
      : `${baseUrl}/api/v1/user/login`;

    console.log("Calling API:", endpoint);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        password: form.password
      }),
    });

    const responseText = await response.text();
    console.log("Raw Response:", responseText);

    if (!responseText) {
      console.log("Backend se koi response nahi mila");
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.log("Invalid response from server");
    }

    if (!response.ok) {
      console.log(data.message || "Something went wrong");
    }

    // Success
    if (mode === "signup") {
      alert("✅ Account successfully created! Ab Login karo");
      setMode("login");
      setForm({ fullName: "", email: "", password: "" });
    } else {
      // Login
      localStorage.setItem("token", data.data?.accessToken || data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data?.user || data.user));
      alert("✅ login successfull ")
      navigate("/dashboard");
    }

  } catch (err) {
    console.error("❌ Error:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center px-6">

      {/* Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
          </svg>
        </div>
        <span className="font-bold text-lg tracking-tight text-white">
          Interview<span className="text-cyan-400">AI</span>
        </span>
      </Link>

      {/* Card */}
      <div className="relative w-full max-w-md bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            {mode === "login" ? "Welcome Back 👋" : "Account Banao 🚀"}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {mode === "login"
              ? "Login karo aur interview practice continue karo"
              : "Free account banao aur AI interview start karo"}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6">
          {["login", "signup"].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === m
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* {mode === "signup" && (
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Rahul Sharma"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-all"
              />
            </div>
          )} */}
          { mode === "signup" && (
                <div>
               <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                     Full Name
                     </label>
                    <input
                   name="fullName"           // ← yahan change kiya
                     value={form.fullName}
                onChange={handleChange}
                placeholder="Rahul Sharma"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-all"
                 />
                </div>
                 )}

          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="rahul@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-slate-400 font-medium">Password</label>
              {mode === "login" && (
                <button type="button" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </button>
              )}
            </div>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-all"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/20 mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                {mode === "login" ? "Logging in..." : "Account ban raha hai..."}
              </span>
            ) : mode === "login" ? "Log In →" : "Create Account →"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-slate-600">ya continue karo</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button  onClick={handleGoogleLogin} className="flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-xl text-sm text-slate-300 hover:border-white/25 hover:bg-white/5 transition-all"
         >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-xl text-sm text-slate-300 hover:border-white/25 hover:bg-white/5 transition-all">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>

        {/* Bottom link */}
        <p className="text-center text-xs text-slate-500 mt-6">
          {mode === "login" ? "Account nahi hai? " : "Already account hai? "}
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            {mode === "login" ? "Sign Up karo" : "Log In karo"}
          </button>
        </p>
      </div>

      {/* Back link */}
      <Link to="/" className="mt-6 text-xs text-slate-600 hover:text-slate-400 transition-colors">
        ← Wapas Home pe jao
      </Link>
    </div>
  );
}