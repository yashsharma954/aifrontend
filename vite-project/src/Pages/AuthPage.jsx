import { useState,useEffect } from "react";
import { Link, useNavigate ,useSearchParams} from "react-router-dom";


export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState("Login");
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
      fetchUserprofile(token);
    } else {
      navigate("/Dashboard");
    }
      
    }
  }, [searchParams, navigate]);
  const fetchUserprofile = async (token) => {
  try {
    const response = await fetch("https://aibackend-ocu5.onrender.com/api/v1/user/me", {
      method: "GET",
      headers: {
        "authorization": `Bearer ${token}`,
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
    navigate("/Dashboard");
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
      ? `${baseUrl}/api/v1/user/Registeruser`
      : `${baseUrl}/api/v1/user/Login`;

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

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      setError("Server se galat response aaya");
      return; // ✅ return add kiya
    }

    // ✅ Error check with return
    if (!response.ok) {
      setError(data.message || "Something went wrong");
      alert("something went wrong "+data.message);
      return;
    }

    // Success
    if (mode === "signup") {
      alert("✅ Account successfully created! Ab Login karo");
      setMode("Login");
      setForm({ fullName: "", email: "", password: "" });
    } else {
      localStorage.setItem("token", data.data?.accessToken || data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data?.user || data.user));
      navigate("/Dashboard");
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
            {mode === "Login" ? "Welcome Back 👋" : "Account Banao 🚀"}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {mode === "Login"
              ? "Login karo aur interview practice continue karo"
              : "Free account banao aur AI interview start karo"}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6">
          {["Login", "signup"].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === m
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {m === "Login" ? "Log In" : "Sign Up"}
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
              {mode === "Login" && (
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
                {mode === "Login" ? "Logging in..." : "Account ban raha hai..."}
              </span>
            ) : mode === "Login" ? "Log In →" : "Create Account →"}
          </button>
        </form>

       

        

        {/* Bottom link */}
        <p className="text-center text-xs text-slate-500 mt-6">
          {mode === "Login" ? "Account nahi hai? " : "Already account hai? "}
          <button
            onClick={() => { setMode(mode === "Login" ? "signup" : "Login"); setError(""); }}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            {mode === "Login" ? "Sign Up karo" : "Log In karo"}
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