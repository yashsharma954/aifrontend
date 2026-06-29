import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AuthPage from "./Pages/AuthPage";
import Dashboard from "./Pages/Dashboard";
import ResumeUpload from "./Pages/ResumeUpload";
import InterviewPage from "./Pages/InterviewPage";
import ResultPage from "./Pages/ResultPage";
import MyInterviews from "./Pages/MyInterview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage/>} />
        <Route path ="/dashboard" element={<Dashboard/>}/>
        <Route path="/upload" element={<ResumeUpload/>}/>
        <Route path="/interview" element ={<InterviewPage/>}/>
        <Route path="/results" element={<ResultPage/>}/>
        <Route path="/my-interviews" element={<MyInterviews />} />
        
      </Routes>
    </BrowserRouter>
  );
}