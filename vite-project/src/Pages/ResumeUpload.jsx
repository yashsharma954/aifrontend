
import { useState, useRef,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const roles = [
  { id: "frontend", label: "Frontend Developer", icon: "🎨", tags: ["React", "CSS", "JavaScript"] },
  { id: "backend", label: "Backend Developer", icon: "⚙️", tags: ["Node.js", "APIs", "Databases"] },
  { id: "fullstack", label: "Full Stack Developer", icon: "🔧", tags: ["MERN", "REST", "DevOps"] },
  { id: "data", label: "Data Analyst", icon: "📊", tags: ["Python", "SQL", "Power BI"] },
  { id: "devops", label: "DevOps Engineer", icon: "☁️", tags: ["Docker", "CI/CD", "AWS"] },
  { id: "ml", label: "ML Engineer", icon: "🤖", tags: ["TensorFlow", "Python", "NLP"] },
];

// ─── Mock previous resumes (real app mein localStorage/API se aayega) ───────
const PREVIOUS_RESUMES = [
  {
    id: 1,
    name: "Rahul_Sharma_Resume_2024.pdf",
    size: "245 KB",
    date: "3 din pehle",
    skills: ["React", "Node.js", "MongoDB", "JavaScript"],
  },
  {
    id: 2,
    name: "Rahul_Backend_CV.pdf",
    size: "189 KB",
    date: "1 hafte pehle",
    skills: ["Node.js", "PostgreSQL", "AWS", "Docker"],
  },
  {
    id: 3,
    name: "Resume_Fullstack_Dec2023.pdf",
    size: "312 KB",
    date: "1 mahine pehle",
    skills: ["MERN Stack", "TypeScript", "GraphQL"],
  },
];

export default function ResumeUpload() {
  const navigate = useNavigate();
  const fileRef = useRef();

  const [step, setStep] = useState(1);

  // ── Step 1 state ──
  const [mode, setMode] = useState("new"); // "new" | "previous"
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [myResumes, setMyResumes] = useState([]);
  const [selectedPrevResume, setSelectedPrevResume] = useState(null);
  const [loadingResumes, setLoadingResumes] = useState(false);

  // ── Step 2 state ──
  const [selectedRole, setSelectedRole] = useState("");

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (mode === "previous") {
      fetchMyResumes();
    }
  }, [mode]);

  const fetchMyResumes = async () => {
    setLoadingResumes(true);
    try {
      const res = await fetch("https://aibackend-ocu5.onrender.com/api/v1/resume/myresume", {
        method:"GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message || "Failed to fetch resumes");
      }

      // ApiResponse structure ke hisaab se (data.data ya direct data)
      setMyResumes(data.data || data || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      alert("Purane resumes load karne mein problem hui");
    } finally {
      setLoadingResumes(false);
    }
  };

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const handleFile = (f) => {
    if (f && f.type === "application/pdf") {
      setFile(f);
    } else {
      alert("Sirf PDF file upload karo!");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  

  // const handleAnalyze = async () => {
  //   if (mode === "new" && !file) return;
  //   if (mode === "previous" && !selectedPrevResume) return;

  //   setAnalyzing(true);

  //   try {
  //     if (mode === "new") {
  //       const formData = new FormData();
  //       formData.append("resume", file);

  //       const res = await fetch("https://aibackend-ocu5.onrender.com/api/v1/resume/upload", {
  //         method :"POST",
  //        headers: {
  //         Authorization: `Bearer ${token}`,
  //         // "Content-Type" mat lagao — fetch automatically handle karega FormData ke liye
  //       },
  //       body: formData,
  //       });
  //       const data = await res.json();
  //       console.log(data);

  //     if (!res.ok) {
  //       console.log(data.message || "Upload failed");
  //     }

  //     const selectedResume = data.resume;

  //       // Success ke baad selectedPrevResume mein daal do
  //       setSelectedPrevResume(selectedResume);
  //     } 
  //     // previous mode mein already selected hota hai
  //       else {
  //     // Previous resume already selected hai
  //     const selectedResume = selectedPrevResume;
  //   }
  //     // Simulate AI Analysis
  //     setTimeout(() => {
  //       setAnalyzing(false);
  //       setStep(2);
  //     }, 1800);

  //   } catch (error) {
  //     console.error(error);
  //     alert(error.response?.data?.message || "Upload failed");
  //     setAnalyzing(false);
  //   }
  // };

  const handleAnalyze = async () => {
  if (mode === "new" && !file) {
    alert("Please select a PDF file first!");
    return;
  }
  if (mode === "previous" && !selectedPrevResume) {
    alert("Please select a previous resume!");
    return;
  }

  setAnalyzing(true);

  try {
    if (mode === "new") {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("https://aibackend-ocu5.onrender.com/api/v1/resume/upload", {   // apna route yahan daalo
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert("upload failed",+data.message);
      }

      setSelectedPrevResume(data.data || data.resume);
      console.log("Resume uploaded successfully:", data);
    } 

    // AI Analysis simulation (backend already kar chuka hai)
    setTimeout(() => {
      setAnalyzing(false);
      setStep(2);
    }, 1200);

  } catch (error) {
    console.error("Upload Error:", error);
    alert(error.message || "Resume upload mein problem hui");
    setAnalyzing(false);
  }
};

  
 const handleStartInterview = async () => {
    if (!selectedRole) return;

    try {
        setAnalyzing(true);

        const response = await fetch("https://aibackend-ocu5.onrender.com/api/v1/interview/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                resumeId: selectedPrevResume?._id,
                role: selectedRole,
                difficulty: "Medium"
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("Interview generate karne mein problem hui");
        }

        console.log("✅ Interview generated:", data);

        // Interview page pe jaao saare data ke saath
        navigate("/interview", {
            state: {
                interviewId: data.data._id,
                questions: data.data.questions,
                tips: data.data.tips,
                role: selectedRole,
                resumeId: selectedPrevResume?._id,
            }
        });

    } catch (error) {
        console.error("Interview generation failed:", error);
        alert(error.message || "Interview start karne mein problem hui");
    } finally {
        setAnalyzing(false);
    }
};
  // Active resume name for Step 2 banner
  // const activeResumeName =
  //   mode === "new" ? file?.name : selectedPrevResume?.name;

  // const activeResumeSkills =
  //   mode === "new"
  //     ? "React, Node.js, MongoDB, JavaScript, CSS"
  //     : selectedPrevResume?.skills.join(", ");

  // // CTA disabled check
  // const ctaDisabled =
  //   analyzing ||
  //   (mode === "new" ? !file : !selectedPrevResume);
  // Active resume info for Step 2 banner
const activeResumeName = 
  mode === "new" 
    ? file?.name 
    : selectedPrevResume?.fileName || selectedPrevResume?.name || "Unknown Resume";

const activeResumeSkills = 
  mode === "new"
    ? "React, Node.js, MongoDB, JavaScript, CSS"
    : "Skills will be extracted by AI";

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0A0F1E]">

      {/* ── Navbar ── */}
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
          <Link to="/dashboard" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">

        {/* ── Step Indicator ── */}
        <div className="flex items-center gap-2 mb-10">
          {["Resume Upload", "Role Select", "Interview Start"].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                  i < step - 1
                    ? "bg-cyan-500 border-cyan-500 text-[#0A0F1E]"
                    : i === step - 1
                    ? "border-blue-500 text-blue-400"
                    : "border-white/10 text-slate-600"
                }`}>
                  {i < step - 1 ? "✓" : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${
                  i === step - 1 ? "text-white" : i < step - 1 ? "text-cyan-400" : "text-slate-600"
                }`}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div className={`h-px w-8 mx-1 ${i < step - 1 ? "bg-cyan-500" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            STEP 1 — RESUME UPLOAD / SELECT
        ══════════════════════════════════════════ */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Resume Upload Karo 📄
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              Naya resume upload karo ya pehle se saved resume select karo.
            </p>

            {/* ── Mode Toggle Tabs ── */}
            <div className="flex bg-white/[0.03] border border-white/10 rounded-xl p-1 gap-1 mb-6">
              <button
                onClick={() => {
                  setMode("new");
                  setSelectedPrevResume(null);
                }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                  mode === "new"
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                📤 Naya Resume Upload
              </button>
              <button
                onClick={() => {
                  setMode("previous");
                  setFile(null);
                }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                  mode === "previous"
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                🕐 Pehle Wala Resume
              </button>
            </div>

           
            {mode === "new" && (
              <div
                onClick={() => fileRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all ${
                  dragOver ? "border-blue-500 bg-blue-500/10" : 
                  file ? "border-emerald-500/50 bg-emerald-500/5" : 
                  "border-white/10 hover:border-white/25"
                }`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {file ? (
                  <div>
                    <div className="text-5xl mb-3">✅</div>
                    <div className="text-white font-semibold">{file.name}</div>
                    <div className="text-slate-500 text-sm mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="mt-4 text-red-400 text-sm underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div> 
                     <div className="text-5xl mb-4">📄</div>
                      <div className="text-white font-medium mb-1">PDF yahan drop karo</div>
                      <div className="text-slate-500 text-sm">ya click karke browse karo</div>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-600 bg-white/5 px-3 py-1.5 rounded-full">
                        📎 Sirf PDF · Max 5MB
                      </div>
                    </div>
                  )} 
                  <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { icon: "✨", text: "Skills auto-detect honge" },
                    { icon: "🔒", text: "Resume private rahega" },
                    { icon: "⚡", text: "Analysis 2 sec mein" },
                  ].map((tip) => (
                    <div
                      key={tip.text}
                      className="text-center bg-white/[0.02] border border-white/5 rounded-xl p-3"
                    >
                      <div className="text-xl mb-1">{tip.icon}</div>
                      <p className="text-xs text-slate-500">{tip.text}</p>
                    </div>
                    ))}
                  </div>
              </div>
            )}


            
            {mode === "previous" && (
              <div className="flex flex-col gap-3">
                {loadingResumes ? (
                  <p className="text-center py-10 text-slate-400">Loading resumes...</p>
                ) : myResumes?.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
                    <p>No previous resumes found</p>
                    <button onClick={() => setMode("new")} className="text-blue-400 mt-3 underline">
                      Upload New Resume
                    </button>
                  </div>
                ) : (
                  myResumes?.map((resume) => (
                    <button
                      key={resume._id}
                      onClick={() => setSelectedPrevResume(resume)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        selectedPrevResume?._id === resume._id 
                          ? "border-blue-500 bg-blue-500/10" 
                          : "border-white/10 hover:border-white/25"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">📄</div>
                        <div className="flex-1">
                          <div className="font-medium text-white truncate">{resume.fileName}</div>
                          <div className="text-xs text-slate-500">
                            {new Date(resume.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}

            

            <button
              onClick={handleAnalyze}
              disabled={analyzing || (mode === "new" ? !file : !selectedPrevResume)}
              className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl font-semibold"
            >
              {analyzing ? "Analyzing Resume..." : "Resume Analyze Karo →"}
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════
            STEP 2 — ROLE SELECT
        ══════════════════════════════════════════ */}
        {step === 2 && (
          <div>
            {/* Success Banner */}
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 mb-8">
              <span className="text-xl">✅</span>
              <div>
                <div className="text-sm font-semibold text-emerald-400">Resume Successfully Analyze Hua!</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {activeResumeName} · Skills detected: {activeResumeSkills}
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">
              Target Role Select Karo 🎯
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Jis role ke liye interview dena hai wo choose karo.
            </p>

            {/* Role Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.label)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    selectedRole === role.label
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-white/10 hover:border-white/25 bg-white/[0.02] hover:bg-white/5"
                  }`}
                >
                  <div className="text-2xl mb-2">{role.icon}</div>
                  <div className="text-sm font-medium text-white mb-2">{role.label}</div>
                  <div className="flex flex-wrap gap-1">
                    {role.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {selectedRole === role.label && (
                    <div className="mt-2 text-blue-400 text-xs font-semibold">✓ Selected</div>
                  )}
                </button>
              ))}
            </div>

            {/* Selected Role Info */}
            {selectedRole && (
              <div className="mt-5 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 text-sm text-blue-300">
                🎯 <span className="font-semibold">{selectedRole}</span> ke liye AI questions generate karega
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-white/10 hover:border-white/25 rounded-xl text-sm text-slate-400 hover:text-white transition-all"
              >
                ← Back
              </button>
              // Step 2 ke bottom button ko ye karo
              <button
            onClick={handleStartInterview}
              disabled={!selectedRole || analyzing}  // ✅ analyzing add kiya
           className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/20"
             >
            {analyzing ? "Questions Generate Ho Rahe Hain..." : "AI Interview Start Karo 🚀"}
         </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}