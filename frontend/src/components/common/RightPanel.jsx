import { useState } from "react";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton.jsx";
import { Link } from "react-router";

const RightPanel = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="hidden sticky top-0 md:flex md:justify-center md:items-center h-screen p-4">
      <div className="bg-seconadary rounded-2xl p-4 ">
        <h2 className="font-bold text-lg mb-4 px-2">Who to follow</h2>
        {/* {loading && (<div className="">
        <RightPanelSkeleton />
        <RightPanelSkeleton />
        <RightPanelSkeleton /> 
        <RightPanelSkeleton /> 
        <RightPanelSkeleton /> 
        </div>)} */}
        
        {!loading && (USERS_FOR_RIGHT_PANEL.map((user) => (
          <div key={user._id} className="p-3 hover:bg-primary/10 rounded-lg transition">
            <Link to={`profile/${user.username}`} className="flex items-center gap-3">
              <img
                src={user.profileImg || "/avatars/boy1.png"}
                className="w-10 h-10 rounded-full object-cover"
                alt={user.username}
              />
              <div className="text-xs  flex flex-col">
                <p className="font-medium">{user.fullName}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
              <button 
                onClick={(e) => e.preventDefault()}
                className="text-xs font-bold bg-primary text-white px-3 py-1 rounded-full hover:bg-primary/80 transition"
              >
                Follow
              </button>
            </Link>
          </div>)
        ))}
      </div>
    </div>
  );
};
export default RightPanel;
