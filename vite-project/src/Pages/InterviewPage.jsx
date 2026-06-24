import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const QUESTIONS = [
  "Apne aap ke baare mein batao aur apna experience describe karo.",
  "JavaScript mein `let`, `const` aur `var` ka kya difference hai?",
  "React mein Virtual DOM kya hota hai aur ye performance kaise improve karta hai?",
  "Large React applications mein state management kaise karte ho?",
  "Koi ek challenging project batao jisme tumne koi mushkil problem solve ki ho.",
];

export default function InterviewPage() {
  const navigate = useNavigate();

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [timeLeft, setTimeLeft] = useState(120);
  const [submitting, setSubmitting] = useState(false);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, currentQ]);

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
      setTimeLeft(120);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
      setTimeLeft(120);
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      navigate("/results");
    }, 2500);
  };

  const timer = `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`;

  const timerColor =
    timeLeft < 30
      ? "text-red-400 border-red-500/30 bg-red-500/10"
      : timeLeft < 60
      ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
      : "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";

  // Submitting Screen
  if (submitting) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-500/20 flex items-center justify-center text-4xl animate-pulse">
            🤖
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            AI Answers Evaluate kar raha hai...
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Communication, Technical Accuracy aur Confidence analyze ho raha hai
          </p>
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col">

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
            <span className="font-bold text-lg tracking-tight">
              Interview<span className="text-cyan-400">AI</span>
            </span>
          </Link>

          {/* Timer */}
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border text-sm font-mono font-bold transition-all ${timerColor}`}>
            ⏱ {timer}
          </div>

          {/* Progress */}
          <div className="text-xs text-slate-400">
            Question{" "}
            <span className="text-white font-semibold">{currentQ + 1}</span>
            {" "}/ {QUESTIONS.length}
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-0.5 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
          style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 pt-24 pb-10 flex flex-col">

        {/* Role Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
            🎯 Frontend Developer Interview
          </span>
          <span className="text-xs text-slate-600">
            {answers.filter((a) => a.trim()).length}/{QUESTIONS.length} answered
          </span>
        </div>

        {/* Question Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-lg shrink-0 shadow-lg shadow-blue-500/20">
              🤖
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-2 font-medium">
                AI Interviewer · Question {currentQ + 1}
              </div>
              <p className="text-white leading-relaxed text-base">
                {QUESTIONS[currentQ]}
              </p>
            </div>
          </div>
        </div>

        {/* Answer Box */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-slate-400 font-medium">
              Tumhara Jawab
            </label>
            <span className="text-xs text-slate-600">
              {answers[currentQ].trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            value={answers[currentQ]}
            onChange={(e) => {
              const updated = [...answers];
              updated[currentQ] = e.target.value;
              setAnswers(updated);
            }}
            placeholder="Yahan apna jawab likho... Detail mein likho, real examples use karo apne experience se."
            className="flex-1 min-h-[220px] bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 resize-none leading-relaxed transition-all"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={handlePrev}
            disabled={currentQ === 0}
            className="px-5 py-3 border border-white/10 hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-sm text-slate-400 hover:text-white transition-all"
          >
            ← Prev
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/20"
          >
            {currentQ < QUESTIONS.length - 1
              ? "Next Question →"
              : "Submit & Get Feedback 🚀"}
          </button>
        </div>

        {/* Question Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {QUESTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentQ(i); setTimeLeft(120); }}
              className={`rounded-full transition-all ${
                i === currentQ
                  ? "w-6 h-2 bg-blue-500"
                  : answers[i].trim()
                  ? "w-2 h-2 bg-emerald-500"
                  : "w-2 h-2 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Hint */}
        <div className="mt-5 bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3">
          <p className="text-xs text-slate-500 leading-relaxed">
            💡 <span className="text-slate-400 font-medium">Tip:</span> STAR method use karo —
            Situation, Task, Action, Result. Specific examples do apne projects se.
            Minimum 50 words ka answer dene ki koshish karo.
          </p>
        </div>

      </div>
    </div>
  );
}