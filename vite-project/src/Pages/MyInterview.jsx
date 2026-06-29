import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const getScoreColor = (score) => {
  if (score >= 90) return "text-emerald-400";
  if (score >= 75) return "text-blue-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
};

const getScoreLabel = (score) => {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Average";
  return "Needs Improvement";
};

const statusStyle = (status) => {
  const map = {
    "Excellent": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Good": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Average": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "Needs Improvement": "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return map[status] || "bg-white/5 text-slate-400 border-white/10";
};

const interviewStatusStyle = (status) => {
  const map = {
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    in_progress: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return map[status] || "bg-white/5 text-slate-400 border-white/10";
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });
};

const FILTERS = ["All", "Completed", "In Progress", "Pending"];
const SORT_OPTIONS = ["Newest First", "Oldest First", "Highest Score", "Lowest Score"];

export default function MyInterviews() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest First");
  const [searchRole, setSearchRole] = useState("");

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/interview/my-interviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Load failed");
      setInterviews(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter + Search + Sort
  const filtered = interviews
    .filter((i) => {
      if (filter === "Completed") return i.status === "completed";
      if (filter === "In Progress") return i.status === "in_progress";
      if (filter === "Pending") return i.status === "pending";
      return true;
    })
    .filter((i) =>
      searchRole === "" ||
      i.role.toLowerCase().includes(searchRole.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "Newest First") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "Oldest First") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "Highest Score") return b.totalScore - a.totalScore;
      if (sortBy === "Lowest Score") return a.totalScore - b.totalScore;
      return 0;
    });

  const completedCount = interviews.filter(i => i.status === "completed").length;
  const avgScore = completedCount > 0
    ? Math.round(interviews.filter(i => i.status === "completed")
        .reduce((s, i) => s + i.totalScore, 0) / completedCount)
    : 0;
  const bestScore = interviews.length > 0
    ? Math.max(...interviews.map(i => i.totalScore))
    : 0;

  return (
    <div className="min-h-screen bg-[#0A0F1E]">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1E]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
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
          <Link to="/dashboard" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Mere Saare Interviews 📋</h1>
          <p className="text-slate-400 text-sm">
            Apne saare interview records dekho aur detailed feedback paao.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Interviews", value: interviews.length, icon: "🎙️" },
            { label: "Avg Score", value: `${avgScore}%`, icon: "📊" },
            { label: "Best Score", value: `${bestScore}%`, icon: "🏆" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <div className="text-xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{loading ? "..." : stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Filter + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          {/* Search */}
          <input
            type="text"
            placeholder="Role search karo... (e.g. Frontend)"
            value={searchRole}
            onChange={(e) => setSearchRole(e.target.value)}
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
          />

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt} value={opt} className="bg-[#0A0F1E]">{opt}</option>
            ))}
          </select>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                filter === f
                  ? "bg-blue-600/20 text-blue-400 border-blue-500/30"
                  : "text-slate-500 border-white/10 hover:border-white/25 hover:text-slate-300"
              }`}
            >
              {f}
              {f === "All" && ` (${interviews.length})`}
              {f === "Completed" && ` (${interviews.filter(i => i.status === "completed").length})`}
              {f === "In Progress" && ` (${interviews.filter(i => i.status === "in_progress").length})`}
              {f === "Pending" && ` (${interviews.filter(i => i.status === "pending").length})`}
            </button>
          ))}
        </div>

        {/* Interview List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 animate-pulse h-24" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-400">❌ {error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
            <p className="text-slate-500 text-sm mb-3">Koi interview nahi mila</p>
            <button
              onClick={() => navigate("/upload")}
              className="text-blue-400 text-sm underline"
            >
              Naya interview shuru karo →
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item, idx) => (
              <div
                key={item._id}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center justify-between flex-wrap gap-3">

                  {/* Left — Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg shrink-0">
                      💼
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-sm font-semibold text-white">{item.role}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${interviewStatusStyle(item.status)}`}>
                          {item.status.replace("_", " ")}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-slate-500 capitalize">
                          {item.mode}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>📄 {item.resumeName}</span>
                        <span>·</span>
                        <span>📅 {formatDate(item.completedAt || item.createdAt)}</span>
                        <span>·</span>
                        <span>❓ {item.totalQuestions} questions</span>
                      </div>
                    </div>
                  </div>

                  {/* Right — Score + Actions */}
                  <div className="flex items-center gap-4">
                    {item.status === "completed" ? (
                      <>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(item.totalScore)}`}>
                            {item.totalScore}
                            <span className="text-sm text-slate-600">/100</span>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${statusStyle(getScoreLabel(item.totalScore))}`}>
                            {getScoreLabel(item.totalScore)}
                          </span>
                        </div>
                        <button
                          onClick={() => navigate(`/results`, { state: { interviewId: item._id } })}
                          className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 text-blue-400 rounded-xl text-xs font-medium transition-all"
                        >
                          Result Dekho →
                        </button>
                      </>
                    ) : item.status === "in_progress" ? (
                      <button
                        onClick={() => navigate("/upload")}
                        className="px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-400 rounded-xl text-xs font-medium transition-all"
                      >
                        Continue →
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/upload")}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 rounded-xl text-xs font-medium transition-all"
                      >
                        Start Karo →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Interview CTA */}
        {!loading && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/upload")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/20"
            >
              + Naya Interview Shuru Karo
            </button>
          </div>
        )}

      </div>
    </div>
  );
}