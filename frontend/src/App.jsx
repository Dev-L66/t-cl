import { Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignupPage from "./pages/auth/signup/SignupPage";
// import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import { useState } from "react";
import Navbar from "./components/common/Navbar";

const App = () => {
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div
        className="grid md:grid-cols-[1fr_5fr_1fr] grid-cols-1" >
        <div>
          <Navbar/>
        </div>

        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>

        <div className="flex justify-center items-center">
          <RightPanel />
        </div>
      </div>
    </>
  );
};

export default App;
