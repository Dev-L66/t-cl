import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignupPage from "./pages/auth/signup/SignupPage";
import NotificationPage from "./pages/notification/NotificationPage";
import RightPanel from "./components/common/RightPanel";
import Navbar from "./components/common/Navbar";
import ProfilePage from "./pages/profile/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

const App = () => {
  const {data:authUser, isLoading, isError, error} = useQuery({
    queryKey:['authUser'],
    queryFn:async ()=>{
      try{
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || "Something went wrong.");
        return data;
      }catch(error){
       console.error(error);
       throw error;
      }
    },
    retry:false,
  });
  if(isLoading){
    return (
      <div className="h-screen flex justify-center items-center"><LoadingSpinner/></div>
    )
  }  
  return (
    <>
       <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr]">
       {authUser && <div>
          <Navbar />
        </div> }

        <div>
          <Routes>
            <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/login'/>  } />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to='/'/>} />
            <Route path="/signup" element={!authUser ? <SignupPage />  : <Navigate to='/'/>} />
            <Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to='/login'/>} />
            <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <ProfilePage />} />
          </Routes>
        </div>

       {authUser && <div className="top-0 sticky flex justify-center items-center h-screen ">
          <RightPanel />
        </div>}
        <Toaster/>
      </div>
    </>
  );
};

export default App;
