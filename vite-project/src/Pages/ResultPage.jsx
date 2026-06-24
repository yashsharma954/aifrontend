import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const QUESTIONS = [
  "Apne aap ke baare mein batao aur apna experience describe karo.",
  "JavaScript mein `let`, `const` aur `var` ka kya difference hai?",
  "React mein Virtual DOM kya hota hai aur ye performance kaise improve karta hai?",
  "Large React applications mein state management kaise karte ho?",
  "Koi ek challenging project batao jisme tumne koi mushkil problem solve ki ho.",
];

export default function ResultPage() {
  const [overallScore, setOverallScore] = useState(0);
  const [feedback, setFeedback] = useState({});

  // Dummy Results (Backend na hone tak)
  const results = [
    { score: 85, feedback: "Bahut accha introduction. Confidence dikha." },
    { score: 92, feedback: "Technical difference clear the. Example accha tha." },
    { score: 78, feedback: "Virtual DOM samjhaya lekin optimization ke points miss the." },
    { score: 88, feedback: "State management tools (Redux, Zustand, Context) ka accha mention." },
    { score: 82, feedback: "Project example solid tha, lekin metrics (numbers) add kar sakte the." },
  ];

  useEffect(() => {
    // Calculate overall score
    const total = results.reduce((sum, r) => sum + r.score, 0);
    const avg = Math.round(total / results.length);
    setOverallScore(avg);

    // Save to localStorage (future mein use kar sakte ho)
    localStorage.setItem("lastInterviewScore", avg.toString());
  }, []);

  const getScoreColor = (score) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 75) return "text-blue-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-12">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl tracking-tight">
              Interview<span className="text-cyan-400">AI</span>
            </span>
          </Link>
          <Link
            to="/dashboard"
            className="text-sm px-5 py-2 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-24">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1 rounded-full text-sm mb-4">
            🎉 Interview Completed
          </div>
          <h1 className="text-4xl font-bold mb-2">Your Interview Report</h1>
          <p className="text-slate-400">Frontend Developer Mock Interview</p>
        </div>

        {/* Overall Score Card */}
        <div className="bg-gradient-to-br from-zinc-900 to-slate-900 border border-slate-700 rounded-3xl p-10 mb-10 text-center">
          <div className="text-sm text-slate-400 mb-2">OVERALL SCORE</div>
          <div className={`text-7xl font-bold mb-2 ${getScoreColor(overallScore)}`}>
            {overallScore}
            <span className="text-4xl">/100</span>
          </div>
          <div className="text-xl font-semibold text-emerald-400">
            {getScoreLabel(overallScore)}
          </div>
          <p className="text-slate-400 mt-4 max-w-md mx-auto">
            Bahut acchi performance! Thoda aur practice se aap 90+ score easily achieve kar sakte hain.
          </p>
        </div>

        {/* Question Wise Breakdown */}
        <h2 className="text-2xl font-bold mb-6">Question-wise Performance</h2>
        <div className="space-y-6 mb-12">
          {QUESTIONS.map((q, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="text-xs text-slate-500 mb-1">Question {i + 1}</div>
                  <p className="text-slate-300 leading-relaxed pr-4">{q}</p>
                </div>
                <div className={`text-right font-bold text-3xl ${getScoreColor(results[i].score)}`}>
                  {results[i].score}
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-4 text-sm">
                <span className="text-emerald-400 font-medium">AI Feedback: </span>
                {results[i].feedback}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed AI Feedback */}
        <div className="bg-zinc-900 border border-slate-700 rounded-3xl p-8 mb-10">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            📋 Detailed AI Analysis
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-emerald-400 font-medium mb-3">✅ Strengths</h4>
              <ul className="space-y-2 text-slate-300">
                <li>• Good communication skills</li>
                <li>• Technical concepts clear the</li>
                <li>• Project explanation structured thi</li>
              </ul>
            </div>
            <div>
              <h4 className="text-amber-400 font-medium mb-3">🔧 Areas of Improvement</h4>
              <ul className="space-y-2 text-slate-300">
                <li>• More quantifiable achievements add karein</li>
                <li>• STAR method ka aur better use</li>
                <li>• Advanced concepts (Performance, Security) mention karein</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/interview"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-semibold text-center transition-all"
          >
            Retry Interview
          </Link>

          <button
            onClick={() => alert("Report PDF download feature coming soon...")}
            className="px-8 py-4 border border-slate-600 hover:bg-slate-800 rounded-2xl font-semibold text-center transition-all"
          >
            📄 Download Report
          </button>

          <Link
            to="/dashboard"
            className="px-8 py-4 border border-slate-600 hover:bg-slate-800 rounded-2xl font-semibold text-center transition-all"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}