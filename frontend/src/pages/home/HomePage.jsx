import { useState } from "react";
import CreatePost from "./CreatePost";
import Posts from "../../components/common/Posts";

const HomePage = () => {
  const[feedType, setFeedType] = useState("forYou");
	return (
		<>
    <div className="flex justify-center w-full">
    <div className="relative w-full max-w-2xl border-r border-l border-primary border-opacity-1">
        <div className="sticky top-0 z-10 bg-black flex fontColor justify-center items-center border-b-1 border-primary">
          <div className="hover:bg-primary md:w-full w-[50%] text-center cursor-pointer" onClick={()=>setFeedType("forYou")}><p className={`${feedType === "forYou" ? "bg-primary" : ""} py-2`}>For You</p></div>
          <div className="border border-primary h-10"></div>
          <div className="hover:bg-primary md:w-full w-[50%] text-center cursor-pointer" onClick={()=>setFeedType("following")}><p className={`${feedType === "following" ? "bg-primary" : ""} py-2`}>Following</p></div>    
        </div>
        <div className="min-h-screen">
        <CreatePost/>
         <Posts feedType={feedType}/>
    </div>
     
       </div>
       </div>
     <div>
    </div>
    
		</>
	);
};
export default HomePage;