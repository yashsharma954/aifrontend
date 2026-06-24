// // import { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import Navbar from "../components/Navbar";

// // const roles = [
// //   "Frontend Developer",
// //   "Backend Developer", 
// //   "Full Stack Developer",
// //   "Data Analyst",
// //   "DevOps Engineer",
// //   "ML Engineer",
// // ];

// // const steps = [
// //   { step: "01", icon: "📄", title: "Upload Resume", desc: "PDF upload karo. AI tumhare skills aur experience automatically read karega." },
// //   { step: "02", icon: "🎯", title: "Select Role", desc: "Apna target role choose karo — Frontend, Backend, Data Analyst ya koi bhi." },
// //   { step: "03", icon: "🤖", title: "AI Interview", desc: "Resume ke basis par personalized questions milenge. Real interview jaisi feeling." },
// //   { step: "04", icon: "📊", title: "Get Feedback", desc: "Communication, Technical Accuracy aur Confidence ka detailed score milega." },
// // ];

// // export default function LandingPage() {
// //   const [roleIndex, setRoleIndex] = useState(0);
// //   const [visible, setVisible] = useState(true);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setVisible(false);
// //       setTimeout(() => {
// //         setRoleIndex((i) => (i + 1) % roles.length);
// //         setVisible(true);
// //       }, 350);
// //     }, 2800);
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-[#0A0F1E] overflow-x-hidden">
// //       <Navbar />

// //       <section className="relative min-h-screen flex items-center justify-center px-6 pt-16">
// //         <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
// //         <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

// //         <div className="relative z-10 max-w-4xl mx-auto text-center">

// //           <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 text-xs text-blue-400 mb-8">
// //             <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
// //             AI-Powered Interview Preparation Platform
// //           </div>

// //           <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
// //             Ace Your Interview
// //             <br />
// //             as a{" "}
// //             <span
// //               className={`bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
// //             >
// //               {roles[roleIndex]}
// //             </span>
// //           </h1>

// //           <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
// //             Resume upload karo, role select karo, aur AI interviewer se real questions practice karo.
// //             Communication, technical skills aur confidence par detailed feedback pao.
// //           </p>

// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <Link
// //               to="/auth"
// //               className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-base transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
// //             >
// //               Start Free Practice
// //               <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
// //             </Link>
            
// //               href="#how-it-works"
// //               className="px-8 py-4 border border-white/10 hover:border-white/25 rounded-xl font-medium text-slate-300 hover:text-white transition-all hover:bg-white/5"
// //             >
// //               See How It Works
// //             </a>
// //           </div>

// //           <div className="mt-20 grid grid-cols-3 gap-8 max-w-sm mx-auto">
// //             {[
// //               { val: "10K+", label: "Interviews Taken" },
// //               { val: "94%", label: "Success Rate" },
// //               { val: "50+", label: "Job Roles" },
// //             ].map((s) => (
// //               <div key={s.label} className="text-center">
// //                 <div className="text-2xl md:text-3xl font-bold text-white">{s.val}</div>
// //                 <div className="text-xs text-slate-500 mt-1">{s.label}</div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto">
// //         <div className="text-center mb-16">
// //           <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">Process</p>
// //           <h2 className="text-3xl md:text-4xl font-bold text-white">4 Steps Mein Interview Ready</h2>
// //           <p className="text-slate-400 mt-3 text-sm max-w-md mx-auto">
// //             Resume se lekar detailed feedback tak — sab kuch automated hai.
// //           </p>
// //         </div>

// //         <div className="grid md:grid-cols-4 gap-5">
// //           {steps.map((item) => (
// //             <div
// //               key={item.step}
// //               className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all"
// //             >
// //               <div className="text-xs text-slate-700 font-mono font-bold mb-4">{item.step}</div>
// //               <div className="text-3xl mb-4">{item.icon}</div>
// //               <h3 className="font-semibold text-white mb-2 text-sm">{item.title}</h3>
// //               <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       <section id="features" className="py-16 px-6 max-w-6xl mx-auto">
// //         <div className="text-center mb-12">
// //           <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">Features</p>
// //           <h2 className="text-3xl font-bold text-white">Kyu Choose Kare InterviewAI?</h2>
// //         </div>
// //         <div className="grid md:grid-cols-3 gap-5">
// //           {[
// //             { icon: "🧠", title: "Smart Questions", desc: "AI tumhara resume padh ke role-specific questions generate karta hai — generic nahi, personalized." },
// //             { icon: "⏱️", title: "Real-time Timer", desc: "Har question ka time limit hota hai jaise real interview mein hota hai." },
// //             { icon: "📈", title: "Detailed Score", desc: "Communication, Technical Accuracy, Confidence — sabka breakdown milta hai." },
// //             { icon: "🔒", title: "Resume Privacy", desc: "Tumhara resume securely process hota hai. Kabhi share nahi hota." },
// //             { icon: "🎯", title: "50+ Roles", desc: "Frontend se leke ML Engineer tak — har tech role ke liye questions available hain." },
// //             { icon: "📊", title: "Progress Track", desc: "Har interview ka history save hota hai. Apna growth track karo." },
// //           ].map((f) => (
// //             <div key={f.title} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
// //               <div className="text-2xl mb-3">{f.icon}</div>
// //               <h3 className="font-semibold text-white text-sm mb-2">{f.title}</h3>
// //               <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       <section className="py-16 px-6 max-w-6xl mx-auto">
// //         <div className="bg-gradient-to-br from-blue-950/60 to-slate-900/60 border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
// //           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-blue-500/15 blur-[80px] pointer-events-none" />
// //           <div className="relative z-10">
// //             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
// //               Dream Job Ki Taraf Pehla Kadam Lo 🚀
// //             </h2>
// //             <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
// //               Hazaron developers ne InterviewAI se apni interview prep level up ki hai. Abhi start karo — bilkul free.
// //             </p>
// //             <Link
// //               to="/auth"
// //               className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
// //             >
// //               Create Free Account →
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

// //       <footer className="border-t border-white/5 py-8 px-6 text-center text-slate-600 text-xs">
// //         © 2025 InterviewAI — Built with MERN Stack + AI | Made with ❤️ for Developers
// //       </footer>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const roles = [
//   "Frontend Developer",
//   "Backend Developer",
//   "Full Stack Developer",
//   "Data Analyst",
//   "DevOps Engineer",
//   "ML Engineer",
// ];

// const steps = [
//   { step: "01", icon: "📄", title: "Upload Resume", desc: "PDF upload karo. AI tumhare skills aur experience automatically read karega." },
//   { step: "02", icon: "🎯", title: "Select Role", desc: "Apna target role choose karo — Frontend, Backend, Data Analyst ya koi bhi." },
//   { step: "03", icon: "🤖", title: "AI Interview", desc: "Resume ke basis par personalized questions milenge. Real interview jaisi feeling." },
//   { step: "04", icon: "📊", title: "Get Feedback", desc: "Communication, Technical Accuracy aur Confidence ka detailed score milega." },
// ];

// export default function LandingPage() {
//   const [roleIndex, setRoleIndex] = useState(0);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setVisible(false);
//       setTimeout(() => {
//         setRoleIndex((i) => (i + 1) % roles.length);
//         setVisible(true);
//       }, 350);
//     }, 2800);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0A0F1E] overflow-x-hidden">
//       <Navbar />

//       <section className="relative min-h-screen flex items-center justify-center px-6 pt-16">
//         <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
//         <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

//         <div className="relative z-10 max-w-4xl mx-auto text-center">
//           <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 text-xs text-blue-400 mb-8">
//             <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//             AI-Powered Interview Preparation Platform
//           </div>

//           <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
//             Ace Your Interview
//             <br />
//             as a{" "}
//             <span
//               className={`bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent transition-opacity duration-300 ${
//                 visible ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               {roles[roleIndex]}
//             </span>
//           </h1>

//           <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
//             Resume upload karo, role select karo, aur AI interviewer se real questions practice karo.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/auth"
//               className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-base transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
//             >
//               Start Free Practice
//               <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
//             </Link>

//             <a
//               href="#how-it-works"
//               className="px-8 py-4 border border-white/10 hover:border-white/25 rounded-xl font-medium text-slate-300 hover:text-white transition-all hover:bg-white/5"
//             >
//               See How It Works
//             </a>
//           </div>

//           <div className="mt-20 grid grid-cols-3 gap-8 max-w-sm mx-auto">
//             {[
//               { val: "10K+", label: "Interviews Taken" },
//               { val: "94%", label: "Success Rate" },
//               { val: "50+", label: "Job Roles" },
//             ].map((s) => (
//               <div key={s.label} className="text-center">
//                 <div className="text-2xl md:text-3xl font-bold text-white">{s.val}</div>
//                 <div className="text-xs text-slate-500 mt-1">{s.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How it Works Section */}
//       <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto">
//         <div className="text-center mb-16">
//           <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">Process</p>
//           <h2 className="text-3xl md:text-4xl font-bold text-white">4 Steps Mein Interview Ready</h2>
//           <p className="text-slate-400 mt-3 text-sm max-w-md mx-auto">
//             Resume se lekar detailed feedback tak — sab kuch automated hai.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-4 gap-5">
//           {steps.map((item) => (
//             <div
//               key={item.step}
//               className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all group"
//             >
//               <div className="text-xs text-slate-700 font-mono font-bold mb-4">{item.step}</div>
//               <div className="text-3xl mb-4">{item.icon}</div>
//               <h3 className="font-semibold text-white mb-2">{item.title}</h3>
//               <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-16 px-6 max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">Features</p>
//           <h2 className="text-3xl font-bold text-white">Kyu Choose Kare InterviewAI?</h2>
//         </div>

//         <div className="grid md:grid-cols-3 gap-5">
//           {[
//             { icon: "🧠", title: "Smart Questions", desc: "AI tumhara resume padh ke role-specific questions generate karta hai." },
//             { icon: "⏱️", title: "Real-time Timer", desc: "Har question ka time limit hota hai jaise real interview mein hota hai." },
//             { icon: "📈", title: "Detailed Score", desc: "Communication, Technical Accuracy, Confidence — sabka breakdown milta hai." },
//             { icon: "🔒", title: "Resume Privacy", desc: "Tumhara resume securely process hota hai." },
//             { icon: "🎯", title: "50+ Roles", desc: "Frontend se leke ML Engineer tak." },
//             { icon: "📊", title: "Progress Track", desc: "Har interview ka history save hota hai." },
//           ].map((f, index) => (
//             <div
//               key={index}
//               className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
//             >
//               <div className="text-2xl mb-3">{f.icon}</div>
//               <h3 className="font-semibold text-white mb-2">{f.title}</h3>
//               <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 px-6 max-w-6xl mx-auto">
//         <div className="bg-gradient-to-br from-blue-950/60 to-slate-900/60 border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
//           <div className="relative z-10">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//               Dream Job Ki Taraf Pehla Kadam Lo 🚀
//             </h2>
//             <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
//               Hazaron developers ne InterviewAI se apni interview prep level up ki hai. Abhi start karo — bilkul free.
//             </p>
//             <Link
//               to="/auth"
//               className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
//             >
//               Create Free Account →
//             </Link>
//           </div>
//         </div>
//       </section>

//       <footer className="border-t border-white/5 py-8 px-6 text-center text-slate-600 text-xs">
//         © 2025 InterviewAI — Built with MERN Stack + AI | Made with ❤️ for Developers
//       </footer>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "DevOps Engineer",
  "ML Engineer",
];

const steps = [
  { step: "01", icon: "📄", title: "Upload Resume", desc: "PDF upload karo. AI tumhare skills aur experience automatically read karega." },
  { step: "02", icon: "🎯", title: "Select Role", desc: "Apna target role choose karo — Frontend, Backend, Data Analyst ya koi bhi." },
  { step: "03", icon: "🤖", title: "AI Interview", desc: "Resume ke basis par personalized questions milenge." },
  { step: "04", icon: "📊", title: "Get Feedback", desc: "Communication, Technical Accuracy aur Confidence ka detailed score milega." },
];

export default function LandingPage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 overflow-x-hidden">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16">
        {/* Background Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 text-xs text-blue-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            AI-Powered Interview Preparation Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 text-white">
            Ace Your Interview
            <br />
            as a{" "}
            <span
              className={`bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent transition-opacity duration-300 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              {roles[roleIndex]}
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Resume upload karo, role select karo, aur AI interviewer se real questions practice karo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-base transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
            >
              Start Free Practice →
            </Link>

            <a
              href="#how-it-works"
              className="px-8 py-4 border border-slate-700 hover:border-slate-500 rounded-xl font-medium text-slate-300 hover:text-white transition-all hover:bg-slate-800"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-sm mx-auto">
            {[
              { val: "10K+", label: "Interviews Taken" },
              { val: "94%", label: "Success Rate" },
              { val: "50+", label: "Job Roles" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">4 Steps Mein Interview Ready</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-zinc-900 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/30 transition-all group"
            >
              <div className="text-xs text-slate-500 font-mono font-bold mb-4">{item.step}</div>
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">Features</p>
          <h2 className="text-3xl font-bold text-white">Kyu Choose Kare InterviewAI?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🧠", title: "Smart Questions", desc: "AI tumhara resume padh ke role-specific questions generate karta hai." },
            { icon: "⏱️", title: "Real-time Timer", desc: "Har question ka time limit hota hai." },
            { icon: "📈", title: "Detailed Score", desc: "Communication, Technical Accuracy, Confidence ka breakdown." },
            { icon: "🔒", title: "Resume Privacy", desc: "Tumhara data completely secure rahega." },
            { icon: "🎯", title: "50+ Roles", desc: "Har tech role ke liye specialized questions." },
            { icon: "📊", title: "Progress Track", desc: "Apni improvement history track karo." },
          ].map((f, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-slate-700 rounded-2xl p-6 hover:border-slate-500 transition-all"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-zinc-900 to-slate-900 border border-slate-700 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Dream Job Ki Taraf Pehla Kadam Lo 🚀
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Hazaron developers ne is platform se apni prep ko next level pe pahunchaya hai.
          </p>
          <Link
            to="/auth"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl font-semibold transition-all"
          >
            Create Free Account →
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        © 2025 InterviewAI — Built with ❤️ for Developers
      </footer>
    </div>
  );
}