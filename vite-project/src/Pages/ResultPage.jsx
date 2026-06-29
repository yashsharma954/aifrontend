// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// const QUESTIONS = [
//   "Apne aap ke baare mein batao aur apna experience describe karo.",
//   "JavaScript mein `let`, `const` aur `var` ka kya difference hai?",
//   "React mein Virtual DOM kya hota hai aur ye performance kaise improve karta hai?",
//   "Large React applications mein state management kaise karte ho?",
//   "Koi ek challenging project batao jisme tumne koi mushkil problem solve ki ho.",
// ];

// export default function ResultPage() {
//   const [overallScore, setOverallScore] = useState(0);
//   const [feedback, setFeedback] = useState({});

//   // Dummy Results (Backend na hone tak)
//   const results = [
//     { score: 85, feedback: "Bahut accha introduction. Confidence dikha." },
//     { score: 92, feedback: "Technical difference clear the. Example accha tha." },
//     { score: 78, feedback: "Virtual DOM samjhaya lekin optimization ke points miss the." },
//     { score: 88, feedback: "State management tools (Redux, Zustand, Context) ka accha mention." },
//     { score: 82, feedback: "Project example solid tha, lekin metrics (numbers) add kar sakte the." },
//   ];

//   useEffect(() => {
//     // Calculate overall score
//     const total = results.reduce((sum, r) => sum + r.score, 0);
//     const avg = Math.round(total / results.length);
//     setOverallScore(avg);

//     // Save to localStorage (future mein use kar sakte ho)
//     localStorage.setItem("lastInterviewScore", avg.toString());
//   }, []);

//   const getScoreColor = (score) => {
//     if (score >= 90) return "text-emerald-400";
//     if (score >= 75) return "text-blue-400";
//     if (score >= 60) return "text-yellow-400";
//     return "text-red-400";
//   };

//   const getScoreLabel = (score) => {
//     if (score >= 90) return "Excellent";
//     if (score >= 80) return "Very Good";
//     if (score >= 70) return "Good";
//     if (score >= 60) return "Average";
//     return "Needs Improvement";
//   };

//   return (
//     <div className="min-h-screen bg-zinc-950 text-white pb-12">
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/10">
//         <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2">
//             <span className="font-bold text-2xl tracking-tight">
//               Interview<span className="text-cyan-400">AI</span>
//             </span>
//           </Link>
//           <Link
//             to="/dashboard"
//             className="text-sm px-5 py-2 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all"
//           >
//             Dashboard
//           </Link>
//         </div>
//       </nav>

//       <div className="max-w-5xl mx-auto px-6 pt-24">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1 rounded-full text-sm mb-4">
//             🎉 Interview Completed
//           </div>
//           <h1 className="text-4xl font-bold mb-2">Your Interview Report</h1>
//           <p className="text-slate-400">Frontend Developer Mock Interview</p>
//         </div>

//         {/* Overall Score Card */}
//         <div className="bg-gradient-to-br from-zinc-900 to-slate-900 border border-slate-700 rounded-3xl p-10 mb-10 text-center">
//           <div className="text-sm text-slate-400 mb-2">OVERALL SCORE</div>
//           <div className={`text-7xl font-bold mb-2 ${getScoreColor(overallScore)}`}>
//             {overallScore}
//             <span className="text-4xl">/100</span>
//           </div>
//           <div className="text-xl font-semibold text-emerald-400">
//             {getScoreLabel(overallScore)}
//           </div>
//           <p className="text-slate-400 mt-4 max-w-md mx-auto">
//             Bahut acchi performance! Thoda aur practice se aap 90+ score easily achieve kar sakte hain.
//           </p>
//         </div>

//         {/* Question Wise Breakdown */}
//         <h2 className="text-2xl font-bold mb-6">Question-wise Performance</h2>
//         <div className="space-y-6 mb-12">
//           {QUESTIONS.map((q, i) => (
//             <div
//               key={i}
//               className="bg-zinc-900 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex-1">
//                   <div className="text-xs text-slate-500 mb-1">Question {i + 1}</div>
//                   <p className="text-slate-300 leading-relaxed pr-4">{q}</p>
//                 </div>
//                 <div className={`text-right font-bold text-3xl ${getScoreColor(results[i].score)}`}>
//                   {results[i].score}
//                 </div>
//               </div>

//               <div className="bg-black/30 rounded-xl p-4 text-sm">
//                 <span className="text-emerald-400 font-medium">AI Feedback: </span>
//                 {results[i].feedback}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Detailed AI Feedback */}
//         <div className="bg-zinc-900 border border-slate-700 rounded-3xl p-8 mb-10">
//           <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
//             📋 Detailed AI Analysis
//           </h3>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <h4 className="text-emerald-400 font-medium mb-3">✅ Strengths</h4>
//               <ul className="space-y-2 text-slate-300">
//                 <li>• Good communication skills</li>
//                 <li>• Technical concepts clear the</li>
//                 <li>• Project explanation structured thi</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-amber-400 font-medium mb-3">🔧 Areas of Improvement</h4>
//               <ul className="space-y-2 text-slate-300">
//                 <li>• More quantifiable achievements add karein</li>
//                 <li>• STAR method ka aur better use</li>
//                 <li>• Advanced concepts (Performance, Security) mention karein</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             to="/interview"
//             className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-semibold text-center transition-all"
//           >
//             Retry Interview
//           </Link>

//           <button
//             onClick={() => alert("Report PDF download feature coming soon...")}
//             className="px-8 py-4 border border-slate-600 hover:bg-slate-800 rounded-2xl font-semibold text-center transition-all"
//           >
//             📄 Download Report
//           </button>

//           <Link
//             to="/dashboard"
//             className="px-8 py-4 border border-slate-600 hover:bg-slate-800 rounded-2xl font-semibold text-center transition-all"
//           >
//             Go to Dashboard
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { interviewId } = location.state || {};
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!interviewId) {
      navigate("/resume-upload");
      return;
    }
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/interview/result/${interviewId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Result load nahi hua");
      setInterview(data.data.interview);
      setQuestions(data.data.questions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 75) return "text-blue-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 90) return "bg-emerald-500/10 border-emerald-500/20";
    if (score >= 75) return "bg-blue-500/10 border-blue-500/20";
    if (score >= 60) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent 🏆";
    if (score >= 80) return "Very Good 🌟";
    if (score >= 70) return "Good 👍";
    if (score >= 60) return "Average 📈";
    return "Needs Improvement 💪";
  };

  const getVerdictColor = (verdict) => {
    const map = {
      "Excellent": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      "Good": "text-blue-400 bg-blue-500/10 border-blue-500/20",
      "Average": "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      "Needs Improvement": "text-red-400 bg-red-500/10 border-red-500/20",
    };
    return map[verdict] || "text-slate-400 bg-white/5 border-white/10";
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center text-3xl animate-pulse">
            🤖
          </div>
          <p className="text-slate-400">Result load ho raha hai...</p>
        </div>
      </div>
    );
  }

  // Error Screen
  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">❌ {error}</p>
          <Link to="/resume-upload" className="text-blue-400 underline">
            Wापस jao
          </Link>
        </div>
      </div>
    );
  }

  const overallScore = interview?.totalScore || 0;
  const answeredQuestions = questions.filter((q) => q.isAnswered);

  // Aggregate strengths & improvements from all questions
  const allStrengths = answeredQuestions.flatMap((q) => q.feedback?.strengths || []);
  const allImprovements = answeredQuestions.flatMap((q) => q.feedback?.improvements || []);
  const uniqueStrengths = [...new Set(allStrengths)].slice(0, 4);
  const uniqueImprovements = [...new Set(allImprovements)].slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white pb-16">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1E]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg tracking-tight">
            Interview<span className="text-cyan-400">AI</span>
          </Link>
          <Link to="/dashboard" className="text-sm px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all">
            Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-24">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-sm mb-4 border border-emerald-500/20">
            🎉 Interview Completed
          </div>
          <h1 className="text-3xl font-bold mb-2">Your Interview Report</h1>
          <p className="text-slate-400 text-sm">
            {interview?.role} · {interview?.mode} mode · {answeredQuestions.length}/{questions.length} answered
          </p>
        </div>

        {/* Overall Score Card */}
        <div className={`border rounded-3xl p-10 mb-8 text-center ${getScoreBg(overallScore)}`}>
          <div className="text-xs text-slate-400 mb-2 uppercase tracking-widest">Overall Score</div>
          <div className={`text-7xl font-bold mb-2 ${getScoreColor(overallScore)}`}>
            {overallScore}
            <span className="text-3xl text-slate-500">/100</span>
          </div>
          <div className={`text-lg font-semibold mb-4 ${getScoreColor(overallScore)}`}>
            {getScoreLabel(overallScore)}
          </div>

          {/* Score breakdown mini cards */}
          <div className="grid grid-cols-3 gap-3 mt-6 max-w-sm mx-auto">
            {[
              { label: "Avg Grammar", value: Math.round(answeredQuestions.reduce((s, q) => s + (q.feedback?.grammarScore || 0), 0) / (answeredQuestions.length || 1)) },
              { label: "Confidence", value: Math.round(answeredQuestions.reduce((s, q) => s + (q.feedback?.confidenceScore || 0), 0) / (answeredQuestions.length || 1)) },
              { label: "Relevance", value: Math.round(answeredQuestions.reduce((s, q) => s + (q.feedback?.contentRelevance || 0), 0) / (answeredQuestions.length || 1)) },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className={`text-xl font-bold ${getScoreColor(stat.value)}`}>{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Overall AI feedback */}
          {interview?.overallFeedback && (
            <p className="text-slate-400 text-sm mt-6 max-w-lg mx-auto leading-relaxed">
              {interview.overallFeedback}
            </p>
          )}
        </div>

        {/* Question-wise Breakdown */}
        <h2 className="text-xl font-bold mb-5">Question-wise Performance</h2>
        <div className="space-y-4 mb-10">
          {questions.map((q, i) => (
            <div key={q._id} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">

              {/* Question header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-slate-500">Q{i + 1}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10 capitalize">
                      {q.questionType}
                    </span>
                    {q.isAnswered && q.feedback?.verdict && (
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getVerdictColor(q.feedback.verdict)}`}>
                        {q.feedback.verdict}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{q.questionText}</p>
                </div>
                {q.isAnswered ? (
                  <div className={`text-2xl font-bold shrink-0 ${getScoreColor(q.feedback?.score || 0)}`}>
                    {q.feedback?.score || 0}
                  </div>
                ) : (
                  <span className="text-xs text-slate-600 shrink-0">Skipped</span>
                )}
              </div>

              {q.isAnswered && (
                <>
                  {/* User answer */}
                  <div className="bg-white/[0.02] rounded-xl p-3 mb-3 border border-white/5">
                    <div className="text-xs text-slate-500 mb-1">Tumhara Answer</div>
                    <p className="text-slate-400 text-sm leading-relaxed">{q.userAnswer}</p>
                  </div>

                  {/* AI Feedback */}
                  <div className="bg-blue-500/5 rounded-xl p-3 mb-3 border border-blue-500/10">
                    <div className="text-xs text-blue-400 mb-1">🤖 AI Feedback</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{q.feedback?.detailedFeedback}</p>
                  </div>

                  {/* Strengths + Improvements */}
                  <div className="grid grid-cols-2 gap-3">
                    {q.feedback?.strengths?.length > 0 && (
                      <div className="bg-emerald-500/5 rounded-xl p-3 border border-emerald-500/10">
                        <div className="text-xs text-emerald-400 mb-2">✅ Strengths</div>
                        <ul className="space-y-1">
                          {q.feedback.strengths.map((s, j) => (
                            <li key={j} className="text-xs text-slate-400">• {s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {q.feedback?.improvements?.length > 0 && (
                      <div className="bg-amber-500/5 rounded-xl p-3 border border-amber-500/10">
                        <div className="text-xs text-amber-400 mb-2">🔧 Improve Karo</div>
                        <ul className="space-y-1">
                          {q.feedback.improvements.map((s, j) => (
                            <li key={j} className="text-xs text-slate-400">• {s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Overall Strengths & Improvements */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6">
            <h3 className="text-emerald-400 font-semibold mb-4">✅ Overall Strengths</h3>
            <ul className="space-y-2">
              {uniqueStrengths.length > 0
                ? uniqueStrengths.map((s, i) => (
                    <li key={i} className="text-slate-300 text-sm">• {s}</li>
                  ))
                : <li className="text-slate-500 text-sm">Data nahi mila</li>}
            </ul>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6">
            <h3 className="text-amber-400 font-semibold mb-4">🔧 Areas to Improve</h3>
            <ul className="space-y-2">
              {uniqueImprovements.length > 0
                ? uniqueImprovements.map((s, i) => (
                    <li key={i} className="text-slate-300 text-sm">• {s}</li>
                  ))
                : <li className="text-slate-500 text-sm">Data nahi mila</li>}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/resume-upload"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-center text-sm transition-all"
          >
            🔁 Retry Interview
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-3.5 border border-white/10 hover:bg-white/5 rounded-xl font-semibold text-center text-sm transition-all"
          >
            Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}