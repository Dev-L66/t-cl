import { Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignupPage from "./pages/auth/signup/SignupPage";
import NotificationPage from "./pages/notification/NotificationPage";
import RightPanel from "./components/common/RightPanel";
import Navbar from "./components/common/Navbar";
import ProfilePage from "./pages/profile/ProfilePage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <div className="grid md:grid-cols-[1fr_3fr_1fr] grid-cols-1">
        <div>
          <Navbar />
        </div>

        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Routes>
        </div>

        <div className="flex ">
          <RightPanel />
        </div>
        <Toaster/>
      </div>
    </>
  );
};

export default App;
