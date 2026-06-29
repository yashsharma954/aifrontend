// import { Link, useNavigate } from "react-router-dom";
// import { useState,useEffect } from "react";

// const history = [
//   { role: "Frontend Developer", date: "Jun 18, 2025", score: 82, status: "Excellent" },
//   { role: "Full Stack Developer", date: "Jun 12, 2025", score: 71, status: "Good" },
//   { role: "React Developer", date: "Jun 5, 2025", score: 65, status: "Average" },
// ];

// const scoreColor = (score) => {
//   if (score >= 80) return "text-emerald-400";
//   if (score >= 65) return "text-yellow-400";
//   return "text-red-400";
// };


// const statusStyle = (status) => {
//   if (status === "Excellent") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
//   if (status === "Good") return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
//   return "bg-red-500/10 text-red-400 border-red-500/20";
// };

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
// useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const fullName = user?.fullName || "User";
//   const firstLetter = fullName.charAt(0).toUpperCase();
// const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//       // optional
//     navigate("/");   // ya "/" 
//   };

//   return (
//     <div className="min-h-screen bg-[#0A0F1E]">

//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1E]/80 backdrop-blur-md border-b border-white/10">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
//               <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                   d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
//               </svg>
//             </div>
//             <span className="font-bold text-lg tracking-tight text-white">
//               Interview<span className="text-cyan-400">AI</span>
//             </span>
//           </Link>

//           {/* <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm font-bold">
//               Y
//             </div> */}
//             <div className="flex items-center gap-3">
//             {/* Dynamic Avatar */}
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm font-bold">
//               {firstLetter}
//             </div>
//             <span className="text-sm text-slate-300 hidden md:block">
//               {fullName}
//             </span>
//             <button
//               onClick={handleLogout}
//               className="text-xs text-slate-500 hover:text-red-400 transition-colors ml-2"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">

//         {/* Welcome */}
//         <div className="mb-10">
//           <h1 className="text-3xl font-bold text-white mb-1">
//             Welcome back, {fullName} 👋
//           </h1>
//           <p className="text-slate-400 text-sm">
//             Ready for your next interview challenge?
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
//           {[
//             { label: "Interviews Done", value: "3", icon: "🎙️" },
//             { label: "Avg Score", value: "72%", icon: "📊" },
//             { label: "Best Score", value: "82%", icon: "🏆" },
//             { label: "Current Streak", value: "3 days", icon: "🔥" },
//           ].map((stat) => (
//             <div
//               key={stat.label}
//               className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
//             >
//               <div className="text-2xl mb-3">{stat.icon}</div>
//               <div className="text-2xl font-bold text-white">{stat.value}</div>
//               <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">

//           {/* Start Interview CTA */}
//           <div className="md:col-span-1">
//             <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-6 h-full flex flex-col justify-between">
//               <div>
//                 <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-2xl">
//                   🤖
//                 </div>
//                 <h2 className="text-xl font-bold text-white mb-2">
//                   New Interview Start Karo
//                 </h2>
//                 <p className="text-slate-400 text-sm leading-relaxed">
//                   Resume upload karo, role choose karo aur AI ke saath practice shuru karo.
//                 </p>
//               </div>
//               <button
//                 onClick={() => navigate("/upload")}
//                 className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
//               >
//                 Begin Interview →
//               </button>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="md:col-span-2 space-y-6">

//             {/* Interview History */}
//             <div>
//               <h2 className="text-base font-semibold text-white mb-3">
//                 Recent Interviews
//               </h2>
//               <div className="space-y-3">
//                 {history.map((item, i) => (
//                   <div
//                     key={i}
//                     className="bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between hover:border-white/20 transition-all group"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg">
//                         💼
//                       </div>
//                       <div>
//                         <div className="text-sm font-medium text-white">{item.role}</div>
//                         <div className="text-xs text-slate-500">{item.date}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className={`text-lg font-bold ${scoreColor(item.score)}`}>
//                         {item.score}%
//                       </div>
//                       <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyle(item.status)}`}>
//                         {item.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Skill Progress */}
//             <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
//               <h3 className="text-sm font-semibold text-white mb-4">
//                 Skill Progress
//               </h3>
//               <div className="space-y-3">
//                 {[
//                   { label: "Technical Accuracy", value: 78, color: "from-blue-500 to-blue-400" },
//                   { label: "Communication", value: 85, color: "from-cyan-500 to-cyan-400" },
//                   { label: "Problem Solving", value: 70, color: "from-violet-500 to-violet-400" },
//                   { label: "Confidence", value: 65, color: "from-emerald-500 to-emerald-400" },
//                 ].map((skill) => (
//                   <div key={skill.label}>
//                     <div className="flex justify-between text-xs mb-1.5">
//                       <span className="text-slate-400">{skill.label}</span>
//                       <span className="text-slate-300 font-medium">{skill.value}%</span>
//                     </div>
//                     <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
//                       <div
//                         className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
//                         style={{ width: `${skill.value}%` }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* Quick Tips */}
//         <div className="mt-8 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
//           <h3 className="text-sm font-semibold text-white mb-4">
//             💡 Interview Tips
//           </h3>
//           <div className="grid md:grid-cols-3 gap-4">
//             {[
//               { tip: "STAR Method use karo", desc: "Situation, Task, Action, Result — answers structured rakho." },
//               { tip: "Technical depth dikhao", desc: "Sirf kya nahi, kaise aur kyun bhi explain karo." },
//               { tip: "Confidence maintain karo", desc: "Slowly bolna, pause lena — ye confidence dikhata hai." },
//             ].map((t) => (
//               <div key={t.tip} className="flex gap-3">
//                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
//                 <div>
//                   <div className="text-xs font-semibold text-white mb-0.5">{t.tip}</div>
//                   <div className="text-xs text-slate-500 leading-relaxed">{t.desc}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const scoreColor = (score) => {
  if (score >= 80) return "text-emerald-400";
  if (score >= 65) return "text-yellow-400";
  return "text-red-400";
};

const statusStyle = (status) => {
  if (status === "Excellent") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (status === "Good") return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  if (status === "Average") return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  return "bg-red-500/10 text-red-400 border-red-500/20";
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalInterviews: 0, avgScore: 0, bestScore: 0, streak: 0 });
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [skillStats, setSkillStats] = useState({
    technicalAccuracy: 0,
    communication: 0,
    confidence: 0,
    problemSolving: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("https://aibackend-ocu5.onrender.com/api/v1/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStats(data.data.stats);
      setRecentInterviews(data.data.recentInterviews);
      setSkillStats(data.data.skillStats);
    } catch (err) {
      console.error("Dashboard load failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const fullName = user?.fullName || "User";
  const firstLetter = fullName.charAt(0).toUpperCase();

  const statCards = [
    { label: "Interviews Done", value: loading ? "..." : stats.totalInterviews, icon: "🎙️" },
    { label: "Avg Score", value: loading ? "..." : `${stats.avgScore}%`, icon: "📊" },
    { label: "Best Score", value: loading ? "..." : `${stats.bestScore}%`, icon: "🏆" },
    { label: "Current Streak", value: loading ? "..." : `${stats.streak} days`, icon: "🔥" },
  ];

  const skills = [
    { label: "Technical Accuracy", value: skillStats.technicalAccuracy, color: "from-blue-500 to-blue-400" },
    { label: "Communication", value: skillStats.communication, color: "from-cyan-500 to-cyan-400" },
    { label: "Problem Solving", value: skillStats.problemSolving, color: "from-violet-500 to-violet-400" },
    { label: "Confidence", value: skillStats.confidence, color: "from-emerald-500 to-emerald-400" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E]">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1E]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm font-bold text-white">
              {firstLetter}
            </div>
            <span className="text-sm text-slate-300 hidden md:block">{fullName}</span>
            <button
              onClick={handleLogout}
              className="text-xs text-slate-500 hover:text-red-400 transition-colors ml-2"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-1">
            Welcome back, {fullName} 👋
          </h1>
          <p className="text-slate-400 text-sm">Ready for your next interview challenge?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat) => (
            // <div
            //   key={stat.label}
            //   className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
            // >
            // Dashboard.jsx mein stat card update karo
        <div
  key={stat.label}
  onClick={() => stat.label === "Interviews Done" && navigate("/my-interviews")}
  className={`bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all
    ${stat.label === "Interviews Done" ? "cursor-pointer hover:border-blue-500/30" : ""}`}
      >
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Start Interview CTA */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-6 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-2xl">
                  🤖
                </div>
                <h2 className="text-xl font-bold text-white mb-2">New Interview Start Karo</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Resume upload karo, role choose karo aur AI ke saath practice shuru karo.
                </p>
              </div>
              <button
                onClick={() => navigate("/upload")}
                className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
              >
                Begin Interview →
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="md:col-span-2 space-y-6">

            {/* Recent Interviews */}
            <div>
              <h2 className="text-base font-semibold text-white mb-3">Recent Interviews</h2>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 animate-pulse h-16" />
                  ))}
                </div>
              ) : recentInterviews.length === 0 ? (
                <div className="bg-white/[0.03] border border-dashed border-white/10 rounded-xl px-5 py-8 text-center">
                  <p className="text-slate-500 text-sm">Abhi tak koi interview nahi diya</p>
                  <button
                    onClick={() => navigate("/upload")}
                    className="mt-3 text-blue-400 text-sm underline"
                  >
                    Pehla interview shuru karo →
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentInterviews.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between hover:border-white/20 transition-all group cursor-pointer"
                      onClick={() => navigate("/results", { state: { interviewId: item._id } })}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg">
                          💼
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{item.role}</div>
                          <div className="text-xs text-slate-500">{formatDate(item.date)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`text-lg font-bold ${scoreColor(item.score)}`}>
                          {item.score}%
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Skill Progress */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Skill Progress</h3>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-6 bg-white/5 rounded animate-pulse" />
                  ))}
                </div>
              ) : stats.totalInterviews === 0 ? (
                <p className="text-slate-500 text-sm text-center py-4">
                  Interview dene ke baad skills track hongi
                </p>
              ) : (
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400">{skill.label}</span>
                        <span className="text-slate-300 font-medium">{skill.value}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-700`}
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">💡 Interview Tips</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { tip: "STAR Method use karo", desc: "Situation, Task, Action, Result — answers structured rakho." },
              { tip: "Technical depth dikhao", desc: "Sirf kya nahi, kaise aur kyun bhi explain karo." },
              { tip: "Confidence maintain karo", desc: "Slowly bolna, pause lena — ye confidence dikhata hai." },
            ].map((t) => (
              <div key={t.tip} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white mb-0.5">{t.tip}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}